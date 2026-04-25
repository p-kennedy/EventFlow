from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel


class Event(BaseModel):
    id: UUID
    source: str  # e.g. "ticketmaster", "manual", "council"
    external_id: Optional[str] = None
    name: str
    venue_name: str
    venue_lat: float
    venue_lng: float
    start_time: datetime
    end_time: datetime
    expected_attendance: Optional[int] = None
    raw_data: Optional[dict] = None
    created_at: datetime


class EventCreate(BaseModel):
    source: str
    external_id: Optional[str] = None
    name: str
    venue_name: str
    venue_lat: float
    venue_lng: float
    start_time: datetime
    end_time: datetime
    expected_attendance: Optional[int] = None
    raw_data: Optional[dict] = None
