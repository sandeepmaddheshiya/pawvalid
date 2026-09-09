import pytest
import io
from pypdf import PdfReader
from app.engine.dossier_generator import generate_dossier_pdf

def test_generate_dossier_pdf_structure():
    sample_data = {
        "route": {
            "origin": "Australia",
            "destination": "Austria",
            "transitCountries": ["Singapore"],
            "departureDate": "2026-11-20"
        },
        "petProfile": {
            "species": "DOG",
            "name": "Milo",
            "breed": "Golden Retriever",
            "microchipNumber": "985141000987654",
            "microchipDate": "2025-01-10",
            "rabiesVaccinationDate": "2025-02-15"
        },
        "stats": {
            "overallStatus": "READY_TO_FLY",
            "statusHeadline": "🟢 TRAVEL READY — All prerequisite health checks and route requirements satisfied",
            "earliestFlightDate": "March 08, 2025"
        },
        "timelineMilestones": [
            {
                "date": "2025-01-10",
                "title": "ISO 11784/11785 Microchip Implantation",
                "status": "COMPLETED",
                "description": "Standard 15-digit microchip verified"
            },
            {
                "date": "2025-02-15",
                "title": "Primary Rabies Vaccination",
                "status": "COMPLETED",
                "description": "Inactivated rabies vaccine administered"
            },
            {
                "date": "2025-03-08",
                "title": "✈️ Earliest Estimated Departure Date",
                "status": "GOAL",
                "description": "Prerequisites satisfied"
            }
        ],
        "complianceChecklist": {
            "all": [
                {
                    "ruleId": "EU_MICROCHIP_001",
                    "name": "ISO 11784/11785 Compliant Microchip",
                    "authority": "European Commission",
                    "sourceTitle": "Regulation (EU) 2026/131 Annex III",
                    "ruleVersion": "2026.131",
                    "verifiedAt": "2026-09-07",
                    "statusBadge": "Verified"
                },
                {
                    "ruleId": "EU_RABIES_001",
                    "name": "Primary Rabies Vaccination",
                    "authority": "European Commission",
                    "sourceTitle": "Regulation (EU) 2026/131 Annex III",
                    "ruleVersion": "2026.131",
                    "verifiedAt": "2026-09-07",
                    "statusBadge": "Verified"
                }
            ]
        },
        "readinessReport": {
            "documentAudit": [
                {
                    "filename": "pet_passport.pdf",
                    "detected_type": "Pet Passport",
                    "summary": "Verified microchip 985141000987654 and rabies entry"
                }
            ]
        }
    }

    pdf_buffer = generate_dossier_pdf(sample_data)
    assert isinstance(pdf_buffer, io.BytesIO)
    
    pdf_bytes = pdf_buffer.getvalue()
    assert len(pdf_bytes) > 2000
    assert pdf_bytes.startswith(b"%PDF-")

    # Verify readable with PyPDF
    reader = PdfReader(io.BytesIO(pdf_bytes))
    assert len(reader.pages) >= 1
    
    full_text = "".join([p.extract_text() for p in reader.pages])
    assert "PETVIA TRAVEL READINESS" in full_text
    assert "ASSESSMENT" in full_text
    assert "UNOFFICIAL PREVIEW" in full_text
    assert "985141000987654" in full_text
    assert "Milo" in full_text
    assert "Regulation (EU) 2026/131" in full_text
    assert "IATA Live Animals Regulations" in full_text

    # Also verify paid certified structure
    sample_data_paid = {
        **sample_data,
        "is_paid": True,
        "verificationUrl": "http://localhost:3001/verify/PV-2026-TEST"
    }
    pdf_buffer_paid = generate_dossier_pdf(sample_data_paid)
    reader_paid = PdfReader(pdf_buffer_paid)
    paid_text = "".join([p.extract_text() for p in reader_paid.pages])
    assert "PETVIA VERIFIED TRAVEL" in paid_text
    assert "COMPLIANCE DOSSIER" in paid_text
    assert "VERIFIED TRAVEL COMPLIANCE" in paid_text
    assert "7. Veterinary Clinic Directives" in paid_text
    assert "Pre-Flight Action Checklist" in paid_text
    assert "STATUTORY GOVERNMENT EXPORT CERTIFICATE" in paid_text
    assert "INDEPENDENT" in paid_text
    assert "6. Digital Travel Verification Record" in paid_text
    assert "Live Verification URL:" in paid_text
    assert "Record Integrity Seal:" in paid_text
    assert "Regulation (EU) 2026/131" in paid_text
    assert "IATA Live Animals Regulations" in paid_text
    assert "ACTIVE" in paid_text
    assert "HASH VERIFIED" in paid_text
    assert "This digital record is provided for travel preparation and reference" in paid_text
    assert "localhost" not in paid_text
    assert "https://petvia.com/verify/PV-2026-TEST" in paid_text


def test_export_dossier_pdf_endpoint():
    from fastapi.testclient import TestClient
    from app.main import app
    client = TestClient(app)

    # Free Preview Request
    payload = {
        "route": {"origin": "Australia", "destination": "Austria"},
        "petProfile": {"name": "Bella", "microchipNumber": "985141000999999"},
        "stats": {"overallStatus": "READY_TO_FLY", "earliestFlightDate": "2026-11-20"}
    }
    response = client.post("/api/v1/dossier/pdf", json=payload)
    assert response.status_code == 200
    assert response.headers["content-type"] == "application/pdf"
    assert "Petvia_Preview_Dossier_Bella.pdf" in response.headers.get("content-disposition", "")
    assert response.content.startswith(b"%PDF-")

    # Paid Certified Request
    payload_paid = {
        **payload,
        "is_paid": True
    }
    res_paid = client.post("/api/v1/dossier/pdf", json=payload_paid)
    assert res_paid.status_code == 200
    assert "Petvia_Certified_Travel_Dossier_Bella.pdf" in res_paid.headers.get("content-disposition", "")


def test_dossier_pdf_with_trip_payload_and_layovers():
    """Verify that payload structured inside trip with country codes and layovers resolves properly."""
    payload = {
        "trip": {
            "id": "TRIP-12345",
            "petName": "Pilluu bhai",
            "species": "DOG",
            "breed": "Beagle",
            "origin": "GB",
            "destination": "DE",
            "transitCountries": ["FR"],
            "earliestFlightDate": "September 15, 2026",
            "overallStatus": "ACTION_REQUIRED"
        },
        "petProfile": {
            "microchipNumber": "985112003456789",
            "microchipDate": "2021-05-01"
        }
    }
    pdf_buffer = generate_dossier_pdf(payload)
    reader = PdfReader(pdf_buffer)
    full_text = "".join([p.extract_text() for p in reader.pages])

    assert "Pilluu bhai" in full_text
    assert "United Kingdom (GB)" in full_text
    assert "Germany (DE)" in full_text
    assert "Transiting via France (FR)" in full_text
    assert "Direct Route" not in full_text
    assert "Not Specified" not in full_text

def test_dossier_pdf_audit_trail_rendering_with_multi_documents():
    """Verify that multi-document audit trail table renders with distinct types and summaries."""
    payload = {
        "trip": {
            "petName": "Pilluu bhai",
            "species": "DOG",
            "origin": "GB",
            "destination": "DE",
            "earliestFlightDate": "September 15, 2026",
            "overallStatus": "READY_TO_FLY"
        },
        "petProfile": {
            "microchipNumber": "985112003456789"
        },
        "readinessReport": {
            "documentAudit": [
                {"filename": "eu_annex_iv_health_certificate.pdf", "detected_type": "EU Annex IV Health Certificate", "summary": "Official EU Annex IV health certificate verified."},
                {"filename": "owner_declaration.pdf", "detected_type": "Non-Commercial Owner Declaration", "summary": "Non-commercial owner declaration verified."},
                {"filename": "rabies_cert.pdf", "detected_type": "Rabies / Vaccination Certificate", "summary": "Rabies vaccination certificate verified."},
                {"filename": "pet_passport.pdf", "detected_type": "Official Pet Passport", "summary": "Official Pet Passport verified."},
                {"filename": "titer_report.pdf", "detected_type": "Rabies Titer (FAVN/RNATT) Lab Report", "summary": "Rabies antibody titer serology report verified."},
                {"filename": "health_certificate.pdf", "detected_type": "Official Veterinary Health Certificate", "summary": "Veterinary health certificate verified."},
                {"filename": "microchip_record.pdf", "detected_type": "Microchip Registration Record", "summary": "ISO 11784/11785 15-digit microchip registration certificate verified."}
            ]
        }
    }
    pdf_buffer = generate_dossier_pdf(payload)
    reader = PdfReader(pdf_buffer)
    full_text = "".join([p.extract_text() for p in reader.pages])

    assert "5. Document Extraction Audit Trail" in full_text
    clean_text = full_text.replace("\n", " ")
    assert "eu_annex_iv_health_certificate.pdf" in clean_text or "eu_annex_iv_health_certific" in full_text
    assert "owner_declaration.pdf" in clean_text
    assert "titer_report.pdf" in clean_text
    assert "pet_passport.pdf" in clean_text
    assert "EU Annex IV Health Certificate" in clean_text
    assert "Rabies Titer (FAVN/RNATT) Lab Report" in clean_text
    assert "Non-Commercial Owner Declaration" in clean_text

