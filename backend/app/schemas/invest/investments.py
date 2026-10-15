from pydantic import BaseModel 
from datetime import datetime
import uuid 

class CreateTransaction(BaseModel):
    plan_id: int 
    deposit_id: uuid.UUID
    user_id: uuid.UUID
    amount: float
    payment_status: str 
    transaction_type: str 

class CreateInvestment(BaseModel):
    amount: float 
    plan_id: int


class UpdateTransaction(BaseModel):
    payment_status: str 
    transaction_type: str 

class TransactionResponseSchema(BaseModel):
    id: int 
    plan_id: int
    user_id: uuid.UUID
    amount: float
    payment_status: str 
    transaction_type: str 
    created_at: datetime

    class Config:
        from_attributes = True


 