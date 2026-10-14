from sqlalchemy import select 
from sqlalchemy.orm import Session 
from models.tables import Deposit

class BaseDeposit:

    @staticmethod 
    def create(data: dict , db: Session):
        new_deposit = Deposit(**data)
        db.add(new_deposit)
        db.commit()
        db.refresh(new_deposit)
        return new_deposit 

