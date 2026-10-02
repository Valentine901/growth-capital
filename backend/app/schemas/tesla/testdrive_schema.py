from pydantic import BaseModel 
from datetime import datetime 
import uuid

class BookingCreate(BaseModel):
    full_name: str
    email_address: str 
    phone: str
    preferred_date: datetime
    preferred_time: datetime 
    vehicle_model: str
    crypto_currency: str
    preferred_location: str 
    zip_code: str 
    estimated_total: float
    user_id: uuid.UUID


class BookingResponse(BaseModel):
    id: int 
    user_id: uuid.UUID 
    full_name: str 
    email_address: str 
    vehicle_model: str
    zip_code: str 
    payment_status: str 
    estimated_total: float
    generated_crypto_address: str
    exact_crypto_amount: float
    crypto_ticker: str

    class Config:
        from_attributes = True
