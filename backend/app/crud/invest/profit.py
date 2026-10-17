from sqlalchemy.orm import Session 
from sqlalchemy import select 
from models.tables import Profit
import uuid 


class BaseProfit:

    @staticmethod
    def create(data: dict, db: Session):
        new_profit = Profit(**data)
        db.add(new_profit)
        db.commit()
        db.refresh(new_profit)
        return new_profit 

    @staticmethod 
    def get_profits(user_id: uuid.UUID, db: Session):
        query = select(Profit).where(Profit.user_id == user_id)
        statement = db.execute(query)
        result = statement.scalars().all()
        return result 