from datetime import datetime
from typing import Literal
from uuid import UUID

from pydantic import BaseModel


class DemandEvent(BaseModel):
    id: UUID
    event_id: UUID
    peak_dispersal_start: datetime
    peak_dispersal_end: datetime
    demand_radius_km: float
    transport_pressure: Literal["low", "medium", "high", "critical"]
    crowd_size_estimate: int
    full_payload: dict
    created_at: datetime
