from __future__ import annotations
from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict

BASE_DIR = Path(__file__).resolve().parents[2]
ENV_PATH = BASE_DIR / ".env"

class Settings(BaseSettings):
    # CORS
    ALLOWED_ORIGINS: list[str] = [
        "http://localhost:5555", "http://127.0.0.1:5555",
        "http://localhost:5173", "http://127.0.0.1:5173",
        "http://localhost:8081", "http://127.0.0.1:8081",
        "http://lukiora-frontend", "http://lukiora-frontend:80",
        "*",  # Allow all origins for Docker setup
    ]

    # SMTP
    SMTP_HOST: str | None = None
    SMTP_PORT: int = 465
    SMTP_USER: str | None = None
    SMTP_PASS: str | None = None
    EMAIL_FROM: str | None = None
    EMAIL_TO: str | None = None

    # DeepSeek
    DEEPSEEK_API_KEY: str | None = None
    DEEPSEEK_MODEL: str = "deepseek-chat"
    DEEPSEEK_BASE_URL: str = "https://api.deepseek.com"
    DEEPSEEK_SYSTEM_PROMPT: str = "You are a helpful assistant. Reply in Czech."

    # Telegram
    TELEGRAM_BOT_TOKEN: str | None = None
    TG_WEBHOOK_TOKEN: str | None = None
    TELEGRAM_API_BASE: str = "https://api.telegram.org"

    model_config = SettingsConfigDict(
        env_file=str(ENV_PATH),
        env_file_encoding="utf-8",
        extra="ignore",
    )

settings = Settings()
