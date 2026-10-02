from sqlalchemy.orm import Session
from models.tesla_table import TeslaUser
import uuid 
from sqlalchemy import select

class BaseTeslaUser:
    @staticmethod
    def create_user(data: dict, db: Session) -> TeslaUser:
        user = TeslaUser(**data)
        db.add(user)
        db.commit()
        db.refresh(user)
        return user 
    
    @staticmethod
    def get_user(user_id: uuid.UUID, db: Session):
        query = select(TeslaUser).where(TeslaUser.id == user_id)
        result = db.execute(query)
        user = result.scalar_one_or_none()
        return user 
    
    @staticmethod
    def get_user_by_email(email: str, db: Session):
        query = select(TeslaUser).where(TeslaUser.email == email)
        result = db.execute(query)
        user = result.scalar_one_or_none()
        return user 