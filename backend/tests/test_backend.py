import io
import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.parsers.doc_extractor import extract_from_bytes, classify_document
from app.engine.entity_extractor import PetFacts, ExtractedField
from app.engine.rules_catalog import get_applicable_rules
from app.engine.evidence_matcher import evaluate_evidence
from app.engine.dependency_graph import build_dependency_timeline
from app.engine.readiness import evaluate_readiness

client = TestClient(app)

def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert data["version"] == "2.0.0"
    assert "nemotron" in data["model"]

def test_document_classification():
    assert classify_document("Rabies vaccination batch 123", "vax.pdf") == "Rabies / Vaccination Certificate"
    assert classify_document("ISO 11784 microchip transponder 985141000123456", "chip.txt") == "Microchip Registration Record"
    assert classify_document("Department of Agriculture DAFF Notice of Intention export permit", "permit.txt") == "Government Export / Endorsement Permit"
    # Specific document types from traveler uploads
    assert classify_document("Non-commercial entry model health certificate", "eu_annex_iv_health_certificate.pdf") == "EU Annex IV Health Certificate"
    assert classify_document("Owner declaration non-commercial movement 5 days", "owner_declaration.pdf") == "Non-Commercial Owner Declaration"
    assert classify_document("Rabies vaccination primary shot", "rabies_cert.pdf") == "Rabies / Vaccination Certificate"
    assert classify_document("Official Pet Passport identity docket", "pet_passport.pdf") == "Official Pet Passport"
    assert classify_document("Rabies virus antibody titer titration 0.82 IU/ml", "titer_report.pdf") == "Rabies Titer (FAVN/RNATT) Lab Report"
    assert classify_document("Veterinary inspection health certificate", "health_certificate.pdf") == "Official Veterinary Health Certificate"
    assert classify_document("ISO 11784 microchip certificate 985112003456789", "microchip_record.pdf") == "Microchip Registration Record"

def test_distinct_verification_summaries_in_audit_trail():
    from app.parsers.doc_extractor import ExtractedDocument
    from app.engine.entity_extractor import regex_fallback_extract

    docs = [
        ExtractedDocument(
            filename="eu_annex_iv_health_certificate.pdf",
            content_type="application/pdf",
            raw_text="EU Annex IV Health Certificate. Official veterinarian endorsement. ISO Microchip 985112003456789.",
            detected_type=classify_document("EU Annex IV", "eu_annex_iv_health_certificate.pdf")
        ),
        ExtractedDocument(
            filename="owner_declaration.pdf",
            content_type="application/pdf",
            raw_text="Owner declaration of non-commercial movement within 5-day window. Microchip 985112003456789.",
            detected_type=classify_document("Owner declaration", "owner_declaration.pdf")
        ),
        ExtractedDocument(
            filename="rabies_cert.pdf",
            content_type="application/pdf",
            raw_text="Rabies vaccination certificate administered: 2026-05-10. Microchip 985112003456789.",
            detected_type=classify_document("Rabies vaccination certificate", "rabies_cert.pdf")
        ),
        ExtractedDocument(
            filename="pet_passport.pdf",
            content_type="application/pdf",
            raw_text="Official Pet Passport. Identity docket and vaccination stamps. Microchip 985112003456789.",
            detected_type=classify_document("Official Pet Passport", "pet_passport.pdf")
        ),
        ExtractedDocument(
            filename="titer_report.pdf",
            content_type="application/pdf",
            raw_text="FAVN rabies antibody titer serology report. Result: 0.82 IU/ml. Microchip 985112003456789.",
            detected_type=classify_document("FAVN rabies titer 0.82 IU/ml", "titer_report.pdf")
        ),
        ExtractedDocument(
            filename="health_certificate.pdf",
            content_type="application/pdf",
            raw_text="Official Veterinary Health Certificate. Clinical inspection completed. Microchip 985112003456789.",
            detected_type=classify_document("Veterinary Health Certificate", "health_certificate.pdf")
        ),
        ExtractedDocument(
            filename="microchip_record.pdf",
            content_type="application/pdf",
            raw_text="ISO 11784/11785 microchip transponder registration certificate. Implanted 2026-04-12. Number: 985112003456789.",
            detected_type=classify_document("ISO microchip", "microchip_record.pdf")
        )
    ]

    facts = regex_fallback_extract(docs)
    assert len(facts.doc_audit) == 7

    # Verify that each document has a distinct type and distinct summary (no duplicates!)
    types = [item["detected_type"] for item in facts.doc_audit]
    summaries = [item["summary"] for item in facts.doc_audit]

    assert len(set(summaries)) == 7, f"Summaries must be completely distinct, got: {summaries}"
    assert "EU Annex IV Health Certificate" in types
    assert "Non-Commercial Owner Declaration" in types
    assert "Rabies / Vaccination Certificate" in types
    assert "Official Pet Passport" in types
    assert "Rabies Titer (FAVN/RNATT) Lab Report" in types
    assert "Official Veterinary Health Certificate" in types
    assert "Microchip Registration Record" in types

def test_declarative_prerequisite_rabies_before_microchip_blocker():
    """
    Critical requirement: If rabies was administered BEFORE microchip implantation,
    it must trigger a CRITICAL_BLOCKER under EU Regulation 2026/131.
    """
    invalid_facts = PetFacts(
        species_field=ExtractedField(value="DOG", confidence=0.95),
        microchip_field=ExtractedField(value="985141000123456", confidence=0.98),
        microchip_date_field=ExtractedField(value="2026-06-01", confidence=0.95),
        # Rabies administered on May 10, BEFORE microchip on June 1
        rabies_date_field=ExtractedField(value="2026-05-10", confidence=0.95),
    )

    rules = get_applicable_rules(origin="Australia", destination="Austria")
    matched = evaluate_evidence(pet_facts=invalid_facts, applicable_rules=rules)
    timeline = build_dependency_timeline(matched_requirements=matched, pet_facts=invalid_facts)
    readiness = evaluate_readiness(matched_requirements=matched, timeline_result=timeline, origin="Australia", destination="Austria")

    assert readiness["overallStatus"] == "NOT_READY"
    assert readiness["blockerSummary"]["criticalBlockersCount"] >= 1

    rabies_req = next(r for r in matched if r.rule_id == "EU_RABIES_001")
    assert rabies_req.status == "CRITICAL_BLOCKER"
    assert "2026/131" in rabies_req.source_title or "2026.131" in rabies_req.rule_version
    assert "revaccinate" in rabies_req.what_to_do.lower()

def test_transit_and_trust_metadata():
    """
    Verifies that transit rules (Singapore, Germany) are injected with mandatory
    rule_version, verified_at, and source provenance metadata.
    """
    rules = get_applicable_rules(
        origin="Australia",
        destination="Austria",
        transit_countries=["Singapore", "Germany"]
    )
    transit_rules = rules["TRANSIT"]
    rule_ids = [r["rule_id"] for r in transit_rules]
    assert "SG_NPARKS_TRANSIT_001" in rule_ids
    assert "EU_TRANSIT_BIP_DE" in rule_ids

    sg_rule = next(r for r in transit_rules if r["rule_id"] == "SG_NPARKS_TRANSIT_001")
    assert sg_rule["rule_version"] == "2026.1"
    assert sg_rule["verified_at"] == "2026-09-07"
    assert "NParks" in sg_rule["source"]

def test_route_specific_titer_requirement():
    """
    EU Annex II specifies that Australia is exempt from rabies titer tests,
    while unlisted third countries (e.g. India) mandatory require titer test + 90-day wait.
    """
    au_rules = get_applicable_rules(origin="Australia", destination="Austria")
    au_rule_ids = [r["rule_id"] for r in au_rules["ARRIVING"]]
    assert "EU_RABIES_TITER_001" not in au_rule_ids

    in_rules = get_applicable_rules(origin="India", destination="Austria")
    in_rule_ids = [r["rule_id"] for r in in_rules["ARRIVING"]]
    assert "EU_RABIES_TITER_001" in in_rule_ids

    titer_rule = next(r for r in in_rules["ARRIVING"] if r["rule_id"] == "EU_RABIES_TITER_001")
    assert titer_rule["wait_duration_days"] == 90
    assert titer_rule["severity"] == "CRITICAL_BLOCKER"

def test_conflicting_evidence_handling():
    """
    Verifies that when an extracted fact has conflicting values across documents,
    its evidence state is CONFLICTING and it generates a clarifying badge.
    """
    conflicted_facts = PetFacts(
        species_field=ExtractedField(value="DOG", confidence=0.95),
        microchip_field=ExtractedField(value="985141000123456", confidence=0.98),
        rabies_date_field=ExtractedField(
            value="2026-08-10",
            confidence=0.72,
            status="CONFLICTING",
            conflicting_values=[
                {"value": "2026-08-10", "sourceDocument": "vax_cert.pdf"},
                {"value": "2026-08-12", "sourceDocument": "pet_passport.pdf"}
            ]
        )
    )
    rules = get_applicable_rules(origin="Australia", destination="Austria")
    matched = evaluate_evidence(pet_facts=conflicted_facts, applicable_rules=rules)
    rabies_req = next(r for r in matched if r.rule_id == "EU_RABIES_001")

    assert rabies_req.status_badge == "🔴 Conflicting Evidence — Action Required"
    assert rabies_req.status == "CRITICAL_BLOCKER"
    assert rabies_req.severity == "CRITICAL_BLOCKER"
    assert "conflicting" in rabies_req.details.lower()

    # Also verify readiness flags it for human review
    from app.engine.dependency_graph import build_dependency_timeline
    from app.engine.readiness import evaluate_readiness
    timeline = build_dependency_timeline(matched, conflicted_facts)
    readiness = evaluate_readiness(matched, timeline, origin="Australia", destination="Austria", facts=conflicted_facts)
    assert readiness["needsHumanReview"] is True
    assert readiness["overallStatus"] == "NOT_READY"

def test_scan_endpoint_flow(monkeypatch):
    async def mock_extract(docs):
        return PetFacts(
            species_field=ExtractedField(value="DOG", confidence=0.95),
            microchip_field=ExtractedField(value="985141000987654", confidence=0.98),
            microchip_date_field=ExtractedField(value="2025-01-10", confidence=0.95),
            rabies_date_field=ExtractedField(value="2025-02-15", confidence=0.95),
            dhpp_date_field=ExtractedField(value="2025-02-15", confidence=0.90)
        )
    monkeypatch.setattr("app.main.extract_facts_with_ai", mock_extract)

    test_file = io.BytesIO(b"Vaccination Certificate\nSpecies: Canine Dog\nMicrochip: 985141000987654\nRabies: 2025-02-15")
    files = [
        ("files", ("photo.jpg", test_file, "image/jpeg"))
    ]
    data = {
        "origin_country": "Australia",
        "destination_country": "Austria",
        "transit_countries": "Singapore"
    }
    response = client.post("/api/v1/scan", files=files, data=data)
    assert response.status_code == 200
    res_data = response.json()
    assert res_data["status"] == "success"
    assert "stats" in res_data
    assert "blockerSummary" in res_data["stats"]
    assert "criticalBlockersCount" in res_data["stats"]["blockerSummary"]
    assert "timelineMilestones" in res_data
    assert "earliestFlightDateTitle" in res_data["stats"]
    assert "disclaimer" in res_data["stats"]

def test_japan_maff_regulatory_corridor():
    """
    Verifies Japan MAFF rules: 180-day rabies titer quarantine clock,
    double inactivated rabies vaccination, and 40-day advance notification.
    """
    rules = get_applicable_rules(origin="United States", destination="Japan", species="DOG")
    arriving_ids = [r["rule_id"] for r in rules["ARRIVING"]]
    
    assert "JP_MAFF_MICROCHIP_001" in arriving_ids
    assert "JP_MAFF_RABIES_DOUBLE_001" in arriving_ids
    assert "JP_MAFF_TITER_180D_001" in arriving_ids
    assert "JP_MAFF_ADVANCE_NOTIFICATION_001" in arriving_ids
    assert "JP_MAFF_HEALTH_CERT_001" in arriving_ids

    titer_rule = next(r for r in rules["ARRIVING"] if r["rule_id"] == "JP_MAFF_TITER_180D_001")
    assert titer_rule["wait_duration_days"] == 180
    assert titer_rule["severity"] == "CRITICAL_BLOCKER"
    assert "180" in titer_rule["what_to_do"]

    adv_notice_rule = next(r for r in rules["ARRIVING"] if r["rule_id"] == "JP_MAFF_ADVANCE_NOTIFICATION_001")
    assert adv_notice_rule["deadline_window_days"] == 40

def test_uae_moccae_regulatory_corridor_and_banned_breeds():
    """
    Verifies UAE MOCCAE rules: 30-day import permit, RNATT rabies titer,
    and banned breed screening (Pitbull/American Bully blocked vs Labrador allowed).
    """
    rules = get_applicable_rules(origin="United Kingdom", destination="Dubai", species="DOG")
    arriving_ids = [r["rule_id"] for r in rules["ARRIVING"]]

    assert "AE_MOCCAE_IMPORT_PERMIT_001" in arriving_ids
    assert "AE_MOCCAE_BANNED_BREEDS_001" in arriving_ids
    assert "AE_MOCCAE_RABIES_TITER_001" in arriving_ids
    assert "AE_MOCCAE_HEALTH_CERT_001" in arriving_ids

    # Test Banned Breed (e.g. American Bully)
    banned_pet = PetFacts(
        species_field=ExtractedField(value="DOG", confidence=0.95),
        breed_field=ExtractedField(value="American Bully", confidence=0.95),
        microchip_field=ExtractedField(value="985141000123456", confidence=0.95),
    )
    banned_matched = evaluate_evidence(pet_facts=banned_pet, applicable_rules=rules)
    breed_req = next(r for r in banned_matched if r.rule_id == "AE_MOCCAE_BANNED_BREEDS_001")
    assert breed_req.status == "CRITICAL_BLOCKER"
    assert "Prohibited Breed" in breed_req.status_badge

    # Test Permitted Breed (e.g. Golden Retriever)
    permitted_pet = PetFacts(
        species_field=ExtractedField(value="DOG", confidence=0.95),
        breed_field=ExtractedField(value="Golden Retriever", confidence=0.95),
        microchip_field=ExtractedField(value="985141000123456", confidence=0.95),
    )
    permitted_matched = evaluate_evidence(pet_facts=permitted_pet, applicable_rules=rules)
    permitted_breed_req = next(r for r in permitted_matched if r.rule_id == "AE_MOCCAE_BANNED_BREEDS_001")
    assert permitted_breed_req.status == "SATISFIED"
    assert "Breed Permitted" in permitted_breed_req.status_badge

def test_canada_cfia_regulatory_corridor():
    """
    Verifies Canada CFIA rules: licensed veterinary rabies certificate
    and ISO microchip identification.
    """
    rules = get_applicable_rules(origin="France", destination="Canada", species="DOG")
    arriving_ids = [r["rule_id"] for r in rules["ARRIVING"]]

    assert "CA_CFIA_RABIES_CERT_001" in arriving_ids
    assert "CA_CFIA_MICROCHIP_001" in arriving_ids

