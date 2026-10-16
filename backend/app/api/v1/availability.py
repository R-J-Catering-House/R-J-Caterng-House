from datetime import date

from fastapi import APIRouter, WebSocket, WebSocketDisconnect

router = APIRouter()

MONTHS = [
    {"month": f"{month} {year}", "available": 4 if month not in {"Marzo", "Diciembre"} else 0, "total": 8}
    for year in (2026, 2027)
    for month in ("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre")
]


class AvailabilityHub:
    def __init__(self) -> None:
        self.connections: set[WebSocket] = set()

    async def connect(self, websocket: WebSocket) -> None:
        await websocket.accept()
        self.connections.add(websocket)

    def disconnect(self, websocket: WebSocket) -> None:
        self.connections.discard(websocket)

    async def broadcast(self) -> None:
        for connection in tuple(self.connections):
            try:
                await connection.send_json({"months": MONTHS})
            except (RuntimeError, WebSocketDisconnect):
                self.disconnect(connection)


hub = AvailabilityHub()


def reserve_date(event_date: date | None) -> None:
    if event_date is None or event_date.year not in (2026, 2027):
        return
    month_index = (event_date.year - 2026) * 12 + event_date.month - 1
    MONTHS[month_index]["available"] = max(0, MONTHS[month_index]["available"] - 1)


@router.websocket("/ws/availability")
async def availability_socket(websocket: WebSocket) -> None:
    await hub.connect(websocket)
    try:
        await websocket.send_json({"months": MONTHS})
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        hub.disconnect(websocket)
