import anthropic

from app.config import settings
from app.models.event import Event
from app.models.demand_event import DemandEvent

_client = anthropic.Anthropic(api_key=settings.ANTHROPIC_API_KEY)

_SYSTEM_PROMPT = """You are a transport demand analyst for a city operations platform.
Given an event, estimate dispersal timing, geographic demand radius, crowd pressure level,
and crowd size. Respond only with a JSON object matching the DemandEvent schema fields
(exclude id, event_id, created_at — those are set by the caller)."""


async def enrich_event(event: Event) -> dict:
    """
    Call Claude to produce demand-planning data for a normalised Event.
    Returns a dict ready to be merged into a DemandEvent.
    """
    user_message = f"""Event details:
- Name: {event.name}
- Venue: {event.venue_name} ({event.venue_lat}, {event.venue_lng})
- Start: {event.start_time.isoformat()}
- End: {event.end_time.isoformat()}
- Expected attendance: {event.expected_attendance or "unknown"}

Produce the demand estimate JSON."""

    response = _client.messages.create(
        model=settings.ANTHROPIC_MODEL,
        max_tokens=1024,
        system=_SYSTEM_PROMPT,
        messages=[{"role": "user", "content": user_message}],
    )

    import json
    return json.loads(response.content[0].text)
