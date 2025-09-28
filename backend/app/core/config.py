from __future__ import annotations
from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict

BASE_DIR = Path(__file__).resolve().parents[2]  # .../backend
ENV_PATH = BASE_DIR / ".env"

class Settings(BaseSettings):
    # CORS
    ALLOWED_ORIGINS: list[str] = [
        "http://localhost:5555", "http://127.0.0.1:5555",
        "http://localhost:5173", "http://127.0.0.1:5173",
    ]

    # SMTP + e-mail
    SMTP_HOST: str | None = None
    SMTP_PORT: int = 465
    SMTP_USER: str | None = None
    SMTP_PASS: str | None = None
    EMAIL_FROM: str | None = None
    EMAIL_TO: str | None = None

    # DeepSeek API
    DEEPSEEK_API_KEY: str | None = None
    DEEPSEEK_MODEL: str = "deepseek-chat"  # nebo "deepseek-reasoner"
    DEEPSEEK_BASE_URL: str = "https://api.deepseek.com"  # /chat/completions

    model_config = SettingsConfigDict(
        env_file=str(ENV_PATH),
        env_file_encoding="utf-8",
        extra="ignore",
    )

settings = Settings()
