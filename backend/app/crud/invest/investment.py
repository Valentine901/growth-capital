from sqlalchemy.orm import Session 
from models.tables import Investment
from sqlalchemy import select
import uuid 
from datetime import datetime, timezone

class BaseInvestment:

    @staticmethod 
    def create(data: dict, db: Session):
        new_investment = Investment(**data)
        db.add(new_investment)
        db.commit()
        db.refresh(new_investment)
        return new_investment

    @staticmethod
    def get_active_investments(db: Session):
        query = select(Investment).where(Investment.expires_at > datetime.now(timezone.utc))
        statement = db.execute(query)
        result = statement.scalars().all()
        return result

    @staticmethod
    def get_active_investments_by_id(user_id: uuid.UUID, db: Session):
        query = select(Investment).where((Investment.expires_at > datetime.now(timezone.utc)) and (Investment.user_id == user_id))
        statement = db.execute(query)
        result = statement.scalars().all()
        return result

    @staticmethod
    def get_investment(investment_id: uuid.UUID, db: Session):
        query = select(Investment).where(Investment.id == investment_id)
        statement = db.execute(query)
        result = statement.scalar_one_or_none()
        return result

