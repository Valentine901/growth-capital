from pydantic import BaseModel 
from datetime import datetime

class CreateInvestment(BaseModel):
    amount: float 
    plan_id: int

class InvestmentResponse(BaseModel):
    id: int
    plan_id: int 
    amount: float
    created_at: datetime
    expires_at: datetime



 