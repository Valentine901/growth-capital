from pydantic import BaseModel
import uuid 

class CreateWalletSchema(BaseModel):
    user_id: uuid.UUID 
    amount: float 

class WalletResponseSchema(BaseModel):
    id: uuid.UUID 
    user_id: uuid.UUID
    balance: float 