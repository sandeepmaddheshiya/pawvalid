"""
Dependency Graph & Earliest Travel Timeline Engine for Petvia

Executes declarative rules from the Regulatory Rules Catalog and Evidence Matcher
to build the milestone timeline and calculate the Earliest Estimated Travel Date.
"""

from datetime import datetime, timedelta, timezone
from typing import Dict, Any, List, Optional
from app.engine.evidence_matcher import MatchedRequirement, parse_iso_or_common_date
from app.engine.entity_extractor import PetFacts

class TimelineResult:
    def __init__(
        self,
        earliest_flight_date: str,
        earliest_flight_datetime: datetime,
        milestones: List[Dict[str, Any]],
    ):
        self.earliest_flight_date = earliest_flight_date
        self.earliest_flight_datetime = earliest_flight_datetime
        self.milestones = milestones

    def to_dict(self) -> Dict[str, Any]:
        return {
            "earliestFlightDate": self.earliest_flight_date,
            "timelineMilestones": self.milestones,
        }

def build_dependency_timeline(
    matched_requirements: List[MatchedRequirement],
    pet_facts: PetFacts,
    target_departure_date: Optional[str] = None
) -> TimelineResult:
    """
    Builds chronological milestones and computes the earliest safe travel date
    from declarative matched requirements and PetFacts.
    """
    today = datetime.now(timezone.utc)
    earliest_dt = today
    milestones: List[Dict[str, Any]] = []

    chip_num = pet_facts.microchip_number
    chip_dt = parse_iso_or_common_date(pet_facts.microchip_date)
    rabies_dt = parse_iso_or_common_date(pet_facts.rabies_date)
    titer_dt = parse_iso_or_common_date(pet_facts.titer_date)

    # 1. Microchip Milestone
    microchip_req = next((r for r in matched_requirements if "MICROCHIP" in r.rule_id), None)
    if microchip_req:
        if microchip_req.status == "SATISFIED" and chip_num:
            milestones.append({
                "date": (chip_dt or today).strftime("%b %d, %Y"),
                "title": f"Microchip Implantation (#{chip_num})",
                "status": "COMPLETED",
                "description": "ISO 11784/11785 compliant 15-digit transponder recorded.",
                "isPrerequisite": True
            })
        else:
            milestones.append({
                "date": today.strftime("%b %d, %Y"),
                "title": "Microchip Implantation",
                "status": "PENDING",
                "description": "Mandatory prerequisite step before travel vaccines can be certified.",
                "isPrerequisite": True
            })
            earliest_dt = max(earliest_dt, today + timedelta(days=1))

    # 2. Rabies Vaccine & Waiting Period Milestone
    rabies_req = next((r for r in matched_requirements if "RABIES" in r.rule_id and "TITER" not in r.rule_id), None)
    if rabies_req:
        wait_days = rabies_req.wait_days_min or 21
        # Check if rabies was administered prior to microchip
        if chip_dt and rabies_dt and rabies_dt < chip_dt:
            milestones.append({
                "date": "Pending Revaccination",
                "title": "Rabies Revaccination Required",
                "status": "PENDING",
                "description": "Vaccine given before microchip is legally invalid; must revaccinate after microchip.",
                "isPrerequisite": True
            })
            earliest_dt = max(earliest_dt, today + timedelta(days=wait_days + 1))
        elif pet_facts.rabies_date_field.status == "CONFLICTING" or (rabies_req and "Conflicting" in rabies_req.status_badge):
            milestones.append({
                "date": "Resolution Required",
                "title": "Conflicting Documentation Must Be Resolved",
                "status": "PENDING",
                "description": "Contradictory dates detected across uploaded files. Discrepancy must be clarified before travel.",
                "isPrerequisite": True
            })
        elif rabies_dt:
            milestones.append({
                "date": rabies_dt.strftime("%b %d, %Y"),
                "title": "Rabies Vaccination Administered",
                "status": "COMPLETED",
                "description": "Primary/booster rabies vaccination administered."
            })
            wait_end = rabies_dt + timedelta(days=wait_days)
            if today >= wait_end:
                milestones.append({
                    "date": wait_end.strftime("%b %d, %Y"),
                    "title": f"{wait_days}-Day Rabies Waiting Period Cleared",
                    "status": "COMPLETED",
                    "description": "Mandatory post-vaccination latency window satisfied."
                })
            else:
                days_left = (wait_end - today).days
                milestones.append({
                    "date": wait_end.strftime("%b %d, %Y"),
                    "title": f"{wait_days}-Day Rabies Wait Clears",
                    "status": "PENDING",
                    "description": f"Mandatory waiting period in progress ({days_left} days remaining)."
                })
                earliest_dt = max(earliest_dt, wait_end)
        else:
            milestones.append({
                "date": today.strftime("%b %d, %Y"),
                "title": "Rabies Vaccination",
                "status": "PENDING",
                "description": f"Must vaccinate after microchip and observe mandatory {wait_days}-day waiting period."
            })
            earliest_dt = max(earliest_dt, today + timedelta(days=wait_days))

    # 3. Rabies Titer Test (if applicable for route)
    titer_req = next((r for r in matched_requirements if "TITER" in r.rule_id), None)
    if titer_req:
        titer_wait_days = titer_req.wait_days_min or 90
        titer_val = pet_facts.titer_level
        if titer_dt and titer_val and titer_val >= 0.5:
            milestones.append({
                "date": titer_dt.strftime("%b %d, %Y"),
                "title": f"Rabies Titer Blood Draw ({titer_val} IU/mL)",
                "status": "COMPLETED",
                "description": "Blood sample collected and analyzed by approved laboratory."
            })
            titer_wait_end = titer_dt + timedelta(days=titer_wait_days)
            if today >= titer_wait_end:
                milestones.append({
                    "date": titer_wait_end.strftime("%b %d, %Y"),
                    "title": f"{titer_wait_days}-Day Titer Wait Cleared",
                    "status": "COMPLETED",
                    "description": "Mandatory post-draw quarantine latency satisfied."
                })
            else:
                days_left = (titer_wait_end - today).days
                milestones.append({
                    "date": titer_wait_end.strftime("%b %d, %Y"),
                    "title": f"{titer_wait_days}-Day Titer Wait Clears",
                    "status": "PENDING",
                    "description": f"Mandatory antibody latency period ({days_left} days remaining)."
                })
                earliest_dt = max(earliest_dt, titer_wait_end)
        else:
            titer_proj_date = today + timedelta(days=titer_wait_days + 14)
            milestones.append({
                "date": titer_proj_date.strftime("%b %d, %Y"),
                "title": f"Rabies Titer Test & {titer_wait_days}-Day Wait",
                "status": "PENDING",
                "description": "Must complete blood draw and observe 3-month wait before travel."
            })
            earliest_dt = max(earliest_dt, titer_proj_date)

    # 4. Official Health Exam & Endorsement Window
    health_cert_req = next((r for r in matched_requirements if "HEALTH" in r.rule_id), None)
    if health_cert_req:
        exam_date = max(earliest_dt - timedelta(days=5), today)
        milestones.append({
            "date": exam_date.strftime("%b %d, %Y"),
            "title": "Veterinary Health Exam & Government Endorsement",
            "status": "PENDING",
            "description": "Book vet physical examination within 10 days of confirmed departure date."
        })

    # 5. Goal Milestone: Earliest Estimated Departure Date
    milestones.append({
        "date": earliest_dt.strftime("%B %d, %Y"),
        "title": "✈️ Earliest Estimated Departure Date",
        "status": "GOAL",
        "description": "Pet satisfies all mandatory sequential waiting periods and medical prerequisites."
    })

    return TimelineResult(
        earliest_flight_date=earliest_dt.strftime("%B %d, %Y"),
        earliest_flight_datetime=earliest_dt,
        milestones=milestones
    )
