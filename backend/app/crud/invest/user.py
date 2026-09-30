from sqlalchemy.orm import Session 
from sqlalchemy import select 
from models.tables import User 
import uuid 


class BaseUser:

    @staticmethod
    def get_user_by_id(user_id: uuid.UUID, db: Session):
        query = select(User).where(User.id == user_id)
        result = db.execute(query)
        user = result.scalar_one_or_none()
        return user 


    @staticmethod
    def get_user_by_email(email: str, db: Session):
        query = select(User).where(User.email == email)
        result = db.execute(query)
        user = result.scalar_one_or_none()
        return user 

    @staticmethod
    def create_user(data: dict, db: Session) -> User:
        user = User(**data)
        db.add(user)
        db.commit()
        db.refresh(user)
        return user
    
    @staticmethod
    def delete_user(user: User, db: Session):
        db.delete(user)
        db.commit()
        return None