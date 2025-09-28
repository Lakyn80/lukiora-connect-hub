from __future__ import annotations
from pydantic import BaseModel, Field
from typing import Literal, Optional, List

Role = Literal["user", "assistant", "system"]

class ChatMessage(BaseModel):
    role: Role
    content: str = Field(min_length=1, max_length=4000)

class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=2000)
    session_id: Optional[str] = None
    history: Optional[List[ChatMessage]] = None

class ChatResponse(BaseModel):
    session_id: str
    reply: str
