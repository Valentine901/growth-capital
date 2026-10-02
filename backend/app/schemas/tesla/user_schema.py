from pydantic import BaseModel
import uuid 

class CreateUserSchema(BaseModel):
    email: str 
    password: str

class UserLoginSchema(BaseModel):
    email: str
    password: str

class UserResponseSchema(BaseModel):
    id: uuid.UUID
    email: str 
    class Config:
        from_attributes = True

