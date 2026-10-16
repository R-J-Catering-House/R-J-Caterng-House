from decimal import Decimal
from datetime import date

from pydantic import BaseModel, EmailStr, Field


class SelectedAddons(BaseModel):
    entradas: bool = False
    postres: bool = False
    dj: bool = False
    fotocabina: bool = False


class QuoteCalculationRequest(BaseModel):
    customer_name: str | None = Field(default=None, min_length=2, max_length=120)
    customer_email: EmailStr | None = None
    guests: int = Field(ge=60, le=150)
    package_id: int = Field(ge=1, le=5)
    event_date: date | None = None
    addons: SelectedAddons = Field(default_factory=SelectedAddons)


class BreakdownItem(BaseModel):
    concept: str
    amount: Decimal


class QuoteCalculationResponse(BaseModel):
    subtotal_package: Decimal
    extras_total: Decimal
    total: Decimal
    breakdown: list[BreakdownItem]
