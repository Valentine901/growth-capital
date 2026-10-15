from sqlalchemy.orm import Session 
from models.tables import Investment


class BaseInvestment:

    @staticmethod 
    def create(data: dict, db: Session):
        new_investment = Investment(**data)
        db.add(new_investment)
        db.commit()
        db.refresh(new_investment)
        return new_investment