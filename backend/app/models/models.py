from datetime import datetime
from decimal import Decimal

from sqlalchemy import Boolean, DateTime, ForeignKey, Integer, Numeric, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.db.database import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False, index=True)
    hashed_password: Mapped[str] = mapped_column(String(255), nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)


class Package(Base):
    __tablename__ = "packages"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    price_per_person: Mapped[Decimal] = mapped_column(Numeric(10, 2), nullable=False)


class MenuItem(Base):
    __tablename__ = "menu_items"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    category: Mapped[str] = mapped_column(String(50), nullable=False)
    price: Mapped[Decimal] = mapped_column(Numeric(10, 2), nullable=False)


class Addon(Base):
    __tablename__ = "addons"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    price_type: Mapped[str] = mapped_column(String(30), nullable=False, default="fixed")
    price_value: Mapped[Decimal] = mapped_column(Numeric(10, 2), nullable=False)


class Quote(Base):
    __tablename__ = "quotes"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    customer_name: Mapped[str] = mapped_column(String(150), nullable=False)
    customer_email: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    guests: Mapped[int] = mapped_column(Integer, nullable=False)
    package_id: Mapped[int] = mapped_column(ForeignKey("packages.id"), nullable=False)
    total_amount: Mapped[Decimal] = mapped_column(Numeric(12, 2), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)
