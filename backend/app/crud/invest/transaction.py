from sqlalchemy import select
from sqlalchemy.orm import Session 
from models.tables import Transaction
from models.enums import TransactionStatus, TransactionType
import uuid 

class BaseTransaction:

    @staticmethod
    def create(data: dict, db: Session):
        new_transac = Transaction(**data)
        db.add(new_transac)
        db.commit()
        db.refresh(new_transac)
        return new_transac

    @staticmethod 
    def get_transactions(db: Session):
        query = select(Transaction).order_by(Transaction.created_at)
        stmt = db.execute(query)
        result = stmt.scalars().all()
        return result[::-1]

    @staticmethod 
    def get_transactions_by_user_id(user_id: uuid.UUID, db: Session):
        query = select(Transaction).where(Transaction.user_id == user_id) 
        stmt = db.execute(query)
        result = stmt.scalars().all()
        return result

    @staticmethod 
    def get_transactions_by_owner(user_id: uuid.UUID, db: Session):
        query = select(Transaction).where(Transaction.user_id == user_id)
        stmt = db.execute(query)
        result = stmt.scalars().all()
        return result

    
    @staticmethod
    def get_transaction(transaction_id: int, db: Session):
        query = select(Transaction).where(Transaction.id == transaction_id)
        stmt = db.execute(query)
        result = stmt.scalar_one_or_none()
        return result 

    @staticmethod 
    def update_user_transaction_status(transaction, payment_status: TransactionStatus, db: Session):
        transaction.payment_status = payment_status
        db.commit()
        db.refresh(transaction)
        return transaction 

    @staticmethod 
    def get_transactions_by_type(user_id: uuid.UUID, db: Session):
        query = select(Transaction).where((Transaction.transaction_type == TransactionType.INVESTMENT) and (Transaction.user_id == user_id))
        statement = db.execute(query)
        result = statement.scalars().all()
        return result


