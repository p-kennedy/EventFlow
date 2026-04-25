from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import lifespan
from app.routers import ingestion, transport, taxi

app = FastAPI(title="EventFlow API", version="0.1.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ingestion.router, prefix="/api/ingestion", tags=["ingestion"])
app.include_router(transport.router, prefix="/api/transport", tags=["transport"])
app.include_router(taxi.router, prefix="/api/taxi", tags=["taxi"])


@app.get("/health")
async def health():
    return {"status": "ok"}
