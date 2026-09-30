from pydantic import BaseModel, EmailStr 
import uuid 

class CreateUserSchema(BaseModel):
    first_name: str 
    last_name: str
    email: str
    phone: str 
    password: str

class UserLoginSchema(BaseModel):
    email: str
    password: str 



class UserResponseSchema(BaseModel):
    id: uuid.UUID
    first_name: str 
    last_name: str
    email: str
    phone: str 

    class Config:
        from_attributes = True
    