from fastapi import FastAPI

from app.api.v1.admin import router as admin_router
from app.api.v1.auth import router as auth_router
from app.api.v1.catalog import router as catalog_router
from app.api.v1.quote import router as quote_router
from app.db.database import SessionLocal
from app.db.init_db import init_db

app = FastAPI(title="R&J Catering House API", version="0.2.0")

app.include_router(catalog_router, prefix="/api/v1", tags=["catalog"])
app.include_router(quote_router, prefix="/api/v1", tags=["quotes"])
app.include_router(auth_router, prefix="/api/v1", tags=["auth"])
app.include_router(admin_router, prefix="/api/v1", tags=["admin"])


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
