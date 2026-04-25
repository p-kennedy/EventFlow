from typing import Annotated
from uuid import UUID

from fastapi import APIRouter, Depends
import asyncpg

from app.database import get_db
from app.models.demand_event import DemandEvent

router = APIRouter()


@router.get("/recommendations/{event_id}", response_model=DemandEvent)
async def get_transport_recommendations(
    event_id: UUID,
    db: Annotated[asyncpg.Connection, Depends(get_db)],
):
    # TODO: fetch demand_event for event_id and return transport pressure + recommendations
    raise NotImplementedError("Transport recommendations not yet implemented")


@router.get("/schedule")
async def get_schedule(db: Annotated[asyncpg.Connection, Depends(get_db)]):
    # TODO: return aggregated transport schedule across all active events
    return {"schedule": []}
