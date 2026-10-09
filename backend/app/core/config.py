from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    database_url: str = "postgresql+psycopg://localhost:5432/rj_catering"
    jwt_secret_key: str = "change-me"
    smtp_host: str = "smtp.example.com"
    smtp_port: int = 587
    smtp_user: str = "demo@example.com"
    smtp_password: str = "demo_password"
    smtp_from_email: str = "no-reply@rjcateringhouse.com"

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


settings = Settings()
