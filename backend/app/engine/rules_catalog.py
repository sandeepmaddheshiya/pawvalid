"""
Multi-Jurisdiction Regulatory Rules Catalog for Petvia

Contains declarative regulatory specifications with strict provenance metadata:
rule_version, jurisdiction, source, source_title, effective_from, verified_at,
declarative dependency requirements, and rule-level applicability conditions
(species, origin, destination, transit, movement_type, and age).
"""

from typing import List, Dict, Any, Optional

EU_COUNTRIES = {
    "AT": "Austria", "BE": "Belgium", "BG": "Bulgaria", "HR": "Croatia", "CY": "Cyprus",
    "CZ": "Czech Republic", "DK": "Denmark", "EE": "Estonia", "FI": "Finland", "FR": "France",
    "DE": "Germany", "GR": "Greece", "HU": "Hungary", "IE": "Ireland", "IT": "Italy",
    "LV": "Latvia", "LT": "Lithuania", "LU": "Luxembourg", "MT": "Malta", "NL": "Netherlands",
    "PL": "Poland", "PT": "Portugal", "RO": "Romania", "SK": "Slovakia", "SI": "Slovenia",
    "ES": "Spain", "SE": "Sweden"
}

# Countries listed in EU Annex II (Part 1 and 2) exempt from Rabies Titer Test
EU_TITER_EXEMPT_COUNTRIES = {
    "AU", "CA", "US", "GB", "NZ", "JP", "CH", "NO", "IS", "SG", "HK", "AE", "QA", "KR"
}

# Countries requiring Echinococcus multilocularis (Tapeworm) treatment 24-120 hours before arrival
TAPEWORM_REQUIRED_COUNTRIES = {"GB", "IE", "FI", "MT", "NO"}

def normalize_country(name_or_code: str) -> str:
    val = (name_or_code or "").strip()
    if len(val) == 2:
        return val.upper()
    v_lower = val.lower()
    if "austria" in v_lower: return "AT"
    if "australia" in v_lower: return "AU"
    if "united states" in v_lower or "usa" in v_lower or "america" in v_lower: return "US"
    if "united kingdom" in v_lower or "uk" in v_lower or "britain" in v_lower: return "GB"
    if "germany" in v_lower: return "DE"
    if "singapore" in v_lower: return "SG"
    if "canada" in v_lower: return "CA"
    if "japan" in v_lower or "tokyo" in v_lower: return "JP"
    if "united arab emirates" in v_lower or "uae" in v_lower or "dubai" in v_lower or "abu dhabi" in v_lower: return "AE"
    if "france" in v_lower: return "FR"
    if "ireland" in v_lower: return "IE"
    if "finland" in v_lower: return "FI"
    if "malta" in v_lower: return "MT"
    if "norway" in v_lower: return "NO"
    if "india" in v_lower: return "IN"
    return val.upper()

# ─── MASTER DECLARATIVE RULES CATALOG ────────────────────────────────────────

CATALOG_RULES: List[Dict[str, Any]] = [
    # 0. Global Species Verification
    {
        "rule_id": "GLOBAL_SPECIES_VERIFIED",
        "name": "Species Identification",
        "category": "DOCUMENTS",
        "scope": "ARRIVING",
        "jurisdiction": "GLOBAL",
        "source": "Border Veterinary Inspection Services",
        "source_title": "International Veterinary Health Protocol",
        "rule_version": "2026.1",
        "effective_from": "2026-01-01",
        "verified_at": "2026-09-07",
        "source_url": "https://www.woah.org",
        "severity": "REQUIRED_ACTION",
        "applicability": {
            "species": ["ALL"],
            "movement_types": ["NON_COMMERCIAL", "COMMERCIAL"]
        },
        "requires": {
            "evidence_type": "SPECIES",
            "prerequisites": []
        },
        "wait_duration_days": 0,
        "what_to_do": "Confirm pet species (Dog or Cat) to unlock exact mandatory rules.",
        "details": "Species identification determines vaccine types, tapeworm requirements, and airline carrier dimensions."
    },

    # 1. Australian Export Permit
    {
        "rule_id": "AU_DAFF_EXPORT_001",
        "name": "Australian DAFF Export Permit (Notice of Intention)",
        "category": "DOCUMENTS",
        "scope": "LEAVING",
        "jurisdiction": "AU",
        "source": "Department of Agriculture, Fisheries and Forestry (DAFF)",
        "source_title": "Export Control (Animals) Rules 2021",
        "rule_version": "2026.2",
        "effective_from": "2026-01-01",
        "verified_at": "2026-09-07",
        "source_url": "https://www.agriculture.gov.au/biosecurity-trade/export/live-animals/companion-animals",
        "severity": "CRITICAL_BLOCKER",
        "applicability": {
            "species": ["DOG", "CAT"],
            "origins": ["AU"]
        },
        "requires": {
            "evidence_type": "EXPORT_PERMIT",
            "prerequisites": []
        },
        "wait_duration_days": 0,
        "deadline_window_days": 3,
        "what_to_do": "Lodge Notice of Intention with DAFF; must depart within 72 hours of permit issuance.",
        "details": "Under Australian biosecurity law, live companion animals departing Australia require an approved Notice of Intention and DAFF Export Permit."
    },

    # 2. Australian Export Certificate
    {
        "rule_id": "AU_DAFF_HEALTH_002",
        "name": "Australian Official Veterinary Export Certificate",
        "category": "DOCUMENTS",
        "scope": "LEAVING",
        "jurisdiction": "AU",
        "source": "Department of Agriculture, Fisheries and Forestry (DAFF)",
        "source_title": "Australian Biosecurity Export Certification Protocol",
        "rule_version": "2026.2",
        "effective_from": "2026-01-01",
        "verified_at": "2026-09-07",
        "source_url": "https://www.agriculture.gov.au/biosecurity-trade/export/live-animals/companion-animals",
        "severity": "REQUIRED_ACTION",
        "applicability": {
            "species": ["DOG", "CAT"],
            "origins": ["AU"]
        },
        "requires": {
            "evidence_type": "HEALTH_CERT",
            "prerequisites": ["AU_DAFF_EXPORT_001"]
        },
        "wait_duration_days": 0,
        "deadline_window_days": 5,
        "what_to_do": "Book pre-travel physical exam with an Australian Government-accredited veterinarian 2 to 5 days before flight.",
        "details": "Veterinary clinical examination verifying freedom from infectious pests and fitness to travel."
    },

    # 3. US USDA APHIS Form 7001
    {
        "rule_id": "US_USDA_APHIS_001",
        "name": "USDA APHIS Form 7001 / VEHCS Endorsement",
        "category": "DOCUMENTS",
        "scope": "LEAVING",
        "jurisdiction": "US",
        "source": "USDA Animal and Plant Health Inspection Service (APHIS)",
        "source_title": "USDA APHIS Veterinary Services Pet Travel Mandate",
        "rule_version": "2026.1",
        "effective_from": "2026-01-01",
        "verified_at": "2026-09-07",
        "source_url": "https://www.aphis.usda.gov/aphis/pet-travel",
        "severity": "CRITICAL_BLOCKER",
        "applicability": {
            "species": ["DOG", "CAT"],
            "origins": ["US"]
        },
        "requires": {
            "evidence_type": "EXPORT_PERMIT",
            "prerequisites": []
        },
        "wait_duration_days": 0,
        "deadline_window_days": 10,
        "what_to_do": "Veterinary health certificate must be submitted through USDA VEHCS for federal endorsement within 10 days of departure.",
        "details": "US federal law requires all companion animals exported internationally to hold a USDA-endorsed certificate."
    },

    # 4. Singapore Transit License
    {
        "rule_id": "SG_NPARKS_TRANSIT_001",
        "name": "Singapore NParks / AVS Transshipment License",
        "category": "TRANSIT",
        "scope": "TRANSIT",
        "jurisdiction": "SG",
        "source": "Animal & Veterinary Service (AVS) / NParks Singapore",
        "source_title": "Singapore Animals and Birds (Transshipment of Companion Animals) Regulations",
        "rule_version": "2026.1",
        "effective_from": "2026-01-01",
        "verified_at": "2026-09-07",
        "source_url": "https://www.nparks.gov.sg/avs/pets/bringing-animals-into-singapore-and-transshipping/transshipping-dogs-and-cats",
        "severity": "CRITICAL_BLOCKER",
        "applicability": {
            "species": ["DOG", "CAT"],
            "transit_in": ["SG"]
        },
        "requires": {
            "evidence_type": "IMPORT_PERMIT",
            "prerequisites": []
        },
        "wait_duration_days": 0,
        "deadline_window_days": 14,
        "what_to_do": "Apply for NParks transshipment permit and reserve Changi Animal & Plant Quarantine Station (CAPQ) if transit exceeds 4 hours.",
        "details": "All animals transiting through Singapore Changi Airport must hold an AVS Transshipment License."
    },

    # 5. EU Transit BIP (Germany, France, Netherlands)
    {
        "rule_id": "EU_TRANSIT_BIP_DE",
        "name": "EU First Point of Entry Border Inspection Post (Germany)",
        "category": "TRANSIT",
        "scope": "TRANSIT",
        "jurisdiction": "EU",
        "source": "European Commission Directorate-General for Health and Food Safety",
        "source_title": "Regulation (EU) 2026/131 Border Control Mandate",
        "rule_version": "2026.131",
        "effective_from": "2026-04-22",
        "verified_at": "2026-09-07",
        "source_url": "https://food.ec.europa.eu/animals/movement-pets_en",
        "severity": "REQUIRED_ACTION",
        "applicability": {
            "species": ["DOG", "CAT"],
            "transit_in": ["DE", "FR", "NL"]
        },
        "requires": {
            "evidence_type": "HEALTH_CERT",
            "prerequisites": []
        },
        "wait_duration_days": 0,
        "what_to_do": "Ensure a minimum 3 to 4 hour layover in Germany/EU for official Border Inspection Post (BIP) microchip scan and paperwork clearance.",
        "details": "Because Germany is your pet's first entry into the EU customs territory, entry checks occur here before connecting flights."
    },

    # 6. UK DEFRA Transit
    {
        "rule_id": "UK_DEFRA_TRANSIT_001",
        "name": "UK DEFRA Transit Cargo Protocol",
        "category": "TRANSIT",
        "scope": "TRANSIT",
        "jurisdiction": "GB",
        "source": "Department for Environment, Food & Rural Affairs (DEFRA)",
        "source_title": "UK Non-Commercial Pet Travel Scheme (Transit)",
        "rule_version": "2026.1",
        "effective_from": "2026-01-01",
        "verified_at": "2026-09-07",
        "source_url": "https://www.gov.uk/bring-pet-to-great-britain",
        "severity": "CRITICAL_BLOCKER",
        "applicability": {
            "species": ["DOG", "CAT"],
            "transit_in": ["GB"]
        },
        "requires": {
            "evidence_type": "CARRIER",
            "prerequisites": []
        },
        "wait_duration_days": 0,
        "what_to_do": "Pets transiting the UK must be booked strictly as manifest cargo with an approved airline; in-cabin and checked baggage transit is prohibited.",
        "details": "DEFRA regulations strictly enforce manifest cargo transport for all live animal transit through British territory."
    },

    # 7. EU Microchip Requirement
    {
        "rule_id": "EU_MICROCHIP_001",
        "name": "ISO 11784/11785 Compliant Microchip",
        "category": "MEDICAL",
        "scope": "ARRIVING",
        "jurisdiction": "EU",
        "source": "European Commission",
        "source_title": "Regulation (EU) 2026/131 on non-commercial movements of pet animals",
        "rule_version": "2026.131",
        "effective_from": "2026-04-22",
        "verified_at": "2026-09-07",
        "source_url": "https://food.ec.europa.eu/animals/movement-pets_en",
        "severity": "CRITICAL_BLOCKER",
        "applicability": {
            "species": ["DOG", "CAT"],
            "destinations": ["EU"]
        },
        "requires": {
            "evidence_type": "MICROCHIP",
            "prerequisites": []
        },
        "wait_duration_days": 0,
        "what_to_do": "Implant a 15-digit ISO 11784/11785 compliant microchip before administering any rabies vaccination.",
        "details": "Microchip must be implanted before or on the exact same date as rabies vaccination. Any vaccination administered prior to microchipping is void."
    },

    # 8. EU Rabies Vaccination
    {
        "rule_id": "EU_RABIES_001",
        "name": "Rabies Vaccination & Mandatory 21-Day Waiting Period",
        "category": "MEDICAL",
        "scope": "ARRIVING",
        "jurisdiction": "EU",
        "source": "European Commission",
        "source_title": "Regulation (EU) 2026/131 Annex III",
        "rule_version": "2026.131",
        "effective_from": "2026-04-22",
        "verified_at": "2026-09-07",
        "source_url": "https://food.ec.europa.eu/animals/movement-pets_en",
        "severity": "CRITICAL_BLOCKER",
        "applicability": {
            "species": ["DOG", "CAT"],
            "destinations": ["EU"]
        },
        "requires": {
            "evidence_type": "RABIES",
            "microchip_before_vaccine": True,
            "prerequisites": ["EU_MICROCHIP_001"]
        },
        "wait_duration_days": 21,
        "validity_max_days": 1095,
        "what_to_do": "Administer rabies vaccine after microchip implantation. Wait at least 21 days for primary vaccination latency before travel.",
        "details": "Under Regulation (EU) 2026/131, primary rabies vaccination requires a mandatory 21-day waiting period. Revaccinations with no lapse are valid immediately."
    },

    # 9. EU Rabies Titer Test (Only if origin is NOT exempt)
    {
        "rule_id": "EU_RABIES_TITER_001",
        "name": "Rabies Antibody Titer Blood Test (0.5 IU/mL) & 90-Day Wait",
        "category": "MEDICAL",
        "scope": "ARRIVING",
        "jurisdiction": "EU",
        "source": "European Commission",
        "source_title": "Regulation (EU) 2026/131 Annex IV",
        "rule_version": "2026.131",
        "effective_from": "2026-04-22",
        "verified_at": "2026-09-07",
        "source_url": "https://food.ec.europa.eu/animals/movement-pets_en",
        "severity": "CRITICAL_BLOCKER",
        "applicability": {
            "species": ["DOG", "CAT"],
            "destinations": ["EU"],
            "origins_not_in": list(EU_TITER_EXEMPT_COUNTRIES) + list(EU_COUNTRIES.keys())
        },
        "requires": {
            "evidence_type": "TITER",
            "prerequisites": ["EU_RABIES_001"]
        },
        "wait_duration_days": 90,
        "what_to_do": "Blood draw must be analyzed by an EU-approved laboratory with result >= 0.5 IU/mL. Pet cannot enter EU until 90 days after sample draw.",
        "details": "Because the origin country is unlisted in Annex II, an antibody titer blood test with a 3-month waiting period is mandatory."
    },

    # 10. Core Canine Vaccine (DHPP)
    {
        "rule_id": "EU_DHPP_001",
        "name": "Core Canine Vaccine (DHPP / DHPPiL)",
        "category": "MEDICAL",
        "scope": "ARRIVING",
        "jurisdiction": "EU",
        "source": "Border Veterinary Inspection Services",
        "source_title": "International Veterinary Health Standard",
        "rule_version": "2026.1",
        "effective_from": "2026-01-01",
        "verified_at": "2026-09-07",
        "source_url": "https://food.ec.europa.eu/animals/movement-pets_en",
        "severity": "REQUIRED_ACTION",
        "applicability": {
            "species": ["DOG"],
            "destinations": ["EU"]
        },
        "requires": {
            "evidence_type": "DHPP",
            "prerequisites": ["EU_MICROCHIP_001"]
        },
        "wait_duration_days": 21,
        "validity_max_days": 365,
        "what_to_do": "Administer core combined vaccine against Distemper, Hepatitis, Parvovirus, and Parainfluenza.",
        "details": "Vaccination must be up to date and verified in the veterinary record."
    },

    # 11. Tapeworm Treatment (Echinococcus)
    {
        "rule_id": "EU_TAPEWORM_001",
        "name": "Echinococcus multilocularis (Tapeworm) Treatment",
        "category": "MEDICAL",
        "scope": "ARRIVING",
        "jurisdiction": "EU",
        "source": "European Commission",
        "source_title": "Commission Delegated Regulation (EU) 2018/772",
        "rule_version": "2026.1",
        "effective_from": "2026-01-01",
        "verified_at": "2026-09-07",
        "source_url": "https://food.ec.europa.eu/animals/movement-pets_en",
        "severity": "CRITICAL_BLOCKER",
        "applicability": {
            "species": ["DOG"],
            "destinations": list(TAPEWORM_REQUIRED_COUNTRIES)
        },
        "requires": {
            "evidence_type": "TAPEWORM",
            "prerequisites": ["EU_MICROCHIP_001"]
        },
        "wait_duration_days": 0,
        "deadline_window_hours_min": 24,
        "deadline_window_hours_max": 120,
        "what_to_do": "Vet must administer praziquantel between 24 and 120 hours (1 to 5 days) before arrival.",
        "details": "Mandatory tapeworm treatment verified by accredited veterinarian with exact date and time recorded."
    },

    # 12. Official Non-Commercial EU Health Certificate
    {
        "rule_id": "EU_HEALTH_CERT_001",
        "name": "Official Non-Commercial EU Animal Health Certificate",
        "category": "DOCUMENTS",
        "scope": "ARRIVING",
        "jurisdiction": "EU",
        "source": "European Commission",
        "source_title": "Regulation (EU) 2026/131 Annex IV Model Certificate",
        "rule_version": "2026.131",
        "effective_from": "2026-04-22",
        "verified_at": "2026-09-07",
        "source_url": "https://food.ec.europa.eu/animals/movement-pets_en",
        "severity": "CRITICAL_BLOCKER",
        "applicability": {
            "species": ["DOG", "CAT"],
            "destinations": ["EU"],
            "movement_types": ["NON_COMMERCIAL"]
        },
        "requires": {
            "evidence_type": "HEALTH_CERT",
            "prerequisites": ["EU_MICROCHIP_001", "EU_RABIES_001"]
        },
        "wait_duration_days": 0,
        "deadline_window_days": 10,
        "what_to_do": "Schedule official health exam within 10 days of departure. Must be signed by accredited vet and endorsed by origin government.",
        "details": "Official bilateral certificate valid for entry into the EU within 10 days of government endorsement."
    },

    # 13. Non-Commercial Owner Declaration
    {
        "rule_id": "EU_OWNER_DECLARATION_001",
        "name": "Non-Commercial Owner Declaration",
        "category": "DOCUMENTS",
        "scope": "ARRIVING",
        "jurisdiction": "EU",
        "source": "European Commission",
        "source_title": "Regulation (EU) 2026/131 Annex IV Part 3",
        "rule_version": "2026.131",
        "effective_from": "2026-04-22",
        "verified_at": "2026-09-07",
        "source_url": "https://food.ec.europa.eu/animals/movement-pets_en",
        "severity": "REQUIRED_ACTION",
        "applicability": {
            "species": ["DOG", "CAT"],
            "destinations": ["EU"],
            "movement_types": ["NON_COMMERCIAL"]
        },
        "requires": {
            "evidence_type": "DECLARATION",
            "prerequisites": []
        },
        "wait_duration_days": 0,
        "what_to_do": "Owner or authorized travel companion must sign written declaration confirming movement is not for commercial transfer.",
        "details": "Attaches to the official EU animal health certificate."
    },

    # 14. IATA Live Animal Carrier (CR-82)
    {
        "rule_id": "IATA_CARRIER_CR82_001",
        "name": "IATA Compliant Travel Carrier (CR-82)",
        "category": "LOGISTICS",
        "scope": "LOGISTICS",
        "jurisdiction": "IATA",
        "source": "International Air Transport Association (IATA)",
        "source_title": "IATA Live Animals Regulations (LAR)",
        "rule_version": "LAR-620",
        "effective_from": "2026-01-01",
        "verified_at": "2026-09-07",
        "source_url": "https://www.iata.org/en/programs/cargo/live-animals/",
        "severity": "TRAVEL_DAY_ACTION",
        "applicability": {
            "species": ["DOG", "CAT"],
            "movement_types": ["NON_COMMERCIAL", "COMMERCIAL"]
        },
        "requires": {
            "evidence_type": "CARRIER",
            "prerequisites": []
        },
        "wait_duration_days": 0,
        "what_to_do": "Ensure crate is IATA CR-82 compliant with 4-side ventilation, metal locking bolts, and attached food/water dishes.",
        "details": "Pet must be able to stand erect, turn 360 degrees, and lie down in a natural posture without touching the roof."
    },

    # 15. IATA Airport Check-In Buffer
    {
        "rule_id": "IATA_AIRPORT_BUFFER_001",
        "name": "Airport Arrival Check-In Buffer",
        "category": "LOGISTICS",
        "scope": "LOGISTICS",
        "jurisdiction": "IATA",
        "source": "Airport Ground Handling Protocol",
        "source_title": "IATA Airport Handling Manual",
        "rule_version": "AHM-2026",
        "effective_from": "2026-01-01",
        "verified_at": "2026-09-07",
        "source_url": "https://www.iata.org",
        "severity": "TRAVEL_DAY_ACTION",
        "applicability": {
            "species": ["DOG", "CAT"],
            "movement_types": ["NON_COMMERCIAL", "COMMERCIAL"]
        },
        "requires": {
            "evidence_type": "AIRPORT_BUFFER",
            "prerequisites": []
        },
        "wait_duration_days": 0,
        "what_to_do": "Arrive 4 hours before departure for manifest cargo check-in, or 2 to 3 hours for in-cabin / excess baggage travel.",
        "details": "Required for international terminal security checks, microchip verification, and crate inspection."
    },

    # 16. Japan MAFF Microchip
    {
        "rule_id": "JP_MAFF_MICROCHIP_001",
        "name": "ISO 11784/11785 Microchip Implantation",
        "category": "MEDICAL",
        "scope": "ARRIVING",
        "jurisdiction": "JP",
        "source": "Ministry of Agriculture, Forestry and Fisheries (MAFF)",
        "source_title": "Japan Rabies Prevention Law & Animal Quarantine Service (AQS) Protocol",
        "rule_version": "AQS-2026.1",
        "effective_from": "2026-01-01",
        "verified_at": "2026-09-07",
        "source_url": "https://www.maff.go.jp/aqs/english/animal/dog/index.html",
        "severity": "CRITICAL_BLOCKER",
        "applicability": {
            "species": ["DOG", "CAT"],
            "destinations": ["JP"]
        },
        "requires": {
            "evidence_type": "MICROCHIP",
            "prerequisites": []
        },
        "wait_duration_days": 0,
        "what_to_do": "Implant an ISO 11784/11785 compliant 15-digit microchip before administering any rabies vaccinations.",
        "details": "Under MAFF AQS rules, microchip implantation must occur prior to or on the same date as the first rabies vaccination."
    },

    # 17. Japan MAFF Double Rabies Vaccination
    {
        "rule_id": "JP_MAFF_RABIES_DOUBLE_001",
        "name": "Two Sequential Inactivated Rabies Vaccinations",
        "category": "MEDICAL",
        "scope": "ARRIVING",
        "jurisdiction": "JP",
        "source": "Ministry of Agriculture, Forestry and Fisheries (MAFF)",
        "source_title": "Japan AQS Rabies Immunization Standard",
        "rule_version": "AQS-2026.1",
        "effective_from": "2026-01-01",
        "verified_at": "2026-09-07",
        "source_url": "https://www.maff.go.jp/aqs/english/animal/dog/import-other.html",
        "severity": "CRITICAL_BLOCKER",
        "applicability": {
            "species": ["DOG", "CAT"],
            "destinations": ["JP"]
        },
        "requires": {
            "evidence_type": "RABIES",
            "microchip_before_vaccine": True,
            "prerequisites": ["JP_MAFF_MICROCHIP_001"]
        },
        "wait_duration_days": 30,
        "what_to_do": "Administer at least two inactivated or recombinant rabies vaccines after microchipping, spaced at least 30 days apart.",
        "details": "The second rabies vaccination must be administered within the validity period of the first. Live virus vaccines are strictly prohibited."
    },

    # 18. Japan MAFF 180-Day Rabies Titer Quarantine Clock
    {
        "rule_id": "JP_MAFF_TITER_180D_001",
        "name": "Rabies Antibody Titer Test (FAVN) & Mandatory 180-Day Waiting Period",
        "category": "MEDICAL",
        "scope": "ARRIVING",
        "jurisdiction": "JP",
        "source": "Animal Quarantine Service (AQS) / MAFF",
        "source_title": "AQS Rabies Antibody Titre Blood Test & Quarantine Period Standard",
        "rule_version": "AQS-2026.1",
        "effective_from": "2026-01-01",
        "verified_at": "2026-09-07",
        "source_url": "https://www.maff.go.jp/aqs/english/animal/dog/import-other.html",
        "severity": "CRITICAL_BLOCKER",
        "applicability": {
            "species": ["DOG", "CAT"],
            "destinations": ["JP"],
            "origins_not_in": ["AU", "NZ", "FJ", "IS"]
        },
        "requires": {
            "evidence_type": "TITER",
            "prerequisites": ["JP_MAFF_RABIES_DOUBLE_001"]
        },
        "wait_duration_days": 180,
        "what_to_do": "Blood draw must test >= 0.5 IU/mL at a MAFF-designated laboratory. Pet cannot enter Japan without quarantine until 180 days after blood draw.",
        "details": "The 180-day countdown begins on the date of blood sampling. Pets arriving before 180 days will be quarantined at AQS holding kennels for the remaining balance."
    },

    # 19. Japan MAFF Advance Notification (40 Days)
    {
        "rule_id": "JP_MAFF_ADVANCE_NOTIFICATION_001",
        "name": "AQS Advance Import Notification (At Least 40 Days Prior)",
        "category": "DOCUMENTS",
        "scope": "ARRIVING",
        "jurisdiction": "JP",
        "source": "Animal Quarantine Service (AQS) / MAFF",
        "source_title": "MAFF Advance Notification Mandate (NACCS)",
        "rule_version": "AQS-2026.1",
        "effective_from": "2026-01-01",
        "verified_at": "2026-09-07",
        "source_url": "https://www.maff.go.jp/aqs/english/animal/dog/import-other.html",
        "severity": "CRITICAL_BLOCKER",
        "applicability": {
            "species": ["DOG", "CAT"],
            "destinations": ["JP"]
        },
        "requires": {
            "evidence_type": "IMPORT_PERMIT",
            "prerequisites": []
        },
        "wait_duration_days": 0,
        "deadline_window_days": 40,
        "what_to_do": "Lodge Advance Notification of Importation with AQS at least 40 days prior to arrival to secure approval number.",
        "details": "AQS issues an 'Approval of Inspection of Animals' certificate upon verification. Airlines will deny boarding to Japan without this approval code."
    },

    # 20. Japan MAFF Form AC Health Certificate
    {
        "rule_id": "JP_MAFF_HEALTH_CERT_001",
        "name": "Form AC Official Government-Endorsed Health Certificate",
        "category": "DOCUMENTS",
        "scope": "ARRIVING",
        "jurisdiction": "JP",
        "source": "Ministry of Agriculture, Forestry and Fisheries (MAFF)",
        "source_title": "MAFF Form AC Veterinary Certificate Protocol",
        "rule_version": "AQS-2026.1",
        "effective_from": "2026-01-01",
        "verified_at": "2026-09-07",
        "source_url": "https://www.maff.go.jp/aqs/english/animal/dog/index.html",
        "severity": "REQUIRED_ACTION",
        "applicability": {
            "species": ["DOG", "CAT"],
            "destinations": ["JP"]
        },
        "requires": {
            "evidence_type": "HEALTH_CERT",
            "prerequisites": ["JP_MAFF_MICROCHIP_001", "JP_MAFF_RABIES_DOUBLE_001"]
        },
        "wait_duration_days": 0,
        "deadline_window_days": 10,
        "what_to_do": "Undergo clinical exam within 10 days of departure and obtain official government endorsement (USDA/DEFRA/DAFF).",
        "details": "Attending vet certifies pet is free of rabies and leptospirosis, recording all microchip and vaccine serial numbers on Form AC."
    },

    # 21. UAE MOCCAE Import Permit
    {
        "rule_id": "AE_MOCCAE_IMPORT_PERMIT_001",
        "name": "MOCCAE Pet Import Permit (30-Day Validity)",
        "category": "DOCUMENTS",
        "scope": "ARRIVING",
        "jurisdiction": "AE",
        "source": "Ministry of Climate Change and Environment (MOCCAE)",
        "source_title": "UAE Federal Law No. 22 Live Animal Import Permit Mandate",
        "rule_version": "MOCCAE-2026",
        "effective_from": "2026-01-01",
        "verified_at": "2026-09-07",
        "source_url": "https://www.moccae.gov.ae",
        "severity": "CRITICAL_BLOCKER",
        "applicability": {
            "species": ["DOG", "CAT"],
            "destinations": ["AE"]
        },
        "requires": {
            "evidence_type": "IMPORT_PERMIT",
            "prerequisites": []
        },
        "wait_duration_days": 0,
        "deadline_window_days": 30,
        "what_to_do": "Apply online through MOCCAE portal for an official UAE Pet Import Permit prior to shipment. Valid for exactly 30 days.",
        "details": "Every dog and cat entering the United Arab Emirates requires an individual electronic import permit issued by MOCCAE."
    },

    # 22. UAE MOCCAE Banned Breeds Screening
    {
        "rule_id": "AE_MOCCAE_BANNED_BREEDS_001",
        "name": "UAE Prohibited & Dangerous Dog Breeds Screen",
        "category": "LOGISTICS",
        "scope": "ARRIVING",
        "jurisdiction": "AE",
        "source": "Ministry of Climate Change and Environment (MOCCAE)",
        "source_title": "UAE Federal Law No. 22 on Dangerous and Banned Animals (Annex II)",
        "rule_version": "MOCCAE-2026",
        "effective_from": "2026-01-01",
        "verified_at": "2026-09-07",
        "source_url": "https://www.moccae.gov.ae",
        "severity": "CRITICAL_BLOCKER",
        "applicability": {
            "species": ["DOG"],
            "destinations": ["AE"]
        },
        "requires": {
            "evidence_type": "BANNED_BREED",
            "prerequisites": []
        },
        "wait_duration_days": 0,
        "what_to_do": "Verify pet is not on the UAE prohibited breed list (Pit Bulls, Staffordshire Bull Terriers, American Bully, Mastiffs, Rottweilers, Dobermans, Presa Canario).",
        "details": "Importation of listed aggressive and fighting dog breeds into any UAE emirate is banned by law and will trigger immediate border confiscation."
    },

    # 23. UAE MOCCAE Rabies Titer Test
    {
        "rule_id": "AE_MOCCAE_RABIES_TITER_001",
        "name": "Rabies Neutralizing Antibody Titer Test (>0.5 IU/mL)",
        "category": "MEDICAL",
        "scope": "ARRIVING",
        "jurisdiction": "AE",
        "source": "Ministry of Climate Change and Environment (MOCCAE)",
        "source_title": "MOCCAE Live Pet Biological Standards",
        "rule_version": "MOCCAE-2026",
        "effective_from": "2026-01-01",
        "verified_at": "2026-09-07",
        "source_url": "https://www.moccae.gov.ae",
        "severity": "CRITICAL_BLOCKER",
        "applicability": {
            "species": ["DOG", "CAT"],
            "destinations": ["AE"]
        },
        "requires": {
            "evidence_type": "TITER",
            "prerequisites": []
        },
        "wait_duration_days": 21,
        "what_to_do": "Blood draw at least 21 days after vaccination must test >= 0.5 IU/mL at an approved lab within 12 months of travel.",
        "details": "All companion animals entering Dubai or Abu Dhabi must hold an official RNATT certificate proving antibody titer >= 0.5 IU/mL."
    },

    # 24. UAE MOCCAE Veterinary Health Certificate & Parasite Treatment (14 Days)
    {
        "rule_id": "AE_MOCCAE_HEALTH_CERT_001",
        "name": "Government Endorsed Health Certificate & Parasite Treatment (14-Day Window)",
        "category": "DOCUMENTS",
        "scope": "ARRIVING",
        "jurisdiction": "AE",
        "source": "Ministry of Climate Change and Environment (MOCCAE)",
        "source_title": "UAE Veterinary Inspection Entry Standards",
        "rule_version": "MOCCAE-2026",
        "effective_from": "2026-01-01",
        "verified_at": "2026-09-07",
        "source_url": "https://www.moccae.gov.ae",
        "severity": "REQUIRED_ACTION",
        "applicability": {
            "species": ["DOG", "CAT"],
            "destinations": ["AE"]
        },
        "requires": {
            "evidence_type": "HEALTH_CERT",
            "prerequisites": []
        },
        "wait_duration_days": 0,
        "deadline_window_days": 14,
        "what_to_do": "Obtain government health certificate within 14 days of travel with certified internal (Praziquantel) and external (Fipronil) parasite treatments.",
        "details": "Treatments against endoparasites and ectoparasites must be administered by a licensed vet within 14 days prior to shipment."
    },

    # 25. Canada CFIA Rabies Certificate
    {
        "rule_id": "CA_CFIA_RABIES_CERT_001",
        "name": "CFIA Licensed Veterinary Rabies Certificate",
        "category": "MEDICAL",
        "scope": "ARRIVING",
        "jurisdiction": "CA",
        "source": "Canadian Food Inspection Agency (CFIA)",
        "source_title": "Health of Animals Act & Regulations: Importation of Domestic Pets",
        "rule_version": "CFIA-2026",
        "effective_from": "2026-01-01",
        "verified_at": "2026-09-07",
        "source_url": "https://inspection.canada.ca/en/animal-health/terrestrial-animals/imports/pets",
        "severity": "CRITICAL_BLOCKER",
        "applicability": {
            "species": ["DOG", "CAT"],
            "destinations": ["CA"]
        },
        "requires": {
            "evidence_type": "RABIES",
            "prerequisites": []
        },
        "wait_duration_days": 0,
        "what_to_do": "Present an official rabies certificate in English or French signed by a licensed vet detailing animal breed/color, vaccine brand, and lot number.",
        "details": "Canada requires all domestic companion animals over 3 months of age entering from rabies-endemic or controlled areas to hold an official rabies certificate."
    },

    # 26. Canada CFIA Microchip Identification
    {
        "rule_id": "CA_CFIA_MICROCHIP_001",
        "name": "ISO 11784/11785 Microchip Verification",
        "category": "MEDICAL",
        "scope": "ARRIVING",
        "jurisdiction": "CA",
        "source": "Canadian Food Inspection Agency (CFIA)",
        "source_title": "CFIA Pet Import Identification Policy",
        "rule_version": "CFIA-2026",
        "effective_from": "2026-01-01",
        "verified_at": "2026-09-07",
        "source_url": "https://inspection.canada.ca/en/animal-health/terrestrial-animals/imports/pets",
        "severity": "REQUIRED_ACTION",
        "applicability": {
            "species": ["DOG", "CAT"],
            "destinations": ["CA"]
        },
        "requires": {
            "evidence_type": "MICROCHIP",
            "prerequisites": []
        },
        "wait_duration_days": 0,
        "what_to_do": "Ensure pet has a 15-digit ISO microchip matching all health and rabies certificates.",
        "details": "Mandatory for commercial pet imports and strongly enforced by all Canadian airlines (Air Canada, WestJet) for passenger check-in."
    },

    # 27. India AQCS Export Health Certificate & NOC (Outbound from India)
    {
        "rule_id": "IN_AQCS_EXPORT_001",
        "name": "AQCS India Animal Quarantine Export Certificate & NOC",
        "category": "DOCUMENTS",
        "scope": "LEAVING",
        "jurisdiction": "IN",
        "source": "Animal Quarantine and Certification Services (AQCS / DAHD India)",
        "source_title": "Department of Animal Husbandry and Dairying Export Protocol",
        "rule_version": "AQCS-2026",
        "effective_from": "2026-01-01",
        "verified_at": "2026-09-21",
        "source_url": "http://aqcsindia.gov.in/",
        "severity": "CRITICAL_BLOCKER",
        "applicability": {
            "species": ["DOG", "CAT"],
            "origins": ["IN"]
        },
        "requires": {
            "evidence_type": "EXPORT_PERMIT",
            "prerequisites": ["GLOBAL_SPECIES_VERIFIED"]
        },
        "wait_duration_days": 0,
        "what_to_do": "Present pet and official vaccination/titer records at regional AQCS quarantine station within 7 days of departure to receive official Export Health Certificate.",
        "details": "Indian customs and international airlines will not permit pet boarding without physical AQCS Animal Quarantine Export clearance."
    },

    # 28. UK DEFRA Unlisted Third Country Rabies Titer & 3-Month Latency (India to UK)
    {
        "rule_id": "UK_UNLISTED_RABIES_TITER_001",
        "name": "UK DEFRA Unlisted Country RNATT Titer & 3-Month Waiting Period",
        "category": "MEDICAL",
        "scope": "ARRIVING",
        "jurisdiction": "GB",
        "source": "Animal and Plant Health Agency (APHA) & DEFRA",
        "source_title": "Non-Commercial Movement of Pet Animals Order 2011 & Retained EU Reg 576/2013",
        "rule_version": "DEFRA-2026",
        "effective_from": "2026-01-01",
        "verified_at": "2026-09-21",
        "source_url": "https://www.gov.uk/bring-pet-to-great-britain/rabies-blood-test",
        "severity": "CRITICAL_BLOCKER",
        "applicability": {
            "species": ["DOG", "CAT"],
            "origins": ["IN"],
            "destinations": ["GB"]
        },
        "requires": {
            "evidence_type": "RABIES_TITER",
            "prerequisites": ["EU_RABIES_001"]
        },
        "wait_duration_days": 90,
        "what_to_do": "Draw blood at least 30 days post-vaccination for RNATT testing at DEFRA/EU-approved lab (≥ 0.5 IU/ml). Wait full 3 calendar months (90 days) from blood draw before entering UK.",
        "details": "Because India is an unlisted third country for rabies, pets arriving before the 3-month post-draw window are subjected to mandatory quarantine at Heathrow/Gatwick."
    },

    # 29. US CDC High-Risk Dog Importation Rule (India to USA)
    {
        "rule_id": "US_CDC_HIGH_RISK_DOG_001",
        "name": "CDC High-Risk Rabies Dog Import Protocol & ACF Booking",
        "category": "DOCUMENTS",
        "scope": "ARRIVING",
        "jurisdiction": "US",
        "source": "US Centers for Disease Control and Prevention (CDC)",
        "source_title": "CDC Dog Importation Regulations (42 CFR 71.51)",
        "rule_version": "CDC-2024-AUG",
        "effective_from": "2024-08-01",
        "verified_at": "2026-09-21",
        "source_url": "https://www.cdc.gov/importation/bringing-an-animal-into-the-united-states/dogs.html",
        "severity": "CRITICAL_BLOCKER",
        "applicability": {
            "species": ["DOG"],
            "origins": ["IN"],
            "destinations": ["US"]
        },
        "requires": {
            "evidence_type": "IMPORT_PERMIT",
            "prerequisites": ["US_USDA_APHIS_001"]
        },
        "wait_duration_days": 28,
        "what_to_do": "Ensure dog is ≥ 6 months of age, hold official CDC Foreign Rabies Certificate endorsed by AQCS, submit online CDC Dog Import Form, and book Animal Care Facility (ACF) arrival slot.",
        "details": "Effective August 1, 2024, all dogs from high-risk rabies countries must meet the 6-month age threshold, enter via approved CDC ports with registered ACFs, and carry CDC form receipts."
    },

    # 30. Australia DAFF Non-Approved Origin Policy (India to Australia)
    {
        "rule_id": "AU_DAFF_NON_APPROVED_IN_001",
        "name": "Australia DAFF Non-Approved Country Mandatory 180-Day Intermediary Residency",
        "category": "LOGISTICS",
        "scope": "ARRIVING",
        "jurisdiction": "AU",
        "source": "Department of Agriculture, Fisheries and Forestry (DAFF)",
        "source_title": "Biosecurity Act 2015 & Group 3 Non-Approved Country Companion Animal Policy",
        "rule_version": "DAFF-2026",
        "effective_from": "2026-01-01",
        "verified_at": "2026-09-21",
        "source_url": "https://www.agriculture.gov.au/biosecurity-trade/import/goods/live-animals/companion-animals/step-by-step-guides/non-approved-country",
        "severity": "CRITICAL_BLOCKER",
        "applicability": {
            "species": ["DOG", "CAT"],
            "origins": ["IN"],
            "destinations": ["AU"]
        },
        "requires": {
            "evidence_type": "IMPORT_PERMIT",
            "prerequisites": ["AU_DAFF_HEALTH_002"]
        },
        "wait_duration_days": 180,
        "what_to_do": "Direct import from India is prohibited. Relocate pet to an approved DAFF Group 3 country (Singapore, UK, UAE, USA) for at least 180 consecutive days before applying for Australian import permit.",
        "details": "Direct transport applications from India are automatically rejected. After 180 days in an approved country + RNATT test, pet must complete 10-30 days PEQ at Mickleham, Melbourne."
    }
]

# ─── DECLARATIVE APPLICABILITY EVALUATOR ─────────────────────────────────────

def check_rule_applicability(
    rule: Dict[str, Any],
    origin_code: str,
    dest_code: str,
    transit_codes: List[str],
    species: str = "DOG",
    movement_type: str = "NON_COMMERCIAL"
) -> bool:
    app = rule.get("applicability", {})
    if not app:
        return True

    # 1. Species condition (Dog vs Cat vs ALL)
    app_species = app.get("species")
    if app_species and "ALL" not in app_species:
        if species.upper() not in [s.upper() for s in app_species]:
            return False

    # 2. Origin country condition
    if "origins" in app and origin_code not in app["origins"]:
        return False
    if "origins_not_in" in app and origin_code in app["origins_not_in"]:
        return False

    # 3. Destination country condition
    if "destinations" in app:
        dests = app["destinations"]
        is_dest_eu = dest_code in EU_COUNTRIES or dest_code in ["AT", "DE", "FR", "ES", "IT"]
        matches_dest = False
        for d in dests:
            if d == "EU" and is_dest_eu:
                matches_dest = True
            elif d == dest_code:
                matches_dest = True
        if not matches_dest:
            return False

    # 4. Transit country condition
    if "transit_in" in app:
        req_transits = app["transit_in"]
        if not any(t in transit_codes for t in req_transits):
            return False

    # 5. Movement type condition
    if "movement_types" in app and movement_type.upper() not in app["movement_types"]:
        return False

    return True

def get_applicable_rules(
    origin: str,
    destination: str,
    transit_countries: Optional[List[str]] = None,
    species: str = "DOG",
    movement_type: str = "NON_COMMERCIAL"
) -> Dict[str, List[Dict[str, Any]]]:
    orig_code = normalize_country(origin)
    dest_code = normalize_country(destination)
    transits = [normalize_country(t) for t in (transit_countries or []) if t]

    leaving_rules: List[Dict[str, Any]] = []
    transit_rules: List[Dict[str, Any]] = []
    arriving_rules: List[Dict[str, Any]] = []
    logistics_rules: List[Dict[str, Any]] = []

    for rule in CATALOG_RULES:
        if check_rule_applicability(
            rule=rule,
            origin_code=orig_code,
            dest_code=dest_code,
            transit_codes=transits,
            species=species,
            movement_type=movement_type
        ):
            scope = rule.get("scope", "ARRIVING")
            if scope == "LEAVING":
                leaving_rules.append(rule)
            elif scope == "TRANSIT":
                transit_rules.append(rule)
            elif scope == "ARRIVING":
                arriving_rules.append(rule)
            elif scope == "LOGISTICS":
                logistics_rules.append(rule)

    return {
        "LEAVING": leaving_rules,
        "TRANSIT": transit_rules,
        "ARRIVING": arriving_rules,
        "LOGISTICS": logistics_rules,
        "ALL": leaving_rules + transit_rules + arriving_rules + logistics_rules
    }
