from pydantic import BaseModel 

class CreatePlanSchema(BaseModel):
    plan_name: str 
    min_amount: float
    max_amount: float
    duration: int
    referral_bonus: int
    daily_profit_percentage: int

class PlanResponseSchema(BaseModel):
    id: int
    plan_name: str 
    min_amount: float
    max_amount: float
    duration: int
    referral_bonus: int
    daily_profit_percentage: int

    class Config:
        from_attributes = True