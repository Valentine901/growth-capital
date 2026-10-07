from pydantic import BaseModel 


class CreateSupport(BaseModel):
    full_name: str 
    email: str 
    phone: str 
    content: str

class SupportResponse(BaseModel):
    id: int
    full_name: str 
    email: str 
    phone: str 
    content: str