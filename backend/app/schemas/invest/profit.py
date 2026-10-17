from pydantic import BaseModel 
import uuid 
from datetime import datetime 


class CreateProfitSchema(BaseModel):
    investment_id: uuid.UUID
    total_amount: float 

class ProfitResponseSchema(BaseModel):
    id: int 
    user_id: uuid.UUID
    total_amount: float 
    investment_id: uuid.UUID
    created_at: datetime
    class Config:
        from_attributes = True