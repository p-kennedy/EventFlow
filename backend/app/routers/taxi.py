from typing import Annotated
from uuid import UUID

from fastapi import APIRouter, Depends
import asyncpg

from app.database import get_db

router = APIRouter()


@router.get("/hotspots")
async def get_hotspots(db: Annotated[asyncpg.Connection, Depends(get_db)]):
    # TODO: return current demand hotspots derived from active demand_events
    return {"hotspots": []}


@router.get("/routes/{event_id}")
async def get_routes_for_event(
    event_id: UUID,
    db: Annotated[asyncpg.Connection, Depends(get_db)],
):
    # TODO: return AI-generated taxi routing suggestions for dispersal after event_id
    return {"event_id": str(event_id), "routes": []}
