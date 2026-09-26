from sqlalchemy import Float, Integer, String 
from settings.database_engine import Base 
from sqlalchemy.orm import Mapped, mapped_column


class Vehicle(Base):
    __tablename__ = "tesla_cars"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True, unique=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    desc: Mapped[str] = mapped_column(String, nullable=False)
    price: Mapped[float] = mapped_column(Float, nullable=False)
    image: Mapped[str] = mapped_column(String, nullable=False)


class ConfigureTesla(Base):
    __tablename__ = "tesla_configurators"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True, unique=True)
    model: Mapped[str] = mapped_column(String, nullable=False)
    interior_color: Mapped[str] = mapped_column(String, nullable=False)
    exterior_color: Mapped[str] = mapped_column(String, nullable=False)
    wheel: Mapped[str] = mapped_column(String, nullable=False)
    packages: Mapped[str] = mapped_column(String, nullable=False)
    estimated_total: Mapped[float] = mapped_column(Float, nullable=False)