from sqlalchemy import select 
from sqlalchemy.orm import Session 
from models.tables import Wallet
import uuid 


class BaseWallet:

    @staticmethod 
    def create(data: dict, db: Session):
        wallet = Wallet(**data)
        db.add(wallet)
        db.commit()
        db.refresh(wallet)
        return wallet
    
    @staticmethod 
    def get_wallet(user_id: uuid.UUID, db: Session):
        query = select(Wallet).where(Wallet.user_id == user_id)
        stmt = db.execute(query)
        result = stmt.scalar_one_or_none()
        return result
    
    @staticmethod 
    def increment(amount: float, wallet, db: Session):
        wallet.balance += amount 
        db.commit()
        db.refresh(wallet)
        return wallet 
    
    @staticmethod 
    def decrement(amount: float, wallet, db: Session):
        wallet.balance -= amount 
        db.commit()
        db.refresh(wallet)
        return wallet 

