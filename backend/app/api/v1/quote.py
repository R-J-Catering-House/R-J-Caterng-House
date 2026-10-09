from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.models import Quote
from app.schemas.quote import QuoteCalculationRequest, QuoteCalculationResponse
from app.services.quote_service import calculate_quote

router = APIRouter(prefix="/quotes")


@router.post("/calculate", response_model=QuoteCalculationResponse)
def calculate_quote_endpoint(payload: QuoteCalculationRequest, db: Session = Depends(get_db)):
    result = calculate_quote(payload)

    quote = Quote(
        customer_name=payload.customer_name,
        customer_email=payload.customer_email,
        guests=payload.guests,
        package_id=payload.package_id,
        total_amount=result["total"],
    )
    db.add(quote)
    db.commit()

    return result


@router.post("/send-pdf")
def send_pdf_quote(_: QuoteCalculationRequest):
    return {
        "message": "Cotización recibida. Simulación de envío por correo completada.",
    }
