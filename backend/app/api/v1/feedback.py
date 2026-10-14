from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.models import Review
from app.schemas.feedback import ReviewCreate

router = APIRouter(prefix="/reviews")


@router.get("")
def list_approved_reviews(db: Session = Depends(get_db)) -> list[dict]:
    reviews = db.query(Review).filter(Review.approved.is_(True)).order_by(Review.created_at.desc()).all()
    return [{"id": item.id, "customer_name": item.customer_name, "rating": item.rating, "comment": item.comment} for item in reviews]


@router.post("", status_code=status.HTTP_201_CREATED)
def create_review(payload: ReviewCreate, db: Session = Depends(get_db)) -> dict[str, str]:
    db.add(Review(**payload.model_dump()))
    db.commit()
    return {"message": "Reseña recibida y pendiente de aprobación."}