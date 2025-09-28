from fastapi import APIRouter
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.chatbot import generate_reply

router = APIRouter(prefix="/api/chat", tags=["chatbot"])

@router.post("/respond", response_model=ChatResponse)
async def chat_respond(payload: ChatRequest) -> ChatResponse:
    return await generate_reply(payload)
