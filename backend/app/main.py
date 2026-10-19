from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.admin import router as admin_router
from app.api.v1.auth import router as auth_router
from app.api.v1.availability import router as availability_router
from app.api.v1.catalog import router as catalog_router
from app.api.v1.feedback import router as feedback_router
from app.api.v1.quote import router as quote_router
from app.core.config import settings
from app.db.database import SessionLocal
from app.db.init_db import init_db

app = FastAPI(title="R&J Catering House API", version="0.2.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.strip() for origin in settings.cors_origins.split(",") if origin.strip()],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(catalog_router, prefix="/api/v1", tags=["catalog"])
app.include_router(quote_router, prefix="/api/v1", tags=["quotes"])
app.include_router(feedback_router, prefix="/api/v1", tags=["reviews"])
app.include_router(auth_router, prefix="/api/v1", tags=["auth"])
app.include_router(admin_router, prefix="/api/v1", tags=["admin"])
app.include_router(availability_router)


@app.on_event("startup")
def on_startup() -> None:
    db = SessionLocal()
    try:
        init_db(db)
    finally:
        db.close()


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}
