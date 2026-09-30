from uuid import UUID
from pydantic import BaseModel, ConfigDict


class VehicleBase(BaseModel):
    name: str 
    desc: str 
    price: float
    image: str
    model: str
    user_id: UUID



class VehicleCreate(VehicleBase):
    user_id: UUID


class VehicleResponse(VehicleBase):
    id: int
    user_id: UUID

    model_config = ConfigDict(from_attributes=True)
