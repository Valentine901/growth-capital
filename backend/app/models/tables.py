from sqlalchemy import String, Boolean, Text, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from settings.database_engine import Base 
from uuid import uuid4, UUID 

class User(Base):
    __tablename__ = "users"
    id: Mapped[str] = mapped_column(
        String(36),
        primary_key=True,
        default=lambda: str(uuid4())
    )
    first_name: Mapped[str] = mapped_column(String(50), nullable=False) 
    last_name: Mapped[str] = mapped_column(String(50), nullable=False) 
    email: Mapped[str] = mapped_column(String(50), nullable=False)
    password: Mapped[str] = mapped_column(String(255), nullable=False)