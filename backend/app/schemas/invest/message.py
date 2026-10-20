import uuid 
from datetime import datetime 
from pydantic import BaseModel, ConfigDict, Field 


class MessageCreate(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)
    content: str = Field(min_length=1, max_length=4000)

class MessageResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID 
    conversation_id: uuid.UUID 
    sender_id: uuid.UUID 
    content: str 
    is_read: bool 
    created_at: datetime 


class ConversationResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID 
    user_id: uuid.UUID 
    admin_id: uuid.UUID | None = None 
    created_at: datetime
    last_message_at: datetime 

class ConversationUser(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID 
    email: str
    first_name: str | None = None
    last_name: str | None = None

class InboxItem(ConversationResponse):
    user: ConversationUser

