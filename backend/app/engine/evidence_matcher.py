"""
Evidence Matcher Component for Petvia

Sits cleanly between the Regulatory Rules Catalog and the Readiness Engine:
Rules Catalog -> Applicable Rules -> Evidence Matcher <- PetFacts -> Requirement States

Evaluates route-specific applicable rules against extracted pet facts,
validates declarative prerequisites, checks waiting periods, and assigns
evidence provenance and confidence states.
"""

from datetime import datetime, timedelta, timezone
from typing import Dict, Any, List, Optional
from app.engine.entity_extractor import PetFacts

def parse_iso_or_common_date(date_str: Optional[str]) -> Optional[datetime]:
    if not date_str or not isinstance(date_str, str):
        return None
    cleaned = date_str.strip()
    try:
        return datetime.fromisoformat(cleaned.replace("Z", "+00:00")).replace(tzinfo=timezone.utc)
    except Exception:
        pass
    for fmt in ["%Y-%m-%d", "%d/%m/%Y", "%m/%d/%Y", "%d-%m-%Y"]:
        try:
            return datetime.strptime(cleaned, fmt).replace(tzinfo=timezone.utc)
        except Exception:
            continue
    return None

class MatchedRequirement:
    def __init__(
        self,
        rule_id: str,
        name: str,
        category: str,
        scope: str,
        jurisdiction: str,
        source: str,
        source_title: str,
        rule_version: str,
        effective_from: str,
        verified_at: str,
        source_url: str,
        status: str,  # "SATISFIED", "CRITICAL_BLOCKER", "REQUIRED_ACTION", "TRAVEL_DAY_ACTION"
        severity: str,
        status_badge: str,
        what_to_do: str,
        details: str,
        deadlines: str,
        matched_evidence: Dict[str, Any],
        wait_days_min: int = 0,
        wait_end_date: Optional[str] = None,
        earliest_valid_date: Optional[str] = None,
    ):
        self.rule_id = rule_id
        self.name = name
        self.category = category
        self.scope = scope
        self.jurisdiction = jurisdiction
        self.source = source
        self.source_title = source_title
        self.rule_version = rule_version
        self.effective_from = effective_from
        self.verified_at = verified_at
        self.source_url = source_url
        self.status = status
        self.severity = severity
        self.status_badge = status_badge
        self.what_to_do = what_to_do
        self.details = details
        self.deadlines = deadlines
        self.matched_evidence = matched_evidence
        self.wait_days_min = wait_days_min
        self.wait_end_date = wait_end_date
        self.earliest_valid_date = earliest_valid_date

    def to_dict(self) -> Dict[str, Any]:
        return {
            "ruleId": self.rule_id,
            "name": self.name,
            "category": self.category,
            "scope": self.scope,
            "jurisdiction": self.jurisdiction,
            "authority": self.source,
            "sourceTitle": self.source_title,
            "ruleVersion": self.rule_version,
            "effectiveFrom": self.effective_from,
            "verifiedAt": self.verified_at,
            "sourceUrl": self.source_url,
            "status": self.status,
            "severity": self.severity,
            "statusBadge": self.status_badge,
            "whatToDo": self.what_to_do,
            "details": self.details,
            "deadlines": self.deadlines,
            "matchedEvidence": self.matched_evidence,
            "waitDaysMin": self.wait_days_min,
            "waitEndDate": self.wait_end_date,
            "earliestValidDate": self.earliest_valid_date,
        }

def evaluate_evidence(
    pet_facts: PetFacts,
    applicable_rules: Dict[str, List[Dict[str, Any]]],
    target_departure_date: Optional[str] = None
) -> List[MatchedRequirement]:
    """
    Evaluates extracted PetFacts against declarative rules.
    """
    today = datetime.now(timezone.utc)
    all_rules = applicable_rules.get("ALL", [])
    matched_results: List[MatchedRequirement] = []

    # Parse primary facts
    chip_num = pet_facts.microchip_number
    chip_dt = parse_iso_or_common_date(pet_facts.microchip_date)
    rabies_dt = parse_iso_or_common_date(pet_facts.rabies_date)
    dhpp_dt = parse_iso_or_common_date(pet_facts.dhpp_date)
    titer_dt = parse_iso_or_common_date(pet_facts.titer_date)
    tapeworm_dt = parse_iso_or_common_date(pet_facts.tapeworm_date)
    species = pet_facts.species

    for rule in all_rules:
        r_id = rule["rule_id"]
        r_name = rule["name"]
        r_cat = rule["category"]
        r_scope = rule["scope"]
        r_jur = rule.get("jurisdiction", "GLOBAL")
        r_src = rule.get("source", "Government Authority")
        r_title = rule.get("source_title", "Regulatory Standards")
        r_ver = rule.get("rule_version", "2026.1")
        r_eff = rule.get("effective_from", "2026-01-01")
        r_ver_at = rule.get("verified_at", "2026-09-07")
        r_url = rule.get("source_url", "")
        requires = rule.get("requires", {})
        ev_type = requires.get("evidence_type", "")
        wait_days = rule.get("wait_duration_days", 0)

        # Default fallback values
        status = "REQUIRED_ACTION"
        severity = rule.get("severity", "REQUIRED_ACTION")
        status_badge = "🟡 Required Action"
        what_to_do = rule.get("what_to_do", "")
        details = rule.get("details", "")
        deadlines = "Action required before travel"
        matched_ev: Dict[str, Any] = {}
        wait_end_date: Optional[str] = None
        earliest_valid_date: Optional[str] = None

        # ─── SPECIES ────────────────────────────────────────────────────────
        if ev_type == "SPECIES":
            sp_field = pet_facts.species_field
            matched_ev = sp_field.to_dict()
            if species != "UNKNOWN":
                status = "SATISFIED"
                severity = "COMPLETED"
                status_badge = "✓ Verified"
                what_to_do = "Species verified."
                details = f"Pet identified as {species.capitalize()} from documents."
                deadlines = "Completed"
            else:
                status = "REQUIRED_ACTION"
                severity = "REQUIRED_ACTION"
                status_badge = "⚠️ Confirm Species"
                what_to_do = "Confirm whether pet is dog or cat."
                details = "Species dictates species-specific vaccine mandates."

        # ─── MICROCHIP ──────────────────────────────────────────────────────
        elif ev_type == "MICROCHIP":
            chip_field = pet_facts.microchip_field
            matched_ev = chip_field.to_dict()
            if chip_num:
                status = "SATISFIED"
                severity = "COMPLETED"
                status_badge = "✓ Verified"
                what_to_do = "Microchip verified."
                details = f"ISO 11784/11785 transponder #{chip_num} documented."
                deadlines = "Completed"
                earliest_valid_date = (chip_dt or today).strftime("%Y-%m-%d")
            else:
                status = "CRITICAL_BLOCKER"
                severity = "CRITICAL_BLOCKER"
                status_badge = "🔴 Critical Blocker"
                what_to_do = "Schedule microchip implantation immediately before administering travel vaccines."
                details = f"Missing 15-digit ISO microchip. Required under {r_title} ({r_ver})."
                deadlines = "Must implant before vaccination"

        # ─── RABIES VACCINATION & WAITING PERIOD ─────────────────────────────
        elif ev_type == "RABIES":
            rabies_field = pet_facts.rabies_date_field
            matched_ev = rabies_field.to_dict()

            # Check declarative prerequisite: microchip before vaccine
            microchip_before_vaccine = requires.get("microchip_before_vaccine", False)
            if microchip_before_vaccine and chip_dt and rabies_dt and rabies_dt < chip_dt:
                status = "CRITICAL_BLOCKER"
                severity = "CRITICAL_BLOCKER"
                status_badge = "🔴 Critical Blocker"
                what_to_do = "Your vet must revaccinate your pet after microchip verification, restarting the required waiting period."
                details = (
                    f"Rabies vaccination recorded on {rabies_dt.strftime('%Y-%m-%d')} predates microchip implantation on "
                    f"{chip_dt.strftime('%Y-%m-%d')}. Under {r_title} (Rule {r_ver}), vaccinations administered prior to "
                    "microchip identification are legally void for international clearance."
                )
                deadlines = "Must revaccinate prior to travel"
            elif rabies_field.status == "CONFLICTING":
                status = "CRITICAL_BLOCKER"
                severity = "CRITICAL_BLOCKER"
                status_badge = "🔴 Conflicting Evidence — Action Required"
                conflict_list = [f"{c.get('value')} in {c.get('sourceDocument')}" for c in rabies_field.conflicting_values]
                what_to_do = "Confirm which rabies vaccination date is accurate before travel or request expert review."
                details = f"Multiple conflicting dates detected: {', '.join(conflict_list)}. Border clearance will be denied if documentation contains contradictory dates."
                deadlines = "Must clarify conflicting dates prior to flight"
            elif rabies_dt:
                wait_end = rabies_dt + timedelta(days=wait_days)
                wait_end_date = wait_end.strftime("%Y-%m-%d")
                earliest_valid_date = wait_end_date

                if today >= wait_end:
                    status = "SATISFIED"
                    severity = "COMPLETED"
                    status_badge = "✓ Verified"
                    what_to_do = "Rabies compliance verified."
                    details = f"Vaccination given on {rabies_dt.strftime('%b %d, %Y')}. The mandatory {wait_days}-day wait period ended on {wait_end.strftime('%b %d, %Y')}."
                    deadlines = "Completed"
                else:
                    days_left = (wait_end - today).days
                    status = "REQUIRED_ACTION"
                    severity = "REQUIRED_ACTION"
                    status_badge = "🟡 Waiting Period"
                    what_to_do = f"Do not book departure prior to {wait_end.strftime('%b %d, %Y')}."
                    details = f"Mandatory {wait_days}-day latency period in progress ({days_left} days remaining until {wait_end.strftime('%b %d, %Y')})."
                    deadlines = f"Valid from {wait_end.strftime('%b %d, %Y')}"
            else:
                status = "CRITICAL_BLOCKER"
                severity = "CRITICAL_BLOCKER"
                status_badge = "🔴 Critical Blocker"
                what_to_do = "Administer rabies vaccine and observe mandatory waiting period."
                details = f"No valid rabies vaccination record identified. Mandatory under {r_title}."
                deadlines = "Must vaccinate at least 21 days before travel"

        # ─── RABIES TITER TEST ───────────────────────────────────────────────
        elif ev_type == "TITER":
            titer_field = pet_facts.titer_date_field
            matched_ev = titer_field.to_dict()
            titer_val = pet_facts.titer_level
            if titer_dt and titer_val and titer_val >= 0.5:
                wait_end = titer_dt + timedelta(days=wait_days)
                wait_end_date = wait_end.strftime("%Y-%m-%d")
                earliest_valid_date = wait_end_date
                if today >= wait_end:
                    status = "SATISFIED"
                    severity = "COMPLETED"
                    status_badge = "✓ Verified"
                    what_to_do = "Rabies titer test verified."
                    details = f"Titer result {titer_val} IU/mL >= 0.5 IU/mL verified. {wait_days}-day wait period cleared on {wait_end.strftime('%b %d, %Y')}."
                    deadlines = "Completed"
                else:
                    days_left = (wait_end - today).days
                    status = "REQUIRED_ACTION"
                    severity = "REQUIRED_ACTION"
                    status_badge = f"🟡 {wait_days}-Day Wait Active"
                    what_to_do = f"Wait for the mandatory {wait_days}-day quarantine period to elapse on {wait_end.strftime('%b %d, %Y')}."
                    details = f"Blood draw date was {titer_dt.strftime('%b %d, %Y')}. {days_left} days remaining."
                    deadlines = f"Valid from {wait_end.strftime('%b %d, %Y')}"
            elif titer_dt and titer_val and titer_val < 0.5:
                status = "CRITICAL_BLOCKER"
                severity = "CRITICAL_BLOCKER"
                status_badge = "🔴 Titer Test Failed"
                what_to_do = "Administer rabies booster and retest antibody level after 30 days."
                details = f"Extracted titer level ({titer_val} IU/mL) is below the mandatory 0.5 IU/mL standard required by {r_title}."
                deadlines = "Retest required"
            else:
                status = "CRITICAL_BLOCKER"
                severity = "CRITICAL_BLOCKER"
                status_badge = "🔴 Critical Blocker"
                what_to_do = "Schedule rabies antibody titer blood test at an accredited laboratory."
                details = f"A passing antibody titer test (>= 0.5 IU/mL) and mandatory {wait_days}-day wait are required under {r_title}."
                deadlines = f"Requires {wait_days}+ days advance planning"

        # ─── BANNED BREED ────────────────────────────────────────────────────
        elif ev_type == "BANNED_BREED":
            breed_str = (pet_facts.breed or "").upper()
            prohibited_keywords = [
                "PIT BULL", "PITBULL", "STAFFORDSHIRE", "AMERICAN BULLY", 
                "MASTIFF", "ROTTWEILER", "DOBERMAN", "PRESA CANARIO", 
                "BOXER", "CANE CORSO", "ARGENTINO", "FILA", "TOSA"
            ]
            is_banned = any(k in breed_str for k in prohibited_keywords)
            if is_banned:
                status = "CRITICAL_BLOCKER"
                severity = "CRITICAL_BLOCKER"
                status_badge = "🔴 Prohibited Breed"
                what_to_do = f"Breed '{pet_facts.breed}' is strictly prohibited from importation into {r_jur} under {r_title}."
                details = "Commercial and personal importation of this breed is prohibited by law. Boarding will be denied."
                deadlines = "Importation banned"
            else:
                status = "SATISFIED"
                severity = "COMPLETED"
                status_badge = "✓ Breed Permitted"
                what_to_do = "Breed compliance verified."
                details = f"Breed '{pet_facts.breed or 'Domestic'}' is permitted for importation under {r_title}."
                deadlines = "Completed"

        # ─── CORE VACCINE (DHPP) ─────────────────────────────────────────────
        elif ev_type == "DHPP":
            dhpp_field = pet_facts.dhpp_date_field
            matched_ev = dhpp_field.to_dict()
            if dhpp_dt:
                status = "SATISFIED"
                severity = "COMPLETED"
                status_badge = "✓ Verified"
                what_to_do = "Core vaccine verified."
                details = f"Core vaccine recorded on {dhpp_dt.strftime('%b %d, %Y')}."
                deadlines = "Completed"
            else:
                status = "REQUIRED_ACTION"
                severity = "REQUIRED_ACTION"
                status_badge = "🟡 Required Action"
                what_to_do = "Confirm core combined vaccine (DHPP) record with your vet."
                details = "Required for international transport."
                deadlines = "At least 21 days before travel"

        # ─── TAPEWORM ────────────────────────────────────────────────────────
        elif ev_type == "TAPEWORM":
            tw_field = pet_facts.tapeworm_date_field
            matched_ev = tw_field.to_dict()
            status = "REQUIRED_ACTION"
            severity = "REQUIRED_ACTION"
            status_badge = "🟡 24–120h Vet Window"
            what_to_do = "Vet must administer praziquantel between 24 and 120 hours before arrival."
            details = f"Mandatory tapeworm treatment required under {r_title}."
            deadlines = "1 to 5 days before flight"

        # ─── HEALTH CERTIFICATE ──────────────────────────────────────────────
        elif ev_type == "HEALTH_CERT":
            hc_field = pet_facts.has_health_cert_field
            matched_ev = hc_field.to_dict()
            status = "REQUIRED_ACTION"
            severity = "REQUIRED_ACTION"
            status_badge = "🟡 Required Action"
            what_to_do = "Book official health exam within 10 days of flight with accredited vet."
            details = f"Official government endorsement required under {r_title} ({r_ver})."
            deadlines = "Issued within 10 days of departure"

        # ─── EXPORT PERMIT ───────────────────────────────────────────────────
        elif ev_type == "EXPORT_PERMIT":
            ep_field = pet_facts.has_export_permit_field
            matched_ev = ep_field.to_dict()
            if pet_facts.has_export_permit:
                status = "SATISFIED"
                severity = "COMPLETED"
                status_badge = "✓ Verified"
                what_to_do = "Export clearance verified."
                details = f"Official export permit/clearance recorded under {r_title}."
                deadlines = "Completed"
            else:
                status = "CRITICAL_BLOCKER" if severity == "CRITICAL_BLOCKER" else "REQUIRED_ACTION"
                status_badge = "🔴 Critical Blocker" if severity == "CRITICAL_BLOCKER" else "🟡 Required Action"
                what_to_do = what_to_do or "Apply for origin government export permit."
                details = details or f"Required under {r_title}."
                deadlines = "Apply 2 to 4 weeks prior to travel"

        # ─── IMPORT PERMIT / TRANSSHIPMENT LICENSE ───────────────────────────
        elif ev_type == "IMPORT_PERMIT":
            ip_field = pet_facts.has_import_permit_field
            matched_ev = ip_field.to_dict()
            if pet_facts.has_import_permit:
                status = "SATISFIED"
                severity = "COMPLETED"
                status_badge = "✓ Verified"
                what_to_do = "Permit verified."
                details = f"Import / transshipment permit documented under {r_title}."
                deadlines = "Completed"
            else:
                status = "CRITICAL_BLOCKER" if severity == "CRITICAL_BLOCKER" else "REQUIRED_ACTION"
                status_badge = "🔴 Critical Blocker" if severity == "CRITICAL_BLOCKER" else "🟡 Required Action"
                what_to_do = what_to_do or "Obtain transit / import permit."
                details = details or f"Required under {r_title}."
                deadlines = "Apply at least 2 weeks before travel"

        # ─── OWNER DECLARATION ───────────────────────────────────────────────
        elif ev_type == "DECLARATION":
            decl_field = pet_facts.has_declaration_field
            matched_ev = decl_field.to_dict()
            if pet_facts.has_declaration:
                status = "SATISFIED"
                severity = "COMPLETED"
                status_badge = "✓ Verified"
                what_to_do = "Declaration verified."
                details = "Signed non-commercial owner declaration verified."
                deadlines = "Completed"
            else:
                status = "REQUIRED_ACTION"
                severity = "REQUIRED_ACTION"
                status_badge = "🟡 Required Action"
                what_to_do = "Sign non-commercial owner declaration form."
                details = f"Accompanies health certificate under {r_title}."
                deadlines = "Sign before departure"

        # ─── CARRIER / IATA CRATE ────────────────────────────────────────────
        elif ev_type == "CARRIER":
            status = "TRAVEL_DAY_ACTION"
            severity = "TRAVEL_DAY_ACTION"
            status_badge = "✈️ Travel-Day"
            what_to_do = "Verify crate is IATA CR-82 compliant with 4-side ventilation and metal hardware."
            details = f"Mandated under {r_title} ({r_ver})."
            deadlines = "Day of departure"

        # ─── AIRPORT BUFFER ──────────────────────────────────────────────────
        elif ev_type == "AIRPORT_BUFFER":
            status = "TRAVEL_DAY_ACTION"
            severity = "TRAVEL_DAY_ACTION"
            status_badge = "✈️ Travel-Day"
            what_to_do = "Arrive 4 hours before departure for cargo, or 2 to 3 hours for in-cabin excess baggage."
            details = f"Required by airport ground handlers under {r_title}."
            deadlines = "Day of departure"

        matched_results.append(
            MatchedRequirement(
                rule_id=r_id,
                name=r_name,
                category=r_cat,
                scope=r_scope,
                jurisdiction=r_jur,
                source=r_src,
                source_title=r_title,
                rule_version=r_ver,
                effective_from=r_eff,
                verified_at=r_ver_at,
                source_url=r_url,
                status=status,
                severity=severity,
                status_badge=status_badge,
                what_to_do=what_to_do,
                details=details,
                deadlines=deadlines,
                matched_evidence=matched_ev,
                wait_days_min=wait_days,
                wait_end_date=wait_end_date,
                earliest_valid_date=earliest_valid_date,
            )
        )

    return matched_results
