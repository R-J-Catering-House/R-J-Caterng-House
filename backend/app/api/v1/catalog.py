from fastapi import APIRouter

router = APIRouter()


@router.get("/catalog")
def get_catalog() -> dict:
    return {
        "packages": [
            {
                "id": 1,
                "name": "Paquete #1",
                "description": "Mano de piedra en salsa demiglace y hongos",
                "price_per_person": 11000,
            },
            {
                "id": 2,
                "name": "Paquete #2",
                "description": "Pechuga de pollo a la parrilla en salsa Alfredo de hongos",
                "price_per_person": 12500,
            },
            {
                "id": 3,
                "name": "Paquete #3",
                "description": "Cordon Bleu en salsa Alfredo de hongos",
                "price_per_person": 14000,
            },
            {
                "id": 4,
                "name": "Paquete #4",
                "description": "Costilla de cerdo en salsa BBQ de manzana",
                "price_per_person": 12000,
            },
            {
                "id": 5,
                "name": "Paquete #5",
                "description": "NY Steak (300g) con chimichurri argentino",
                "price_per_person": 16500,
            },
        ]
    }
