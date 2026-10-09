from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel, Field


class PackageBase(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    description: str = Field(min_length=5)
    price_per_person: Decimal = Field(gt=0)


class PackageCreate(PackageBase):
    pass


class PackageUpdate(BaseModel):
    name: str | None = Field(default=None, min_length=2, max_length=100)
    description: str | None = Field(default=None, min_length=5)
    price_per_person: Decimal | None = Field(default=None, gt=0)


class PackageRead(PackageBase):
    id: int

    model_config = {"from_attributes": True}


class AddonBase(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    price_type: str = Field(pattern="^(fixed|per_person)$")
    price_value: Decimal = Field(gt=0)


class AddonCreate(AddonBase):
    pass


class AddonUpdate(BaseModel):
    name: str | None = Field(default=None, min_length=2, max_length=100)
    price_type: str | None = Field(default=None, pattern="^(fixed|per_person)$")
    price_value: Decimal | None = Field(default=None, gt=0)


class AddonRead(AddonBase):
    id: int

    model_config = {"from_attributes": True}


class QuoteRead(BaseModel):
    id: int
    customer_name: str | None
    customer_email: str | None
    guests: int
    package_id: int
    total_amount: Decimal
    created_at: datetime

    model_config = {"from_attributes": True}
