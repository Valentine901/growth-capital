from sqlalchemy.orm import Session 
from sqlalchemy import select
from models.tesla_table import Vehicle

class BaseVehicle:

    @staticmethod 
    def create_vehicle(data: dict, db: Session):
        new_vehicle = Vehicle(**data)
        db.add(new_vehicle)
        db.commit()
        db.refresh(new_vehicle)
        return new_vehicle 
    
    @staticmethod
    def get_vehicle(vehicle_id: int, db: Session):
        query = select(Vehicle).where(Vehicle.id == vehicle_id)
        result = db.execute(query)
        vehicle = result.scalar_one_or_none()
        return vehicle 

    @staticmethod
    def get_vehicles(db: Session):
        query = select(Vehicle)
        result = db.execute(query)
        vehicles = result.scalars().all()
        return vehicles

    @staticmethod 
    def delete_vehicle(data: Vehicle, db: Session):
        db.delete(data)
        db.commit()
        return None
