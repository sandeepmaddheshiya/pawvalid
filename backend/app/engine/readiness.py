"""
Deterministic Readiness Evaluator for Petvia

Processes matched requirements from the Evidence Matcher and timeline milestones
from the Dependency Graph. Computes categorical blocker summaries and applies
safe legal framing and disclaimers to the Earliest Estimated Travel Date.
"""

from typing import Dict, Any, List, Optional
from app.engine.evidence_matcher import MatchedRequirement
from app.engine.dependency_graph import TimelineResult
from app.engine.entity_extractor import PetFacts

def evaluate_readiness(
    matched_requirements: List[MatchedRequirement],
    timeline_result: TimelineResult,
    origin: str,
    destination: str,
    transit_countries: Optional[List[str]] = None,
    facts: Optional[PetFacts] = None,
) -> Dict[str, Any]:
    critical_blockers = [r for r in matched_requirements if r.severity == "CRITICAL_BLOCKER" or r.status == "CRITICAL_BLOCKER"]
    required_actions = [r for r in matched_requirements if r.severity == "REQUIRED_ACTION" or r.status == "REQUIRED_ACTION"]
    travel_day_actions = [r for r in matched_requirements if r.scope == "LOGISTICS" or r.severity == "TRAVEL_DAY_ACTION" or r.status == "TRAVEL_DAY_ACTION"]
    completed_verified = [r for r in matched_requirements if r.severity == "COMPLETED" or r.status == "SATISFIED"]

    # Overall Status
    if len(critical_blockers) > 0:
        overall_status = "NOT_READY"
        count = len(critical_blockers)
        status_headline = f"🔴 NOT READY — {count} critical blocker{'s' if count > 1 else ''} must be resolved before travel"
    elif len(required_actions) > 0:
        overall_status = "ACTION_REQUIRED"
        count = len(required_actions)
        status_headline = f"🟡 PREPARATION NEEDED — {count} required action{'s' if count > 1 else ''} to complete before departure"
    else:
        overall_status = "READY_TO_FLY"
        status_headline = "🟢 TRAVEL READY — All prerequisite health checks and route requirements satisfied"

    # Legal Framing & Disclaimers
    earliest_flight_date = timeline_result.earliest_flight_date
    earliest_flight_title = "Earliest Estimated Travel Date"
    earliest_flight_subtitle = "Based on the documents provided, route requirements, known waiting periods, and currently verified rules."
    disclaimer = "⚠️ Airline approval and government processing times may affect your actual travel date."

    # Determine if expert human review is recommended
    has_conflicts = any(
        "Conflicting" in r.status_badge or (r.matched_evidence and r.matched_evidence.get("status") == "CONFLICTING")
        for r in matched_requirements
    )
    needs_human_review = has_conflicts or (len(critical_blockers) >= 2)

    evaluations_dict = [r.to_dict() for r in matched_requirements]

    return {
        "overallStatus": overall_status,
        "statusHeadline": status_headline,
        "needsHumanReview": needs_human_review,
        "earliestFlightDate": earliest_flight_date,
        "earliestFlightDateTitle": earliest_flight_title,
        "earliestFlightDateSubtitle": earliest_flight_subtitle,
        "disclaimer": disclaimer,
        "blockerSummary": {
            "criticalBlockersCount": len(critical_blockers),
            "requiredActionsCount": len(required_actions),
            "travelDayActionsCount": len(travel_day_actions),
            "completedVerifiedCount": len(completed_verified),
        },
        "criticalBlockers": [r.to_dict() for r in critical_blockers],
        "requiredActions": [r.to_dict() for r in required_actions],
        "travelDayActions": [r.to_dict() for r in travel_day_actions],
        "completedVerified": [r.to_dict() for r in completed_verified],
        "timelineMilestones": timeline_result.milestones,
        "evaluations": evaluations_dict,
        "complianceChecklist": {
            "all": evaluations_dict,
            "leaving": [e for e in evaluations_dict if e["scope"] == "LEAVING"],
            "transit": [e for e in evaluations_dict if e["scope"] == "TRANSIT"],
            "arriving": [e for e in evaluations_dict if e["scope"] == "ARRIVING"],
            "logistics": [e for e in evaluations_dict if e["scope"] == "LOGISTICS"],
        }
    }
