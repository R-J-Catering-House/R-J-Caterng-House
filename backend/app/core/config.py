from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    database_url: str = "postgresql+psycopg://localhost:5432/rj_catering"
    cors_origins: str = "http://localhost:3000,http://127.0.0.1:3000"
    jwt_secret_key: str = "change-me"
    jwt_algorithm: str = "HS256"
    jwt_expire_minutes: int = 120
    smtp_host: str = "smtp.example.com"
    smtp_port: int = 587
    smtp_user: str = "demo@example.com"
    smtp_password: str = "demo_password"
    smtp_from_email: str = "no-reply@rjcateringhouse.com"
    owner1_email: str = ""
    owner1_password: str = ""
    owner2_email: str = ""
    owner2_password: str = ""
    cookie_secure: bool = False
    session_cookie_name: str = "rj_admin_session"

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


settings = Settings()
