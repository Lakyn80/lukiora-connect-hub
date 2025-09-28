from __future__ import annotations
import uuid
import datetime as dt
import httpx
from app.schemas.chat import ChatRequest, ChatResponse
from app.core.config import settings

def _to_messages(req: ChatRequest) -> list[dict]:
    msgs: list[dict] = []
    # system prompt s preferovaným jazykem
    if settings.DEEPSEEK_SYSTEM_PROMPT:
        msgs.append({"role": "system", "content": settings.DEEPSEEK_SYSTEM_PROMPT})
    if req.history:
        for m in req.history:
            # očekává "user" | "assistant"
            msgs.append({"role": m.role, "content": m.content})
    msgs.append({"role": "user", "content": req.message})
    return msgs

async def _deepseek_reply(req: ChatRequest) -> str:
    url = f"{settings.DEEPSEEK_BASE_URL}/chat/completions"
    headers = {"Authorization": f"Bearer {settings.DEEPSEEK_API_KEY}"}
    payload = {
        "model": settings.DEEPSEEK_MODEL,
        "messages": _to_messages(req),
        "stream": False,
        "temperature": 0.7,
    }
    async with httpx.AsyncClient(timeout=30) as client:
        r = await client.post(url, headers=headers, json=payload)
        r.raise_for_status()
        data = r.json()
        return data["choices"][0]["message"]["content"]

async def generate_reply(req: ChatRequest) -> ChatResponse:
    session = req.session_id or str(uuid.uuid4())
    if settings.DEEPSEEK_API_KEY:
        try:
            text = await _deepseek_reply(req)
        except Exception as e:
            now = dt.datetime.utcnow().isoformat(timespec="seconds") + "Z"
            text = f"[DeepSeek error: {type(e).__name__}] You said: {req.message} — {now}"
    else:
        now = dt.datetime.utcnow().isoformat(timespec="seconds") + "Z"
        text = f"You said: {req.message} — {now}"
    return ChatResponse(session_id=session, reply=text)
