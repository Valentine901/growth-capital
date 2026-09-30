from sqlalchemy import select 
from sqlalchemy.orm import Session 
from models.tesla_table import TestDrive
import uuid 


class BaseTestDrive:

    @staticmethod
    def create_testdrive(data: dict, db: Session):
        new_testdrive = TestDrive(**data)
        db.add(new_testdrive)
        db.commit()
        db.refresh(new_testdrive)
        return new_testdrive 
    
    @staticmethod
    def get_testdrive(data_id: int, db: Session):
        query = select(TestDrive).where(TestDrive.id == data_id)
        result = db.execute(query)
        testdrive = result.scalar_one_or_none()
        return testdrive

    @staticmethod
    def get_testdrives(db: Session):
        query = select(TestDrive)
        result = db.execute(query)
        testdrives = result.scalars().all()
        return testdrives

    @staticmethod
    def delete_testdrive(data: TestDrive, db: Session):
        db.delete(data)
        db.commit()
        return None