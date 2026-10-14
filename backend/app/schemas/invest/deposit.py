from pydantic import BaseModel 
import uuid 
from models.enums import PaymentMethods


class CreateDepositSchema(BaseModel):
    amount: float 
    payment_method: PaymentMethods


class DepositResponseSchema(BaseModel):
    id: uuid.UUID 
    user_id: uuid.UUID
    amount: float 
    payment_method: str 
    generated_crypto_address: str 
    payment_status: str