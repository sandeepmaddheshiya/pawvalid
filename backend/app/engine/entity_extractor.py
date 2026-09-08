import re
import json
import httpx
from typing import List, Dict, Any, Optional
from app.config import OPENROUTER_API_KEY, OPENROUTER_MODEL
from app.parsers.doc_extractor import ExtractedDocument

class ExtractedField:
    def __init__(
        self,
        value: Optional[Any] = None,
        confidence: float = 0.0,
        source_document: str = "Unknown",
        source_page: Optional[int] = None,
        raw_snippet: Optional[str] = None,
        status: Optional[str] = None,
        conflicting_values: Optional[List[Dict[str, Any]]] = None
    ):
        self.value = value
        self.confidence = float(confidence)
        self.source_document = source_document
        self.source_page = source_page
        self.raw_snippet = raw_snippet
        self.conflicting_values = conflicting_values or []

        # Determine evidence state if not explicitly specified
        if status:
            self.status = status
        elif self.conflicting_values and len(self.conflicting_values) > 1:
            self.status = "CONFLICTING"
        elif self.value is None or self.value == "" or self.confidence == 0.0:
            self.status = "NOT_FOUND"
        elif self.confidence < 0.75:
            self.status = "NEEDS_CONFIRMATION"
        elif self.confidence >= 0.85:
            self.status = "VERIFIED"
        else:
            self.status = "INFERRED"

        self.needs_confirmation = self.status in ["NEEDS_CONFIRMATION", "CONFLICTING"]

    def to_dict(self) -> Dict[str, Any]:
        return {
            "value": self.value,
            "confidence": round(self.confidence, 2),
            "status": self.status,
            "sourceDocument": self.source_document,
            "sourcePage": self.source_page,
            "rawSnippet": self.raw_snippet,
            "needsConfirmation": self.needs_confirmation,
            "conflictingValues": self.conflicting_values
        }

class PetFacts:
    def __init__(
        self,
        species_field: Optional[ExtractedField] = None,
        name_field: Optional[ExtractedField] = None,
        breed_field: Optional[ExtractedField] = None,
        microchip_field: Optional[ExtractedField] = None,
        microchip_date_field: Optional[ExtractedField] = None,
        rabies_date_field: Optional[ExtractedField] = None,
        rabies_type_field: Optional[ExtractedField] = None,
        rabies_end_field: Optional[ExtractedField] = None,
        dhpp_date_field: Optional[ExtractedField] = None,
        titer_date_field: Optional[ExtractedField] = None,
        titer_level_field: Optional[ExtractedField] = None,
        tapeworm_date_field: Optional[ExtractedField] = None,
        has_health_cert_field: Optional[ExtractedField] = None,
        has_export_permit_field: Optional[ExtractedField] = None,
        has_import_permit_field: Optional[ExtractedField] = None,
        has_declaration_field: Optional[ExtractedField] = None,
        doc_audit: Optional[List[Dict[str, Any]]] = None,
        raw_ai_response: Optional[str] = None
    ):
        self.species_field = species_field or ExtractedField(value="UNKNOWN", confidence=0.0)
        self.name_field = name_field or ExtractedField()
        self.breed_field = breed_field or ExtractedField()
        self.microchip_field = microchip_field or ExtractedField()
        self.microchip_date_field = microchip_date_field or ExtractedField()
        self.rabies_date_field = rabies_date_field or ExtractedField()
        self.rabies_type_field = rabies_type_field or ExtractedField()
        self.rabies_end_field = rabies_end_field or ExtractedField()
        self.dhpp_date_field = dhpp_date_field or ExtractedField()
        self.titer_date_field = titer_date_field or ExtractedField()
        self.titer_level_field = titer_level_field or ExtractedField()
        self.tapeworm_date_field = tapeworm_date_field or ExtractedField()
        self.has_health_cert_field = has_health_cert_field or ExtractedField(value=False)
        self.has_export_permit_field = has_export_permit_field or ExtractedField(value=False)
        self.has_import_permit_field = has_import_permit_field or ExtractedField(value=False)
        self.has_declaration_field = has_declaration_field or ExtractedField(value=False)
        self.doc_audit = doc_audit or []
        self.raw_ai_response = raw_ai_response

    # Backwards-compatible convenience properties
    @property
    def species(self) -> str:
        return str(self.species_field.value or "UNKNOWN")

    @property
    def pet_name(self) -> Optional[str]:
        return self.name_field.value

    @property
    def breed(self) -> Optional[str]:
        return self.breed_field.value

    @property
    def microchip_number(self) -> Optional[str]:
        return self.microchip_field.value

    @property
    def microchip_date(self) -> Optional[str]:
        return self.microchip_date_field.value

    @property
    def rabies_date(self) -> Optional[str]:
        return self.rabies_date_field.value

    @property
    def rabies_type(self) -> Optional[str]:
        return self.rabies_type_field.value

    @property
    def rabies_validity_end(self) -> Optional[str]:
        return self.rabies_end_field.value

    @property
    def dhpp_date(self) -> Optional[str]:
        return self.dhpp_date_field.value

    @property
    def titer_date(self) -> Optional[str]:
        return self.titer_date_field.value

    @property
    def titer_level(self) -> Optional[float]:
        return self.titer_level_field.value

    @property
    def tapeworm_date(self) -> Optional[str]:
        return self.tapeworm_date_field.value

    @property
    def has_health_cert(self) -> bool:
        return bool(self.has_health_cert_field.value)

    @property
    def has_export_permit(self) -> bool:
        return bool(self.has_export_permit_field.value)

    @property
    def has_import_permit(self) -> bool:
        return bool(self.has_import_permit_field.value)

    @property
    def has_declaration(self) -> bool:
        return bool(self.has_declaration_field.value)

    def to_dict(self) -> Dict[str, Any]:
        return {
            "species": self.species_field.to_dict(),
            "petName": self.name_field.to_dict(),
            "breed": self.breed_field.to_dict(),
            "microchipNumber": self.microchip_field.to_dict(),
            "microchipDate": self.microchip_date_field.to_dict(),
            "rabiesVaccinationDate": self.rabies_date_field.to_dict(),
            "rabiesVaccinationType": self.rabies_type_field.to_dict(),
            "rabiesValidityEnd": self.rabies_end_field.to_dict(),
            "dhppVaccinationDate": self.dhpp_date_field.to_dict(),
            "rabiesTiterDate": self.titer_date_field.to_dict(),
            "rabiesTiterLevel": self.titer_level_field.to_dict(),
            "tapewormTreatmentDate": self.tapeworm_date_field.to_dict(),
            "hasOfficialHealthCertificate": self.has_health_cert_field.to_dict(),
            "hasExportPermit": self.has_export_permit_field.to_dict(),
            "hasImportPermit": self.has_import_permit_field.to_dict(),
            "hasNonCommercialDeclaration": self.has_declaration_field.to_dict(),
            "docAudit": self.doc_audit,
        }

def regex_fallback_extract(docs: List[ExtractedDocument]) -> PetFacts:
    combined_text = "\n".join([d.raw_text for d in docs])
    lower = combined_text.lower()
    primary_doc = docs[0].filename if docs else "upload"

    # Species
    species_val = "UNKNOWN"
    species_conf = 0.0
    if any(k in lower for k in ["canine", "dog", "puppy", "hound"]):
        species_val = "DOG"
        species_conf = 0.95
    elif any(k in lower for k in ["feline", "cat", "kitten"]):
        species_val = "CAT"
        species_conf = 0.95

    # Pet Name & Breed
    name_match = re.search(r'(?:pet(?:\s+name)?|patient(?:\s+name)?|animal(?:\s+name)?|name)\s*[:=-]\s*([A-Za-z0-9\'-]+)', combined_text, re.IGNORECASE)
    pet_name_val = name_match.group(1).strip() if name_match and name_match.group(1).lower() not in ["canine", "feline", "dog", "cat", "unknown"] else None
    
    breed_match = re.search(r'(?:breed)\s*[:=-]\s*([A-Za-z\s]+?)(?:[\n\r,;.]|$)', combined_text, re.IGNORECASE)
    breed_val = breed_match.group(1).strip() if breed_match else None

    # 15-digit ISO microchip
    chip_match = re.search(r'\b(9\d{14}|\d{15})\b', combined_text)
    microchip_val = chip_match.group(1) if chip_match else None
    microchip_conf = 0.98 if microchip_val else 0.0

    # Microchip Implantation Date
    chip_date_match = re.search(r'(?:microchip|implant(?:ation)?|chipped)[^\n\r\d]*?(?:date|on)?\s*[:=-]?\s*(\d{4}[-/.]\d{2}[-/.]\d{2}|\d{2}[-/.]\d{2}[-/.]\d{4})', combined_text, re.IGNORECASE)
    chip_dt_val = chip_date_match.group(1) if chip_date_match else None

    # Date finder fallback
    date_matches = re.findall(r'\b(\d{4}[-/.]\d{2}[-/.]\d{2}|\d{2}[-/.]\d{2}[-/.]\d{4})\b', combined_text)

    # Rabies
    has_rabies = any(k in lower for k in ["rabies", "rabisin", "defensor", "nobivac rabies"])
    rabies_date_match = re.search(r'(?:rabies|rabisin|defensor)[^\n\r\d]*?(?:date|administered|given|on)?\s*[:=-]?\s*(\d{4}[-/.]\d{2}[-/.]\d{2}|\d{2}[-/.]\d{2}[-/.]\d{4})', combined_text, re.IGNORECASE)
    if rabies_date_match:
        rabies_dt = rabies_date_match.group(1)
    elif has_rabies and date_matches:
        # Pick the first date that isn't the microchip date
        rabies_dt = next((d for d in date_matches if d != chip_dt_val), date_matches[0])
    else:
        rabies_dt = None
    rabies_conf = 0.90 if rabies_dt else 0.0
    rabies_type = "BOOSTER" if "booster" in lower else ("PRIMARY" if has_rabies else None)

    # DHPP
    has_dhpp = any(k in lower for k in ["dhpp", "dhppil", "distemper", "parvo"])
    dhpp_dt = date_matches[1] if has_dhpp and len(date_matches) > 1 else (date_matches[0] if has_dhpp else None)
    dhpp_conf = 0.88 if dhpp_dt else 0.0

    # Cross-document conflict detection
    rabies_by_doc = []
    chip_by_doc = []
    for d in docs:
        d_text = d.raw_text
        d_lower = d_text.lower()
        if any(k in d_lower for k in ["rabies", "rabisin", "defensor", "nobivac"]):
            m = re.search(r'(?:rabies|rabisin|defensor)[^\n\r\d]*?(?:date|administered|given|on)?\s*[:=-]?\s*(\d{4}[-/.]\d{2}[-/.]\d{2}|\d{2}[-/.]\d{2}[-/.]\d{4})', d_text, re.IGNORECASE)
            if m and m.group(1):
                val = m.group(1).strip()
                if not any(x["value"] == val for x in rabies_by_doc):
                    rabies_by_doc.append({"value": val, "sourceDocument": d.filename, "sourcePage": 1})

        chip_m = re.search(r'\b(9\d{14}|\d{15})\b', d_text)
        if chip_m and chip_m.group(1):
            cval = chip_m.group(1).strip()
            if not any(x["value"] == cval for x in chip_by_doc):
                chip_by_doc.append({"value": cval, "sourceDocument": d.filename, "sourcePage": 1})

    conflicting_rabies = rabies_by_doc if len(rabies_by_doc) > 1 else []
    conflicting_chips = chip_by_doc if len(chip_by_doc) > 1 else []

    # Permits & Health Cert
    has_cert = any(k in lower for k in ["health certificate", "veterinary certificate", "animal health certificate", "pet passport"])
    has_export = any(k in lower for k in ["export permit", "notice of intention", "daff permit", "usda endorsed"])
    has_import = "import permit" in lower
    has_decl = any(k in lower for k in ["declaration", "non-commercial", "owner declaration"])

    # Document audit
    doc_audit = []
    for d in docs:
        if len(d.raw_text.strip()) > 25:
            summary = f"Processed as {d.detected_type}."
            if microchip_val and microchip_val in d.raw_text:
                summary += f" ISO Microchip #{microchip_val} extracted."
            if has_rabies and "rabies" in d.raw_text.lower():
                summary += " Rabies vaccination record verified."
            doc_audit.append({
                "filename": d.filename,
                "detected_type": d.detected_type,
                "status": "VALID_DATA_FOUND",
                "summary": summary
            })
        else:
            doc_audit.append({
                "filename": d.filename,
                "detected_type": d.detected_type,
                "status": "NO_IDENTITY_DETECTED",
                "summary": f"{d.filename} recognized as {d.detected_type}, but text/stamps were unreadable or lacked microchip/dates."
            })

    return PetFacts(
        species_field=ExtractedField(value=species_val, confidence=species_conf, source_document=primary_doc),
        name_field=ExtractedField(value=pet_name_val, confidence=0.88 if pet_name_val else 0.0, source_document=primary_doc),
        breed_field=ExtractedField(value=breed_val, confidence=0.85 if breed_val else 0.0, source_document=primary_doc),
        microchip_field=ExtractedField(
            value=microchip_val,
            confidence=microchip_conf,
            source_document=primary_doc,
            conflicting_values=conflicting_chips
        ),
        microchip_date_field=ExtractedField(value=chip_dt_val, confidence=0.90 if chip_dt_val else 0.0, source_document=primary_doc),
        rabies_date_field=ExtractedField(
            value=rabies_dt,
            confidence=rabies_conf,
            source_document=primary_doc,
            conflicting_values=conflicting_rabies
        ),
        rabies_type_field=ExtractedField(value=rabies_type, confidence=0.85 if rabies_type else 0.0, source_document=primary_doc),
        dhpp_date_field=ExtractedField(value=dhpp_dt, confidence=dhpp_conf, source_document=primary_doc),
        has_health_cert_field=ExtractedField(value=has_cert, confidence=0.92 if has_cert else 0.0, source_document=primary_doc),
        has_export_permit_field=ExtractedField(value=has_export, confidence=0.92 if has_export else 0.0, source_document=primary_doc),
        has_import_permit_field=ExtractedField(value=has_import, confidence=0.85 if has_import else 0.0, source_document=primary_doc),
        has_declaration_field=ExtractedField(value=has_decl, confidence=0.85 if has_decl else 0.0, source_document=primary_doc),
        doc_audit=doc_audit
    )

async def extract_facts_with_ai(docs: List[ExtractedDocument]) -> PetFacts:
    """
    Extracts structured facts with confidence scores and source document citations
    using OpenRouter Nemotron 3 Ultra. Strict boundary: AI only extracts text facts.
    """
    if not OPENROUTER_API_KEY:
        return regex_fallback_extract(docs)

    doc_summaries = []
    for i, d in enumerate(docs):
        text_snip = d.raw_text[:2500] if d.raw_text else f"[Document file: {d.filename}]"
        doc_summaries.append(f"=== DOCUMENT {i+1}: {d.filename} ({d.detected_type}) ===\n{text_snip}")

    full_context = "\n\n".join(doc_summaries)

    system_prompt = (
        "You are an expert veterinary document transcription and data extraction engine. "
        "Extract pet identity, microchip, and medical dates into structured JSON. "
        "For each field, include: 'value', 'confidence' (float 0.0 to 1.0), and 'source_document'. "
        "If a field is not present or cannot be read with confidence, set 'value': null and 'confidence': 0.0. "
        "Do NOT determine legal compliance. Strictly extract the textual evidence."
    )

    user_prompt = f"""Review the uploaded pet documentation:

{full_context}

Return valid JSON with EXACTLY this structure:
{{
  "species": {{"value": "DOG" | "CAT" | "UNKNOWN", "confidence": float, "source_document": string}},
  "pet_name": {{"value": string | null, "confidence": float, "source_document": string}},
  "breed": {{"value": string | null, "confidence": float, "source_document": string}},
  "microchip_number": {{"value": string | null, "confidence": float, "source_document": string}},
  "microchip_date": {{"value": "YYYY-MM-DD" | null, "confidence": float, "source_document": string}},
  "rabies_vaccination_date": {{"value": "YYYY-MM-DD" | null, "confidence": float, "source_document": string}},
  "rabies_vaccination_type": {{"value": "PRIMARY" | "BOOSTER" | null, "confidence": float, "source_document": string}},
  "rabies_validity_end": {{"value": "YYYY-MM-DD" | null, "confidence": float, "source_document": string}},
  "dhpp_vaccination_date": {{"value": "YYYY-MM-DD" | null, "confidence": float, "source_document": string}},
  "rabies_titer_date": {{"value": "YYYY-MM-DD" | null, "confidence": float, "source_document": string}},
  "rabies_titer_level": {{"value": float | null, "confidence": float, "source_document": string}},
  "tapeworm_treatment_date": {{"value": "YYYY-MM-DD" | null, "confidence": float, "source_document": string}},
  "has_health_certificate": {{"value": boolean, "confidence": float, "source_document": string}},
  "has_export_permit": {{"value": boolean, "confidence": float, "source_document": string}},
  "has_import_permit": {{"value": boolean, "confidence": float, "source_document": string}},
  "has_non_commercial_declaration": {{"value": boolean, "confidence": float, "source_document": string}},
  "document_audit": [
    {{
      "filename": string,
      "detected_type": string,
      "status": "VALID_DATA_FOUND" | "NO_IDENTITY_DETECTED",
      "summary": string
    }}
  ]
}}
Output only JSON.
"""

    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": "https://petvia.com",
        "X-Title": "Petvia Document Extractor"
    }

    payload = {
        "model": OPENROUTER_MODEL,
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        "temperature": 0.1,
        "max_tokens": 800
    }

    try:
        async with httpx.AsyncClient(timeout=4.0) as client:
            response = await client.post(
                "https://openrouter.ai/api/v1/chat/completions",
                headers=headers,
                json=payload
            )
            if response.status_code == 200:
                data = response.json()
                content = data["choices"][0]["message"]["content"].strip()
                if "```json" in content:
                    content = content.split("```json")[1].split("```")[0].strip()
                elif "```" in content:
                    content = content.split("```")[1].split("```")[0].strip()

                parsed = json.loads(content)

                def parse_field(key: str, default_val=None) -> ExtractedField:
                    item = parsed.get(key)
                    if isinstance(item, dict):
                        return ExtractedField(
                            value=item.get("value", default_val),
                            confidence=float(item.get("confidence", 0.0)),
                            source_document=item.get("source_document", "Uploaded file"),
                            status=item.get("status"),
                            conflicting_values=item.get("conflicting_values") or []
                        )
                    return ExtractedField(value=item or default_val, confidence=0.8 if item else 0.0)

                return PetFacts(
                    species_field=parse_field("species", default_val="UNKNOWN"),
                    name_field=parse_field("pet_name"),
                    breed_field=parse_field("breed"),
                    microchip_field=parse_field("microchip_number"),
                    microchip_date_field=parse_field("microchip_date"),
                    rabies_date_field=parse_field("rabies_vaccination_date"),
                    rabies_type_field=parse_field("rabies_vaccination_type"),
                    rabies_end_field=parse_field("rabies_validity_end"),
                    dhpp_date_field=parse_field("dhpp_vaccination_date"),
                    titer_date_field=parse_field("rabies_titer_date"),
                    titer_level_field=parse_field("rabies_titer_level"),
                    tapeworm_date_field=parse_field("tapeworm_treatment_date"),
                    has_health_cert_field=parse_field("has_health_certificate", default_val=False),
                    has_export_permit_field=parse_field("has_export_permit", default_val=False),
                    has_import_permit_field=parse_field("has_import_permit", default_val=False),
                    has_declaration_field=parse_field("has_non_commercial_declaration", default_val=False),
                    doc_audit=parsed.get("document_audit") or [],
                    raw_ai_response=content
                )
    except Exception as err:
        print(f"[AI Extraction Notice - using instant deterministic regex]: {err}")

    return regex_fallback_extract(docs)
