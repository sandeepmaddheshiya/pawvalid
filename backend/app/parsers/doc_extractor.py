import io
import re
import base64
from typing import Dict, Any, Optional
from pypdf import PdfReader
import docx
from PIL import Image

class ExtractedDocument:
    def __init__(
        self,
        filename: str,
        content_type: str,
        raw_text: str = "",
        image_base64: Optional[str] = None,
        detected_type: str = "General Document",
        metadata: Optional[Dict[str, Any]] = None
    ):
        self.filename = filename
        self.content_type = content_type
        self.raw_text = raw_text
        self.image_base64 = image_base64
        self.detected_type = detected_type
        self.metadata = metadata or {}

    def to_dict(self) -> Dict[str, Any]:
        return {
            "filename": self.filename,
            "content_type": self.content_type,
            "detected_type": self.detected_type,
            "char_count": len(self.raw_text),
            "snippet": self.raw_text[:300] if self.raw_text else "[Binary/Image content]",
            "metadata": self.metadata
        }

def classify_document(text: str, filename: str) -> str:
    # Normalize separators (underscores, dashes, dots) to spaces for clean token boundaries
    normalized = re.sub(r'[-_./\\]+', ' ', f"{filename} {text}").lower()

    # 1. Titer / Serology Lab Report (Prioritize before Rabies, because titer reports always contain 'rabies')
    if re.search(r'\b(titer|favn|rnatt|serology|antibody\s+titration|fluorescent\s+antibody)\b', normalized):
        return "Rabies Titer (FAVN/RNATT) Lab Report"

    # 2. EU Annex IV Health Certificate
    if re.search(r'\b(annex\s*(iv|4)|model\s+animal\s+health\s+certificate|non\s*commercial\s+movement\s+into\s+a\s+member\s+state)\b', normalized):
        return "EU Annex IV Health Certificate"

    # 3. Owner Non-Commercial Declaration
    if re.search(r'\b(owner\s+declaration|non\s*commercial\s+declaration|declaration\s+of\s+owner|owner\s*dec|5\s*day\s+window|5\s+days\s+of\s+the\s+movement)\b', normalized):
        return "Non-Commercial Owner Declaration"

    # 4. Official Pet Passport
    if re.search(r'\b(pet\s+passport|passeport\s+pour\s+animaux|official\s+pet\s+passport|veterinary\s+passport|pet\s*pass)\b', normalized):
        return "Official Pet Passport"

    # 5. Official Veterinary Health Certificate (General/Non-Annex)
    if re.search(r'\b(veterinary\s+health\s+certificate|animal\s+health\s+certificate|official\s+health\s+certificate|health\s+certificate|certificate\s+of\s+veterinary\s+inspection|clinical\s+examination\s+for\s+travel|fit\s+to\s+travel|health\s*cert)\b', normalized):
        return "Official Veterinary Health Certificate"

    # 6. Government Export / Endorsement Permit
    if re.search(r'\b(export\s+permit|notice\s+of\s+intention|daff\s+permit|usda\s+endorsed|aphis\s+form|aphis\s+7001|import\s+permit)\b', normalized):
        return "Government Export / Endorsement Permit"

    # 7. Internal Parasite / Tapeworm Treatment Record
    if re.search(r'\b(tapeworm|echinococcus|praziquantel|deworming|parasite\s+treatment)\b', normalized):
        return "Internal Parasite / Tapeworm Treatment Record"

    # 8. Microchip Registration Record
    if re.search(r'\b(microchip|transponder\s+implantation|transponder\s+number|transponder|iso\s*11784|iso\s*11785|petlog|avid\s+chip|homeagain|identichip)\b', normalized) or re.search(r'\b(9\d{14}|\d{15})\b', normalized):
        return "Microchip Registration Record"

    # 9. Rabies / Vaccination Certificate
    if re.search(r'\b(rabies|rabisin|defensor|nobivac|dhpp|dhppil|vaccination|vaccine|vaccines|vax|immunisation|immunization)\b', normalized):
        return "Rabies / Vaccination Certificate"

    # 10. Fallbacks based on word-boundary pet markers
    if re.search(r'\b(pet|pets|animal|animals|canine|feline|dog|dogs|puppy|puppies|cat|cats|kitten|kittens|veterinary|veterinarian|vet|vets)\b', normalized):
        return "General Pet Record / Photo"

    return "Unrecognized Document (Non-Veterinary)"

def extract_from_bytes(file_bytes: bytes, filename: str, content_type: str) -> ExtractedDocument:
    ext = filename.split(".")[-1].lower() if "." in filename else ""
    raw_text = ""
    image_b64 = None
    meta: Dict[str, Any] = {"file_size_bytes": len(file_bytes)}

    # 1. PDF
    if ext == "pdf" or "pdf" in content_type:
        try:
            reader = PdfReader(io.BytesIO(file_bytes))
            meta["page_count"] = len(reader.pages)
            pages_text = []
            for i, page in enumerate(reader.pages):
                txt = page.extract_text() or ""
                pages_text.append(txt)
            raw_text = "\n\n".join(pages_text)
        except Exception as e:
            raw_text = f"[PDF read error: {str(e)}]"

    # 2. DOCX / Word
    elif ext in ["docx", "doc"] or "word" in content_type:
        try:
            doc = docx.Document(io.BytesIO(file_bytes))
            para_text = [p.text for p in doc.paragraphs if p.text.strip()]
            for table in doc.tables:
                for row in table.rows:
                    para_text.append(" | ".join(cell.text.strip() for cell in row.cells))
            raw_text = "\n".join(para_text)
        except Exception as e:
            raw_text = f"[Word document read error: {str(e)}]"

    # 3. Plain Text
    elif ext in ["txt", "csv", "json"] or "text" in content_type:
        try:
            raw_text = file_bytes.decode("utf-8", errors="ignore")
        except Exception:
            raw_text = ""

    # 4. Images (JPG, PNG, WEBP)
    elif ext in ["jpg", "jpeg", "png", "webp"] or "image" in content_type:
        try:
            img = Image.open(io.BytesIO(file_bytes))
            meta["image_width"] = img.width
            meta["image_height"] = img.height
            meta["image_format"] = img.format
            image_b64 = base64.b64encode(file_bytes).decode("utf-8")
        except Exception as e:
            meta["image_error"] = str(e)

    detected_type = classify_document(raw_text, filename)
    return ExtractedDocument(
        filename=filename,
        content_type=content_type,
        raw_text=raw_text,
        image_base64=image_b64,
        detected_type=detected_type,
        metadata=meta
    )
