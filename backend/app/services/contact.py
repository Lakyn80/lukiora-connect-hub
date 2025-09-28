from app.schemas.contact import ContactIn, ContactOut

def process_contact(payload: ContactIn) -> ContactOut:
    # místo DB/emailu jen echo; snadno nahradíš skutečnou logikou
    return ContactOut(ok=True, received=payload)
