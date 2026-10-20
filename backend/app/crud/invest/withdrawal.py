from sqlalchemy import select 
from sqlalchemy.orm import Session 
from models.enums import TransactionStatus
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
    def get_withdrawals_completed(user_id: uuid.UUID, db: Session):
        query = select(WithDrawal).where(WithDrawal.user_id == user_id, WithDrawal.payment_status == TransactionStatus.COMPLETED)
        stmt = db.execute(query)
        result = stmt.scalars().all()
        return result[::-1]
    
    @staticmethod 
    def get_withdrawals(user_id: uuid.UUID, db: Session):
        query = select(WithDrawal).where(WithDrawal.user_id == user_id)
        stmt = db.execute(query)
        result = stmt.scalars().all()
        return result[::-1]

    @staticmethod 
    def get_withdrawal_by_id(withdrawal_id: uuid.UUID, db: Session):
        query = select(WithDrawal).where(WithDrawal.id == withdrawal_id)
        stmt = db.execute(query)
        result = stmt.scalar_one_or_none()
        return result

    @staticmethod 
    def update(data, payment_status: TransactionStatus, db: Session):
        data.payment_status = payment_status.COMPLETED
        db.commit()
        db.refresh(data)
        return data
    

