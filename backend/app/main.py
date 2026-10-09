from fastapi import FastAPI

from app.api.v1.catalog import router as catalog_router
from app.api.v1.quote import router as quote_router

app = FastAPI(title="R&J Catering House API", version="0.1.0")

app.include_router(catalog_router, prefix="/api/v1", tags=["catalog"])
app.include_router(quote_router, prefix="/api/v1", tags=["quotes"])


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}
