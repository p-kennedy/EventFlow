from typing import Annotated

from fastapi import APIRouter, Depends
import asyncpg

from app.database import get_db
from app.models.event import Event, EventCreate

router = APIRouter()


@router.get("/events", response_model=list[Event])
async def list_events(db: Annotated[asyncpg.Connection, Depends(get_db)]):
    # TODO: query events table and return mapped Event objects
    return []


@router.post("/events", response_model=Event, status_code=201)
async def create_event(
    payload: EventCreate,
    db: Annotated[asyncpg.Connection, Depends(get_db)],
):
    # TODO: insert into events table, run normaliser, return created Event
    raise NotImplementedError("Event ingestion not yet implemented")
