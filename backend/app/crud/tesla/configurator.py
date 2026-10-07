from sqlalchemy.orm import Session 
from models.tesla_table import ConfigureTesla


class BaseConfigurator:

    @staticmethod
    def configure(data: dict, db: Session):
        new_configure = ConfigureTesla(**data)
        db.add(new_configure)
        db.commit()
        db.refresh(new_configure)
        return new_configure
