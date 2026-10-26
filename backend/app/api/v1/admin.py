from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.security import get_current_user
from app.db.database import get_db
from app.models.models import Addon, EventPhoto, Package, Quote, Review, User
from app.schemas.admin import (
    AddonCreate,
    AddonRead,
    AddonUpdate,
    EventPhotoCreate,
    EventPhotoRead,
    PackageCreate,
    PackageRead,
    PackageUpdate,
    QuoteRead,
    ReviewRead,
)

router = APIRouter(prefix="/admin")


@router.get("/packages", response_model=list[PackageRead])
def list_packages(db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    return db.query(Package).order_by(Package.id.asc()).all()


@router.post("/packages", response_model=PackageRead, status_code=status.HTTP_201_CREATED)
def create_package(payload: PackageCreate, db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    package = Package(**payload.model_dump())
    db.add(package)
    db.commit()
    db.refresh(package)
    return package


@router.put("/packages/{package_id}", response_model=PackageRead)
def update_package(package_id: int, payload: PackageUpdate, db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    package = db.query(Package).filter(Package.id == package_id).first()
    if not package:
        raise HTTPException(status_code=404, detail="Paquete no encontrado")

    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(package, field, value)

    db.commit()
    db.refresh(package)
    return package


@router.delete("/packages/{package_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_package(package_id: int, db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    package = db.query(Package).filter(Package.id == package_id).first()
    if not package:
        raise HTTPException(status_code=404, detail="Paquete no encontrado")

    db.delete(package)
    db.commit()


@router.get("/addons", response_model=list[AddonRead])
def list_addons(db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    return db.query(Addon).order_by(Addon.id.asc()).all()


@router.post("/addons", response_model=AddonRead, status_code=status.HTTP_201_CREATED)
def create_addon(payload: AddonCreate, db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    addon = Addon(**payload.model_dump())
    db.add(addon)
    db.commit()
    db.refresh(addon)
    return addon


@router.put("/addons/{addon_id}", response_model=AddonRead)
def update_addon(addon_id: int, payload: AddonUpdate, db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    addon = db.query(Addon).filter(Addon.id == addon_id).first()
    if not addon:
        raise HTTPException(status_code=404, detail="Extra no encontrado")

    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(addon, field, value)

    db.commit()
    db.refresh(addon)
    return addon


@router.delete("/addons/{addon_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_addon(addon_id: int, db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    addon = db.query(Addon).filter(Addon.id == addon_id).first()
    if not addon:
        raise HTTPException(status_code=404, detail="Extra no encontrado")

    db.delete(addon)
    db.commit()


@router.get("/quotes", response_model=list[QuoteRead])
def list_quotes(db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    return db.query(Quote).order_by(Quote.created_at.desc()).all()


@router.get("/photos", response_model=list[EventPhotoRead])
def list_photos(db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    return db.query(EventPhoto).order_by(EventPhoto.created_at.desc()).all()


@router.post("/photos", response_model=EventPhotoRead, status_code=status.HTTP_201_CREATED)
def create_photo(payload: EventPhotoCreate, db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    photo = EventPhoto(**payload.model_dump())
    db.add(photo)
    db.commit()
    db.refresh(photo)
    return photo


@router.delete("/photos/{photo_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_photo(photo_id: int, db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    photo = db.query(EventPhoto).filter(EventPhoto.id == photo_id).first()
    if not photo:
        raise HTTPException(status_code=404, detail="Foto no encontrada")
    db.delete(photo)
    db.commit()


@router.delete("/reviews/{review_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_review(review_id: int, db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    review = db.query(Review).filter(Review.id == review_id).first()
    if not review:
        raise HTTPException(status_code=404, detail="Reseña no encontrada")
    db.delete(review)
    db.commit()


@router.get("/reviews", response_model=list[ReviewRead])
def list_reviews(db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    return db.query(Review).order_by(Review.created_at.desc()).all()


@router.put("/reviews/{review_id}/approve", response_model=ReviewRead)
def approve_review(review_id: int, db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    review = db.query(Review).filter(Review.id == review_id).first()
    if not review:
        raise HTTPException(status_code=404, detail="Reseña no encontrada")
    review.approved = True
    db.commit()
    db.refresh(review)
    return review
