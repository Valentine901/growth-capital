from sqlalchemy.orm import Session 
from sqlalchemy import select 
from models.tesla_table import ConfigureTesla


class BaseConfigurator:

    @staticmethod
    def configure(data: dict, db: Session):
        new_configure = ConfigureTesla(**data)
        db.add(new_configure)
        db.commit()
        db.refresh(new_configure)
        return new_configure

    @staticmethod 
    def get_configure(data_id: int, db: Session):
        query = select(ConfigureTesla).where(ConfigureTesla.id == data_id)
        result = db.execute(query)
        configure = result.scalar_one_or_none()
        return configure 

    @staticmethod
    def get_configures(db: Session):
        query = select(ConfigureTesla)
        result = db.execute(query)
        configures = result.scalars().all()
        return configures 

    @staticmethod
    def delete_configure(data: ConfigureTesla, db: Session):
        db.delete(data)
        db.commit()
        return None 