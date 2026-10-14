from pydantic import BaseModel 
import uuid 

class CreateTransaction(BaseModel):
    plan_id: int 
    deposit_id: uuid.UUID
    user_id: uuid.UUID
    amount: float
    payment_status: str 
    transaction_type: str 

class UpdateTransaction(BaseModel):
    payment_status: str 
    transaction_type: str 

class TransactionResponseSchema(BaseModel):
    id: int 
    plan_id: int
    user_id: uuid.UUID
    amount: float
    deposit_id: uuid.UUID
    payment_status: str 
    transaction_type: str 


 