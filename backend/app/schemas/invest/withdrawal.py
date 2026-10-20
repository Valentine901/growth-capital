from pydantic import BaseModel 
from models.enums import PaymentMethods, TransactionStatus
import uuid
from datetime import datetime 


class CreateWithdrawalSchema(BaseModel):
    amount: float 
    crypto_withdrawal_address: str
    payment_method: PaymentMethods

class WithdrawalResponse(BaseModel):
    id: uuid.UUID
    created_at: datetime
    user_id: uuid.UUID
    amount: float 
    payment_method: PaymentMethods
    payment_status: TransactionStatus

    class Config:
        from_attributes = True