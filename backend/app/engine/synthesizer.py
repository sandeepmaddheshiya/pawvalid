from typing import Dict, Any, List
from app.engine.entity_extractor import PetFacts

def build_synthesis(
    facts: PetFacts,
    readiness_result: Dict[str, Any],
    origin: str,
    destination: str,
    transit_countries: List[str] = None
) -> Dict[str, Any]:
    evaluations = readiness_result["evaluations"]
    blocker_summary = readiness_result["blockerSummary"]
    earliest_date = readiness_result["earliestFlightDate"]
    species_text = "dog" if facts.species == "DOG" else ("cat" if facts.species == "CAT" else "pet")
    transits = transit_countries or []
    transit_str = f" transiting via {', '.join(transits)}" if transits else ""

    # 1. Empathetic Narrative Summary
    crit_count = blocker_summary["criticalBlockersCount"]
    req_count = blocker_summary["requiredActionsCount"]

    if crit_count > 0:
        what_this_means = (
            f"We analyzed your documents for your {species_text}'s journey from {origin} to {destination}{transit_str}. "
            f"There {'is' if crit_count == 1 else 'are'} {crit_count} critical compliance blocker{'s' if crit_count > 1 else ''} "
            f"that must be resolved before booking flights or entering border control. "
            f"Your earliest possible legal flight date is estimated as {earliest_date} once prerequisites are fulfilled."
        )
    elif req_count > 0:
        what_this_means = (
            f"Good progress! Your documents for your {species_text}'s trip from {origin} to {destination}{transit_str} "
            f"clear the foundational identity checks. There are {req_count} short-lead vet actions and official paperwork "
            f"steps remaining. Based on mandatory waiting periods, your earliest estimated travel date is {earliest_date}."
        )
    else:
        what_this_means = (
            f"Excellent news! All core compliance requirements for your {species_text}'s trip from {origin} to {destination}{transit_str} "
            f"appear satisfied. You are ready to proceed with airline booking and travel-day preparations."
        )

    # 2. "Where things stand" Table Items
    where_things_stand = []
    for ev in evaluations:
        where_things_stand.append({
            "requirement": ev["name"],
            "category": ev["category"],
            "scope": ev["scope"],
            "statusBadge": ev["statusBadge"],
            "status": ev["status"],
            "severity": ev["severity"],
            "whatToDo": ev["whatToDo"],
            "details": ev["details"]
        })

    # 3. Document Audit Log with Provenance
    doc_audit = facts.doc_audit or []

    # 4. Chronological Action Roadmap (Deduplicated)
    next_steps = []
    seen_steps = set()

    def add_step(step_text: str):
        clean_text = step_text.strip()
        if clean_text and clean_text not in seen_steps:
            seen_steps.add(clean_text)
            next_steps.append(clean_text)

    if crit_count > 0:
        for ev in evaluations:
            if ev["severity"] == "CRITICAL_BLOCKER" and ev.get("whatToDo"):
                add_step(f"CRITICAL: {ev['whatToDo']}")

    for ev in evaluations:
        if ev["severity"] == "REQUIRED_ACTION" and ev.get("whatToDo"):
            add_step(ev["whatToDo"])

    add_step("Book your pet's flight directly with the airline (minimum 48–72 hours notice required).")

    # 5. Travel Day Preparations
    travel_day = [
        "Assemble official health certificates and declaration forms in a waterproof travel folder.",
        "Ensure your pet carrier is IATA CR-82 compliant with adequate ventilation and attached water container.",
        "Arrive at the airport 4 hours prior for cargo travel, or 2–3 hours for in-cabin travel.",
        "Confirm passenger ticket name exactly matches pet booking and owner declarations."
    ]

    return {
        "whatThisMeans": what_this_means,
        "whereThingsStand": where_things_stand,
        "documentAudit": doc_audit,
        "nextSteps": next_steps,
        "travelDayPrep": travel_day,
        "earliestFlightDate": earliest_date
    }
