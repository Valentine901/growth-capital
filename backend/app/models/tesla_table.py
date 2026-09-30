from sqlalchemy import Float, Integer, String, Enum, DateTime, func, ForeignKey 
from settings.database_engine import Base 
from sqlalchemy.orm import Mapped, mapped_column, relationship
from models.tesla_enums import CarModelEnum, InteriorColorEnum, ExteriorColorEnum, PackagesEnum, WheelsEnum, PaymentMethod
from datetime import datetime
from typing import TYPE_CHECKING
import uuid

if TYPE_CHECKING:
    from models.tables import User 


class Vehicle(Base):
    __tablename__ = "tesla_cars"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True, unique=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    desc: Mapped[str] = mapped_column(String, nullable=False)
    price: Mapped[float] = mapped_column(Float, nullable=False)
    image: Mapped[str] = mapped_column(String, nullable=False)
    model: Mapped[CarModelEnum] = mapped_column(Enum(CarModelEnum), default=CarModelEnum.TESLA_NEURALINK_GT)
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id"))
    user: Mapped["User"] = relationship("User", back_populates="vehicles")


class ConfigureTesla(Base):
    __tablename__ = "tesla_configurators"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True, unique=True)
    model: Mapped[CarModelEnum] = mapped_column(Enum(CarModelEnum), default=CarModelEnum.TESLA_NEURALINK_V1, nullable=False)
    interior_color: Mapped[InteriorColorEnum] = mapped_column(Enum(InteriorColorEnum), default=InteriorColorEnum.ALL_BLACK, nullable=False)
    exterior_color: Mapped[ExteriorColorEnum] = mapped_column(Enum(ExteriorColorEnum), default=ExteriorColorEnum.DEEP_BLUE_METALLIC, nullable=False)
    wheel: Mapped[WheelsEnum] = mapped_column(Enum(WheelsEnum), default=WheelsEnum.AERO_19 ,nullable=False)
    packages: Mapped[PackagesEnum] = mapped_column(Enum(PackagesEnum), default=PackagesEnum.COLD_WEATHER ,nullable=False)
    estimated_total: Mapped[float] = mapped_column(Float, nullable=False)
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id"))
    user: Mapped["User"] = relationship("User", back_populates="configurators")


class TestDrive(Base):
    __tablename__ = "test_drives"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True, unique=True)
    full_name: Mapped[str] = mapped_column(String, nullable=False)
    email_address: Mapped[str] = mapped_column(String, nullable=False)
    phone: Mapped[str] = mapped_column(String, nullable=False)
    vehicle_model: Mapped[CarModelEnum] = mapped_column(Enum(CarModelEnum), default=CarModelEnum.TESLA_NEURALINK_V1, nullable=False)
    preferred_date: Mapped[datetime] = mapped_column(DateTime, server_default=func.now(), nullable=False)
    preferred_time: Mapped[datetime] = mapped_column(DateTime, nullable=False)
    preferred_location: Mapped[str] = mapped_column(String, nullable=False)
    additional_notes: Mapped[str] = mapped_column(String, nullable=False)
    estimated_total: Mapped[float] = mapped_column(Float, nullable=False)
    payment_method: Mapped[PaymentMethod] = mapped_column(Enum(PaymentMethod), default=PaymentMethod.TRANSFER, nullable=False)
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id"))
    user: Mapped["User"] = relationship("User", back_populates="test_drives")
