from decimal import Decimal

from app.schemas.quote import QuoteCalculationRequest

PACKAGE_PRICES: dict[int, Decimal] = {
    1: Decimal("11000"),
    2: Decimal("12500"),
    3: Decimal("14000"),
    4: Decimal("12000"),
    5: Decimal("16500"),
}

EXTRA_PRICES = {
    "entradas": {"type": "per_person", "price": Decimal("2000")},
    "postres": {"type": "fixed", "price": Decimal("85000")},
    "dj": {"type": "fixed", "price": Decimal("200000")},
    "fotocabina": {"type": "fixed", "price": Decimal("85000")},
}

EXTRA_LABELS = {
    "entradas": "Entradas adicionales",
    "postres": "Mesa de postres adicional",
    "dj": "Servicio de DJ",
    "fotocabina": "Fotocabina abierta",
}


def calculate_quote(payload: QuoteCalculationRequest) -> dict:
    price_per_person = PACKAGE_PRICES[payload.package_id]
    subtotal_package = price_per_person * payload.guests

    breakdown = [
        {
            "concept": f"Paquete #{payload.package_id} x {payload.guests} invitados",
            "amount": subtotal_package,
        }
    ]

    extras_total = Decimal("0")
    for addon_name, selected in payload.addons.model_dump().items():
        if not selected:
            continue

        price_rule = EXTRA_PRICES[addon_name]
        amount = (
            price_rule["price"] * payload.guests
            if price_rule["type"] == "per_person"
            else price_rule["price"]
        )
        extras_total += amount
        breakdown.append({"concept": EXTRA_LABELS[addon_name], "amount": amount})

    total = subtotal_package + extras_total

    return {
        "subtotal_package": subtotal_package,
        "extras_total": extras_total,
        "total": total,
        "breakdown": breakdown,
    }
