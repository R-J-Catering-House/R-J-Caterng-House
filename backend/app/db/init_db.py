from decimal import Decimal

from sqlalchemy import inspect, text
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.security import hash_password
from app.db.database import Base, engine
from app.models.models import Addon, Package, User

DEFAULT_PACKAGES = [
    {"id": 1, "name": "Paquete #1", "description": "Mano de piedra en salsa demiglace y hongos", "price_per_person": Decimal("11000")},
    {"id": 2, "name": "Paquete #2", "description": "Pechuga de pollo a la parrilla en salsa Alfredo de hongos", "price_per_person": Decimal("12500")},
    {"id": 3, "name": "Paquete #3", "description": "Cordon Bleu en salsa Alfredo de hongos", "price_per_person": Decimal("14000")},
    {"id": 4, "name": "Paquete #4", "description": "Costilla de cerdo en salsa BBQ de manzana", "price_per_person": Decimal("12000")},
    {"id": 5, "name": "Paquete #5", "description": "NY Steak (300g) con chimichurri argentino", "price_per_person": Decimal("16500")},
]

DEFAULT_ADDONS = [
    {"name": "Entradas", "price_type": "per_person", "price_value": Decimal("2000")},
    {"name": "Mesa de postres", "price_type": "fixed", "price_value": Decimal("85000")},
    {"name": "Servicio de DJ", "price_type": "fixed", "price_value": Decimal("200000")},
    {"name": "Fotocabina", "price_type": "fixed", "price_value": Decimal("85000")},
]


def init_db(session: Session) -> None:
    Base.metadata.create_all(bind=engine)
    if "event_date" not in {column["name"] for column in inspect(engine).get_columns("quotes")}:
        with engine.begin() as connection:
            connection.execute(text("ALTER TABLE quotes ADD COLUMN event_date DATE"))

    existing_admin = session.query(User).filter(User.email == settings.admin_email).first()
    if not existing_admin:
        session.add(
            User(
                email=settings.admin_email,
                hashed_password=hash_password(settings.admin_password),
                is_active=True,
            )
        )

    if session.query(Package).count() == 0:
        for pkg in DEFAULT_PACKAGES:
            session.add(Package(**pkg))

    if session.query(Addon).count() == 0:
        for addon in DEFAULT_ADDONS:
            session.add(Addon(**addon))

    session.commit()
