from sqlalchemy.orm import Session 
from sqlalchemy import select
from models.tables import InvestmentPlan


class BasePlan:

    @staticmethod
    def create(data: dict, db: Session):
        new_plan = InvestmentPlan(**data)
        db.add(new_plan)
        db.commit()
        db.refresh(new_plan)
        return new_plan 

    @staticmethod 
    def get_plan(plan_id: int, db: Session):
        query = select(InvestmentPlan).where(InvestmentPlan.id == plan_id)
        result = db.execute(query)
        plan = result.scalar_one_or_none()
        return plan

    @staticmethod
    def get_plans(db: Session):
        query = select(InvestmentPlan)
        result = db.execute(query)
        plans = result.scalars().all()
        return plans
    
    @staticmethod 
    def delete_plan(plan, db: Session):
        db.delete(plan)
        db.commit()
        return True