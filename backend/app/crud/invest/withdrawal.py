from sqlalchemy import select 
from sqlalchemy.orm import Session 
from models.tables import WithDrawal
import uuid 

class BaseWithDrawal:

    @staticmethod 
    def create(data: dict , db: Session):
        new_withdrawal = WithDrawal(**data)
        db.add(new_withdrawal)
        db.commit()
        db.refresh(new_withdrawal)
        return new_withdrawal 
    
    @staticmethod 
    def get_withdrawals(user_id: uuid.UUID, db: Session):
        query = select(WithDrawal).where(WithDrawal.user_id == user_id)
        stmt = db.execute(query)
        result = stmt.scalars().all()
        return result[::-1]

