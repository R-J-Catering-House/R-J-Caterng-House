from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.models import Addon, EventPhoto, Package

router = APIRouter()


@router.get("/photos")
def list_public_photos(db: Session = Depends(get_db)) -> list[dict]:
    photos = db.query(EventPhoto).order_by(EventPhoto.created_at.desc()).all()
    return [{"id": photo.id, "title": photo.title, "image_url": photo.image_url} for photo in photos]


@router.get("/catalog")
def get_catalog(db: Session = Depends(get_db)) -> dict:
    packages = db.query(Package).order_by(Package.id.asc()).all()
    addons = db.query(Addon).order_by(Addon.id.asc()).all()

    return {
        "packages": [
            {
                "id": pkg.id,
                "name": pkg.name,
                "description": pkg.description,
                "price_per_person": float(pkg.price_per_person),
            }
            for pkg in packages
        ],
        "addons": [
            {
                "id": addon.id,
                "name": addon.name,
                "price_type": addon.price_type,
                "price_value": float(addon.price_value),
            }
            for addon in addons
        ],
    }
