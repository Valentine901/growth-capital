from sqlalchemy.orm import Session 
from models.tesla_table import TeslaMessage
from sqlalchemy import select 

class BaseSupport:

    @staticmethod
    def create_support(data_dict: dict, db: Session):
        new_support = TeslaMessage(**data_dict)
        db.add(new_support)
        db.commit()
        db.refresh(new_support)
        return new_support 

    @staticmethod
    def get_messages(db: Session):
        query = select(TeslaMessage)
        result = db.execute(query)
        messages = result.scalars().all()
        return messages

