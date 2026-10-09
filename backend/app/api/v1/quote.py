from fastapi import APIRouter

from app.schemas.quote import QuoteCalculationRequest, QuoteCalculationResponse
from app.services.quote_service import calculate_quote

router = APIRouter(prefix="/quotes")


@router.post("/calculate", response_model=QuoteCalculationResponse)
def calculate_quote_endpoint(payload: QuoteCalculationRequest):
    return calculate_quote(payload)


@router.post("/send-pdf")
def send_pdf_quote(_: QuoteCalculationRequest):
    return {
        "message": "Cotización recibida. Simulación de envío por correo completada.",
    }
