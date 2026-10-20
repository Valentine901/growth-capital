from sqlalchemy import select, exists, update 
from sqlalchemy.exc  import IntegrityError
from sqlalchemy.orm import Session, joinedload 
from models.tables import Conversation, Message 
from models.enums import UserRole
from error_wrapper import BaseErrorException
import uuid
from datetime import datetime, timezone 


def is_admin_user(user) -> bool:
    return user.role == UserRole.ADMIN or user.is_admin == True 

class BaseSupport:

    @staticmethod 
    def get_or_create_conversation(user_id: uuid.UUID, db: Session):
        query = select(Conversation).where(Conversation.user_id == user_id)
        conversation = db.execute(query).scalar_one_or_none()

        if conversation:
            return conversation 

        conversation = Conversation(user_id=user_id)
        db.add(conversation)
        try:
            db.commit()
        except IntegrityError:
            db.rollback()
            return db.execute(query).scalar_one()
        db.refresh(conversation)
        return conversation

    @staticmethod 
    def get_conversation_for_user(conversation_id: uuid.UUID, user, db: Session) -> Conversation:
        """The access check: returns the conversation only if this user may see it."""
        conversation = db.get(Conversation, conversation_id)
    
        if conversation is None:
            BaseErrorException.not_found("Conversation not found")
        if conversation.user_id != user.id and not is_admin_user(user):
            BaseErrorException.not_found("Conversation not found")
        return conversation

    @staticmethod 
    def user_can_access(conversation: Conversation | None, user) -> bool:
        if conversation is None:
            return False 
        return conversation.user_id == user.id or is_admin_user(user)

    @staticmethod 
    def get_messages(conversation_id: uuid.UUID, db: Session, limit: int = 50, before: datetime | None = None):
        query = select(Message).where(Message.conversation_id==conversation_id)

        if before is not None:
            query = query.where(Message.created_at < before)
        query = query.order_by(Message.created_at.desc()).limit(limit)

        rows = db.execute(query).scalars().all()
        return rows[::-1] # newest-first fetch, oldest-first display in desc order

    @staticmethod 
    def list_conversations(db: Session):
        # exists() check if at least one matching row exist
        has_messages = exists().where(Message.conversation_id == Conversation.id)

        # sort the conversation by the newest message or last message
        query = (
            select(Conversation)
            .options(joinedload(Conversation.user))
            .where(has_messages)
            .order_by(Conversation.last_message_at.desc())
        )

        return db.execute(query).scalars().all()

    @staticmethod 
    def mark_read(conversation:  Conversation, reader_id: uuid.UUID, db: Session):
        """mark messages sent by OTHER person as read"""

        stmt = (
            update(Message)
            .where(
                Message.conversation_id == conversation.id,
                Message.sender_id != reader_id,
                Message.is_read == False,
            ).values(is_read=True)
        )

        db.execute(stmt)
        db.commit()

    @staticmethod
    def create_message(conversation: Conversation, sender, content: str, db: Session):
        now = datetime.now(timezone.utc)
        message = Message(
            conversation_id=conversation.id,
            sender_id=sender.id,
            content=content,
            created_at=now,
        )
        conversation.last_message_at = now 

        """first admin to reply becomes the handler of this conversation"""
        if sender.id != conversation.user_id and conversation.admin_id is None:
            conversation.admin_id = sender.id

        db.add(message)
        db.commit()
        db.refresh(message)
        return message