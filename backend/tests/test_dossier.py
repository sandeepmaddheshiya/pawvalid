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
    assert "PETVIA TRAVEL COMPLIANCE" in full_text
    assert "DOSSIER" in full_text
    assert "985141000987654" in full_text
    assert "Milo" in full_text
    assert "Regulation (EU) 2026/131" in full_text
    assert "IATA Live Animals Regulations" in full_text

def test_export_dossier_pdf_endpoint():
    from fastapi.testclient import TestClient
    from app.main import app
    client = TestClient(app)

    payload = {
        "route": {"origin": "Australia", "destination": "Austria"},
        "petProfile": {"name": "Bella", "microchipNumber": "985141000999999"},
        "stats": {"overallStatus": "READY_TO_FLY", "earliestFlightDate": "2026-11-20"}
    }
    response = client.post("/api/v1/dossier/pdf", json=payload)
    assert response.status_code == 200
    assert response.headers["content-type"] == "application/pdf"
    assert "Petvia_Travel_Dossier_Bella.pdf" in response.headers.get("content-disposition", "")
    assert response.content.startswith(b"%PDF-")

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

