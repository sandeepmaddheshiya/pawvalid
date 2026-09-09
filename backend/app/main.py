import os
from typing import List, Optional, Dict, Any
from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware

from app.config import HOST, PORT, OPENROUTER_MODEL
from app.parsers.doc_extractor import extract_from_bytes, ExtractedDocument
from app.engine.entity_extractor import extract_facts_with_ai
from app.engine.rules_catalog import get_applicable_rules
from app.engine.evidence_matcher import evaluate_evidence
from app.engine.dependency_graph import build_dependency_timeline
from app.engine.readiness import evaluate_readiness
from app.engine.synthesizer import build_synthesis
from app.engine.dossier_generator import generate_dossier_pdf

app = FastAPI(
    title="PawValid Document Compliance & Timeline Engine",
    description="Multimodal Document Intelligence, Dependency Graph & Border Readiness Engine",
    version="2.0.0"
)

# Enable CORS for Next.js app
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {
        "status": "healthy",
        "service": "pawvalid-python-backend",
        "version": "2.0.0",
        "model": OPENROUTER_MODEL
    }

@app.post("/api/v1/scan")
async def scan_documents(
    files: List[UploadFile] = File(...),
    origin_country: str = Form(...),
    destination_country: str = Form(...),
    species: Optional[str] = Form(None),
    pet_name: Optional[str] = Form(None),
    breed: Optional[str] = Form(None),
    birthday: Optional[str] = Form(None),
    transit_countries: Optional[str] = Form(None),
    departure_date: Optional[str] = Form(None)
):
    """
    Complete Document Intelligence & Compliance Pipeline:
    1. Parse uploaded documents/images into raw text/metadata
    2. Extract facts via OpenRouter Nemotron 3 Ultra (extraction only)
    3. Retrieve applicable route rules from Rules Catalog
    4. Evidence Matcher: Match PetFacts against applicable declarative rules
    5. Dependency Graph: Build milestone timeline & compute earliest departure date
    6. Readiness Engine: Evaluate categorical status, blocker counts, and safe framing
    7. Synthesize plain-English explanations & next steps
    """
    if not files:
        raise HTTPException(status_code=400, detail="At least one document file is required.")

    # 1. Parse documents
    extracted_docs: List[ExtractedDocument] = []
    for file in files:
        content = await file.read()
        doc = extract_from_bytes(
            file_bytes=content,
            filename=file.filename or "uploaded_doc",
            content_type=file.content_type or "application/octet-stream"
        )
        extracted_docs.append(doc)

    # 2. Extract facts with provenance using strict LLM boundary
    facts = await extract_facts_with_ai(extracted_docs)

    # Honor user-specified species, pet_name, breed, and birthday if provided
    if species:
        spec_clean = species.strip().upper()
        if spec_clean in ["DOG", "CAT"]:
            facts.species_field.value = spec_clean
    if pet_name and pet_name.strip():
        facts.name_field.value = pet_name.strip()
    if breed and breed.strip():
        facts.breed_field.value = breed.strip()
    if birthday and birthday.strip():
        facts.birthday = birthday.strip()

    transits = [t.strip() for t in transit_countries.split(",") if t.strip()] if transit_countries else []

    # 3. Retrieve multi-jurisdiction declarative rules
    rules = get_applicable_rules(
        origin=origin_country,
        destination=destination_country,
        transit_countries=transits,
        species=facts.species
    )

    # 4. Evidence Matcher: Match facts against declarative rules & prerequisites
    matched_requirements = evaluate_evidence(
        pet_facts=facts,
        applicable_rules=rules,
        target_departure_date=departure_date
    )

    # 5. Dependency Graph: Build milestone timeline & compute earliest estimated travel date
    timeline_result = build_dependency_timeline(
        matched_requirements=matched_requirements,
        pet_facts=facts,
        target_departure_date=departure_date
    )

    # 6. Readiness Engine: Compute categorical status, blocker counts, and safe framing
    readiness = evaluate_readiness(
        matched_requirements=matched_requirements,
        timeline_result=timeline_result,
        origin=origin_country,
        destination=destination_country,
        transit_countries=transits,
        facts=facts
    )

    # 7. Synthesize empathetic explanation, blocker actions, and travel-day preparations
    synthesis = build_synthesis(
        facts=facts,
        readiness_result=readiness,
        origin=origin_country,
        destination=destination_country,
        transit_countries=transits
    )

    all_evals = readiness["evaluations"]

    # 8. Format final comprehensive response
    return {
        "status": "success",
        "route": {
            "origin": origin_country,
            "destination": destination_country,
            "transitCountries": transits,
            "departureDate": departure_date
        },
        "petDetected": facts.species != "UNKNOWN" or bool(facts.microchip_number) or bool(facts.pet_name) or bool(pet_name),
        "petProfile": {
            "species": facts.species if facts.species != "UNKNOWN" else (species.upper() if species else "DOG"),
            "name": facts.pet_name or pet_name or "My Pet",
            "breed": facts.breed or breed or ("Domestic Shorthair" if (species or "").upper() == "CAT" else "Companion Animal"),
            "birthday": birthday or getattr(facts, "birthday", None),
            "microchipNumber": facts.microchip_number,
            "microchipDate": facts.microchip_date,
            "rabiesVaccinationDate": facts.rabies_date,
            "rabiesVaccinationType": facts.rabies_type,
            "dhppVaccinationDate": facts.dhpp_date
        },
        "factsWithConfidence": facts.to_dict(),
        "stats": {
            "documentsDetectedCount": len(extracted_docs),
            "overallStatus": readiness["overallStatus"],
            "statusHeadline": readiness["statusHeadline"],
            "needsHumanReview": readiness["needsHumanReview"],
            "earliestFlightDate": readiness["earliestFlightDate"],
            "earliestFlightDateTitle": readiness["earliestFlightDateTitle"],
            "earliestFlightDateSubtitle": readiness["earliestFlightDateSubtitle"],
            "disclaimer": readiness["disclaimer"],
            "blockerSummary": readiness["blockerSummary"],
            "confidenceLevel": "High" if facts.microchip_number and facts.rabies_date else "Preliminary"
        },
        "timelineMilestones": readiness["timelineMilestones"],
        "complianceChecklist": readiness["complianceChecklist"],
        "readinessReport": {
            "whatThisMeans": synthesis["whatThisMeans"],
            "whereThingsStand": synthesis["whereThingsStand"],
            "documentAudit": synthesis["documentAudit"],
            "nextSteps": synthesis["nextSteps"],
            "travelDayPrep": synthesis["travelDayPrep"]
        }
    }

@app.post("/api/v1/dossier/pdf")
async def export_dossier_pdf(dossier_data: Dict[str, Any]):
    """
    Compiles verified compliance evaluations into an airline-ready vector PDF dossier.
    """
    try:
        is_paid = bool(
            dossier_data.get("is_paid")
            or dossier_data.get("isPaid")
            or dossier_data.get("tier") in ("CERTIFIED_PASS", "CONCIERGE")
            or (dossier_data.get("trip") or {}).get("tier") in ("CERTIFIED_PASS", "CONCIERGE")
            or (dossier_data.get("trip") or {}).get("isPaid")
        )
        pdf_buffer = generate_dossier_pdf(dossier_data)
        pet_name = (
            dossier_data.get("petProfile", {}).get("name")
            or (dossier_data.get("trip") or {}).get("petName")
            or dossier_data.get("petName")
            or "Pet"
        )
        safe_name = "".join(c for c in pet_name if c.isalnum() or c in (' ', '_', '-')).strip() or "Pet"
        prefix = "PawValid_Certified_Travel_Dossier" if is_paid else "PawValid_Preview_Dossier"
        filename = f"{prefix}_{safe_name}.pdf"

        return StreamingResponse(
            pdf_buffer,
            media_type="application/pdf",
            headers={
                "Content-Disposition": f'attachment; filename="{filename}"',
                "Access-Control-Expose-Headers": "Content-Disposition"
            }
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate travel dossier: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host=HOST, port=PORT, reload=True)

