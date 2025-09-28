from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.routes.health import router as health_router
from app.api.routes.contact import router as contact_router
from app.api.routes.chatbot import router as chatbot_router
from app.api.routes.telegram import router as telegram_router

app = FastAPI(title="lukiora-backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"ok": True, "service": "lukiora-backend"}

@app.get("/api/ping")
def ping():
    return {"pong": True}

app.include_router(health_router)
app.include_router(contact_router)
app.include_router(chatbot_router)
app.include_router(telegram_router)
