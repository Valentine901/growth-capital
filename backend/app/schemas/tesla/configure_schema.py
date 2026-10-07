from pydantic import BaseModel 
from models.tesla_enums import PaymentMethod
import uuid

class CreateConfigure(BaseModel):
    model: str 
    interior_color: str 
    exterior_color: str
    wheel: str
    estimated_total: float
    packages: str
    crypto_currency: str =  PaymentMethod.BITCOIN

