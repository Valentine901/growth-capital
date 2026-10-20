from datetime import datetime 
from sqlalchemy.orm import Session 
from fastapi import APIRouter, Query, Depends, WebSocket, WebSocketDisconnect 
from schemas.invest.message import *
from models.tables import User 
from settings.database_engine import get_db
from error_wrapper import BaseErrorException 
from crud.invest.support import BaseSupport, is_admin_user
from models.tables import Conversation
from dependencies.auth import BaseAuth 
from typing import Annotated, List 
from services.connection_manager import manager
import uuid 

router = APIRouter(prefix="/support", tags=["Support"])

CurrentUser = Annotated[User, Depends(BaseAuth.get_current_user)]
DatabaseEngine = Annotated[Session, Depends(get_db)]


@router.websocket("/ws/support/{conversation_id}")
async def support_ws(ws: WebSocket, conversation_id: uuid.UUID, db: DatabaseEngine, current_user: CurrentUser):
    conversation = db.get(Conversation, conversation_id)
    if not BaseSupport.user_can_access(conversation, current_user):
        await ws.close()
        return 
    await manager.connect(str(conversation_id), ws)
    
    try:
        while True:
            try:
                data = await ws.receive_json()
                payload = MessageCreate.model_validate(data)

            
            except ValueError:
                await ws.send_json({"error": "Invalid message"})
                continue 
                """except ValueError catches two different failures with one clause. Invalid JSON raises json.JSONDecodeError, and a failed Pydantic validation raises ValidationError, and both are subclasses of ValueError. We tell the client the message was bad and continue to wait for the next one, so one bad message doesn't kill the connection."""
            message = BaseSupport.create_message(conversation=conversation, sender=current_user, content=payload.content, db=db)

            await manager.broadcast(
                str(conversation_id),
                MessageResponse.model_validate(message).model_dump(mode="json"),
            )
    except WebSocketDisconnect:
        pass 
    finally:
        manager.disconnect(str(conversation_id), ws)


@router.get("/conversation", response_model=ConversationResponse)
async def api_get_my_conversation(current_user: CurrentUser, db: DatabaseEngine):
    return BaseSupport.get_or_create_conversation(user_id=current_user.id, db=db)

@router.get("/conversations/{conversation_id}/messages", response_model=List[MessageResponse])
async def api_get_messages(
    conversation_id: uuid.UUID,
    current_user: CurrentUser,
    db: DatabaseEngine,
    limit: int = Query(50, ge=1, le=1000),
    before: datetime | None = None,
):

    conversation = BaseSupport.get_conversation_for_user(conversation_id, current_user, db=db)
    return BaseSupport.get_messages(conversation_id=conversation.id, db=db, limit=limit, before=before)


@router.get("/admin/conversations", response_model=List[InboxItem])
async def api_admin_list_conversations(current_user: CurrentUser, db: DatabaseEngine):
    if not is_admin_user(current_user):
        BaseErrorException.forbidden("Only admin can perform this action")
    return BaseSupport.list_conversations(db)

@router.put("/conversation/{conversation_id}/read")
async def api_mark_read(conversation_id: uuid.UUID, current_user: CurrentUser, db: DatabaseEngine):
    conversation = BaseSupport.get_conversation_for_user(conversation_id=conversation_id, user=current_user, db=db)
    BaseSupport.mark_read(conversation=conversation, reader_id=current_user.id, db=db)
    return {"status": "ok"}