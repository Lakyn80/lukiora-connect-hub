from fastapi import APIRouter, BackgroundTasks
from app.schemas.contact import ContactIn, ContactOut
from app.services.contact import process_contact
from app.services.email import send_contact_email

router = APIRouter(prefix="/api", tags=["contact"])

@router.post("/contact", response_model=ContactOut)
async def contact_endpoint(data: ContactIn, background_tasks: BackgroundTasks) -> ContactOut:
    # uložit/zpracovat (zatím echo)
    result = process_contact(data)
    # odeslat e-mail na pozadí (pokud SMTP nastaven)
    background_tasks.add_task(send_contact_email, data)
    return result
