from fastapi import APIRouter, Header, HTTPException, Request
from app.core.config import settings
from app.services.telegram import handle_update

router = APIRouter(prefix="/api/telegram", tags=["telegram"])

@router.post("/webhook/{token}")
async def telegram_webhook(
    token: str,
    request: Request,
    x_telegram_bot_api_secret_token: str | None = Header(default=None),
):
    if settings.TG_WEBHOOK_TOKEN and token != settings.TG_WEBHOOK_TOKEN:
        raise HTTPException(status_code=403, detail="invalid webhook token")
    data = await request.json()
    return await handle_update(data)
