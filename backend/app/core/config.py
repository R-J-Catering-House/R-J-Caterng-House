from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    database_url: str = "postgresql+psycopg://localhost:5432/rj_catering"
    jwt_secret_key: str = "change-me"
    jwt_algorithm: str = "HS256"
    jwt_expire_minutes: int = 120
    smtp_host: str = "smtp.example.com"
    smtp_port: int = 587
    smtp_user: str = "demo@example.com"
    smtp_password: str = "demo_password"
    smtp_from_email: str = "no-reply@rjcateringhouse.com"
    admin_email: str = "admin@rjcateringhouse.com"
    admin_password: str = "Admin123!"

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


settings = Settings()
