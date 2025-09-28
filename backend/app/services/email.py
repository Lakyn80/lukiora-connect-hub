from __future__ import annotations
from email.message import EmailMessage
from typing import Optional

import aiosmtplib

from app.core.config import settings
from app.schemas.contact import ContactIn

def _build_contact_message(payload: ContactIn) -> EmailMessage:
    msg = EmailMessage()
    sender = settings.EMAIL_FROM or (settings.SMTP_USER or "no-reply@example.com")
    recipient = settings.EMAIL_TO or (settings.SMTP_USER or "admin@example.com")

    msg["From"] = sender
    msg["To"] = recipient
    msg["Subject"] = f"[lukiora.com] New contact from {payload.name}"
    msg["Reply-To"] = payload.email

    body = (
        "New contact message:\n\n"
        f"Name: {payload.name}\n"
        f"Email: {payload.email}\n\n"
        "Message:\n"
        f"{payload.message}\n"
    )
    msg.set_content(body)
    return msg

async def send_contact_email(payload: ContactIn) -> Optional[str]:
    if not settings.SMTP_HOST:
        return "SMTP not configured"

    msg = _build_contact_message(payload)
    use_tls = settings.SMTP_PORT == 465

    if use_tls:
        # SMTPS (implicit TLS)
        await aiosmtplib.send(
            msg,
            hostname=settings.SMTP_HOST,
            port=settings.SMTP_PORT,
            username=settings.SMTP_USER,
            password=settings.SMTP_PASS,
            timeout=20,
            start_tls=False,
            use_tls=True,
        )
    else:
        # STARTTLS (např. port 587)
        await aiosmtplib.send(
            msg,
            hostname=settings.SMTP_HOST,
            port=settings.SMTP_PORT,
            username=settings.SMTP_USER,
            password=settings.SMTP_PASS,
            timeout=20,
            start_tls=True,
            use_tls=False,
        )
    return None
