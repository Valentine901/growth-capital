from fastapi import Depends, APIRouter, Response, status, UploadFile, File, Form
from sqlalchemy.orm import Session
from error_wrapper import BaseErrorException
from typing import Annotated, List
from dependencies.auth import BaseAuth
from models.tables import User 
from settings.database_engine import get_db
from schemas.tesla.vehicle_schema import VehicleCreate, VehicleResponse
from crud.tesla.vehicle import BaseVehicle
from models.enums import UserRole
from models.tesla_enums import CarModelEnum
import os, shutil, uuid
import json

os.makedirs("media/vehicle", exist_ok=True)
CurrentUser = Annotated[User, Depends(BaseAuth.get_current_user)]
DatabaseEngine = Annotated[Session, Depends(get_db)]

router = APIRouter(prefix="/vehicles", tags=["Vehicle"])

@router.post("/create-vehicle", response_model=VehicleResponse, status_code=status.HTTP_201_CREATED)
async def api_create_vehicle(
    current_user: CurrentUser, 
    db: DatabaseEngine, 
    name: str = Form(...), 
    desc: str = Form(...),
    price: float = Form(...),
    image: UploadFile = File(...)
):
    if current_user.role != UserRole.ADMIN:
        BaseErrorException.unauthorized("Only admin can perform this action")

    file_ext = image.filename.split(".")[-1]
    unique_name = f"{current_user.id}_{uuid.uuid4().hex}.{file_ext}"
    path = f"media/vehicle/{unique_name}"

    with open(path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)

    vehicle = VehicleCreate(
        name=name,
        desc=desc,
        price=price,
        image=path,
        model=CarModelEnum.TESLA_NEURALINK_GT,
        user_id=current_user.id
    )
    data_dict = vehicle.model_dump()
    
    new_vehicle = BaseVehicle.create_vehicle(data=data_dict, db=db)
    return new_vehicle

@router.get("/", response_model=List[VehicleResponse])
async def api_get_all_vehicles(db: DatabaseEngine):
    vehicles = BaseVehicle.get_vehicles(db=db)
    return vehicles

@router.get("/{vehicle_id}", response_model=VehicleResponse)
async def api_get_vehicle_by_id(vehicle_id: int, db: DatabaseEngine):
    vehicle = BaseVehicle.get_vehicle(vehicle_id=vehicle_id, db=db)
    if not vehicle:
        BaseErrorException.not_found("Vehicle not found")
    return vehicle

@router.delete("/{vehicle_id}", status_code=status.HTTP_204_NO_CONTENT)
async def api_delete_vehicle(vehicle_id: int, current_user: CurrentUser, db: DatabaseEngine):
    if current_user.role != UserRole.ADMIN:
        BaseErrorException.unauthorized("Only admin can perform this action")
    
    vehicle = BaseVehicle.get_vehicle(vehicle_id=vehicle_id, db=db)
    if not vehicle:
        BaseErrorException.not_found("Vehicle not found")
        
    if vehicle.image and os.path.exists(vehicle.image):
        try:
            os.remove(vehicle.image)
        except Exception:
            pass

    BaseVehicle.delete_vehicle(data=vehicle, db=db)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
