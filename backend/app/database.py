from contextlib import asynccontextmanager
from typing import AsyncGenerator

import asyncpg
from fastapi import FastAPI

from app.config import settings

_pool: asyncpg.Pool | None = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    global _pool
    _pool = await asyncpg.create_pool(settings.DATABASE_URL, min_size=2, max_size=10)
    yield
    if _pool:
        await _pool.close()


async def get_db() -> AsyncGenerator[asyncpg.Connection, None]:
    assert _pool is not None, "DB pool not initialised — lifespan not started"
    async with _pool.acquire() as conn:
        yield conn
