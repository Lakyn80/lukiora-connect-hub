# backend/app/services/telegram.py
from __future__ import annotations

from typing import Optional
import httpx

from app.core.config import settings
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.chatbot import generate_reply


def _extract(update: dict) -> tuple[Optional[int], Optional[str]]:
    """
    Vytáhne chat_id a text z Telegram update.
    Podporuje message, edited_message a callback_query.data.
    """
    msg = update.get("message") or update.get("edited_message")
    if msg and "text" in msg:
        return msg["chat"]["id"], msg["text"]

    cq = update.get("callback_query")
    if cq and "data" in cq and "message" in cq:
        return cq["message"]["chat"]["id"], cq["data"]

    return None, None


async def _send_text(chat_id: int, text: str) -> None:
    """
    Pošle textovou odpověď zpět do Telegramu.
    """
    token = settings.TELEGRAM_BOT_TOKEN
    if not token:
        return

    url = f"{settings.TELEGRAM_API_BASE}/bot{token}/sendMessage"
    payload = {
        "chat_id": chat_id,
        "text": text,
        "parse_mode": "HTML",
        "disable_web_page_preview": True,
    }
    async with httpx.AsyncClient(timeout=20) as client:
        await client.post(url, json=payload)


async def handle_update(update: dict) -> dict:
    """
    Hlavní handler volaný z /api/telegram/webhook/{token}.
    1) Získá text, 2) pošle do LLM přes generate_reply, 3) odešle odpověď.
    """
    chat_id, text = _extract(update)
    if not chat_id or not text:
        # ignoruj ne-textové updaty
        return {"ok": True}

    try:
        req = ChatRequest(message=text, session_id=None, history=None)
        resp: ChatResponse = await generate_reply(req)
        await _send_text(chat_id, resp.reply)
        return {"ok": True}
    except Exception:
        await _send_text(chat_id, "Sorry, something went wrong. Please try again.")
        return {"ok": False}
