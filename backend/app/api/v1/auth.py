import time

from fastapi import APIRouter, Depends, HTTPException, Request, Response, status
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.security import create_access_token, get_current_user, verify_password
from app.db.database import get_db
from app.models.models import User
from app.schemas.auth import LoginRequest, MeResponse

router = APIRouter(prefix="/auth")

MAX_FAILED_ATTEMPTS = 5
LOCK_SECONDS = 15 * 60
_failed_attempts: dict[str, list[float]] = {}


def _attempt_key(request: Request, email: str) -> str:
    client = request.client.host if request.client else "unknown"
    return f"{client}:{email.lower()}"


def _recent_failures(key: str) -> list[float]:
    cutoff = time.time() - LOCK_SECONDS
    recent = [stamp for stamp in _failed_attempts.get(key, []) if stamp > cutoff]
    _failed_attempts[key] = recent
    return recent


@router.post("/login", response_model=MeResponse)
def login(payload: LoginRequest, request: Request, response: Response, db: Session = Depends(get_db)):
    key = _attempt_key(request, payload.email)
    if len(_recent_failures(key)) >= MAX_FAILED_ATTEMPTS:
        raise HTTPException(status_code=status.HTTP_429_TOO_MANY_REQUESTS, detail="Demasiados intentos. Intenta de nuevo en 15 minutos.")

    user = db.query(User).filter(User.email == payload.email.lower()).first()
    if not user or not user.is_active or not verify_password(payload.password, user.hashed_password):
        _failed_attempts.setdefault(key, []).append(time.time())
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Credenciales inválidas")

    _failed_attempts.pop(key, None)
    token = create_access_token(user.email)
    response.set_cookie(
        key=settings.session_cookie_name,
        value=token,
        max_age=settings.jwt_expire_minutes * 60,
        httponly=True,
        secure=settings.cookie_secure,
        samesite="lax",
        path="/",
    )
    return MeResponse(email=user.email)


@router.post("/logout", status_code=status.HTTP_204_NO_CONTENT)
def logout(response: Response):
    response.delete_cookie(key=settings.session_cookie_name, path="/")


@router.get("/me", response_model=MeResponse)
def me(user: User = Depends(get_current_user)):
    return MeResponse(email=user.email)
