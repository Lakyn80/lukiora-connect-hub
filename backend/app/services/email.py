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

    import logging
    logger = logging.getLogger("uvicorn.error")

    try:
        # 1. Odeslat notifikaci na service@lukiora.com
        logger.info(f"Sending contact email to {settings.EMAIL_TO} from {payload.email}")
        msg = _build_contact_message(payload)
        use_tls = settings.SMTP_PORT == 465

        if use_tls:
            # SMTPS (implicit TLS) - port 465
            await aiosmtplib.send(
                msg,
                hostname=settings.SMTP_HOST,
                port=settings.SMTP_PORT,
                username=settings.SMTP_USER,
                password=settings.SMTP_PASS,
                timeout=60,  # Increased timeout
                start_tls=False,
                use_tls=True,
            )
        else:
            # STARTTLS - port 587
            await aiosmtplib.send(
                msg,
                hostname=settings.SMTP_HOST,
                port=settings.SMTP_PORT,
                username=settings.SMTP_USER,
                password=settings.SMTP_PASS,
                timeout=60,  # Increased timeout
                start_tls=True,
                use_tls=False,
            )

        logger.info("Notification email sent successfully")

        # 2. Odeslat potvrzení klientovi
        logger.info(f"Sending confirmation email to {payload.email}")
        confirmation = _build_confirmation_message(payload)
        if use_tls:
            await aiosmtplib.send(
                confirmation,
                hostname=settings.SMTP_HOST,
                port=settings.SMTP_PORT,
                username=settings.SMTP_USER,
                password=settings.SMTP_PASS,
                timeout=60,  # Increased timeout
                start_tls=False,
                use_tls=True,
            )
        else:
            await aiosmtplib.send(
                confirmation,
                hostname=settings.SMTP_HOST,
                port=settings.SMTP_PORT,
                username=settings.SMTP_USER,
                password=settings.SMTP_PASS,
                timeout=60,  # Increased timeout
                start_tls=True,
                use_tls=False,
            )

        logger.info("Confirmation email sent successfully")
        return None
    except Exception as e:
        # Log error but don't fail the request
        logger.error(f"Email sending failed: {e}", exc_info=True)
        return f"Email failed: {str(e)}"

def _build_confirmation_message(payload: ContactIn) -> EmailMessage:
    """Potvrzovací email pro klienta"""
    msg = EmailMessage()
    sender = settings.EMAIL_FROM or (settings.SMTP_USER or "no-reply@lukiora.com")

    msg["From"] = sender
    msg["To"] = payload.email
    msg["Subject"] = "Děkujeme za Vaši zprávu - Lukiora"

    body = f"""Dobrý den {payload.name},

Děkujeme za Vaši zprávu. Vaši zprávu jsme úspěšně přijali a odpovíme Vám co nejdříve, obvykle do 24 hodin.

Vaše zpráva:
{payload.message}

S pozdravem,
Tým Lukiora
service@lukiora.com

---

Hello {payload.name},

Thank you for your message. We have successfully received your inquiry and will respond as soon as possible, usually within 24 hours.

Your message:
{payload.message}

Best regards,
Lukiora Team
service@lukiora.com

---

Здравствуйте {payload.name},

Спасибо за Ваше сообщение. Мы успешно получили Ваш запрос и ответим как можно скорее, обычно в течение 24 часов.

Ваше сообщение:
{payload.message}

С уважением,
Команда Lukiora
service@lukiora.com
"""
    msg.set_content(body)
    return msg
