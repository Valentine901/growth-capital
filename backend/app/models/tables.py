from sqlalchemy import String, Boolean, Text, ForeignKey, Integer, Float, DateTime, Enum, UUID
from datetime import datetime, timezone
from sqlalchemy.orm import Mapped, mapped_column, relationship
from settings.database_engine import Base
import uuid 
from models.enums import UserRole, PaymentMethods
from typing import List


class User(Base):
    __tablename__ = "users"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4())
    first_name: Mapped[str] = mapped_column(String(50), nullable=False)
    last_name: Mapped[str] = mapped_column(String(50), nullable=False)
    email: Mapped[str] = mapped_column(String(50), nullable=False)
    phone: Mapped[str] = mapped_column(String(20), nullable=False)
    password: Mapped[str] = mapped_column(String(255), nullable=False)
    role: Mapped[UserRole] = mapped_column(Enum(UserRole), nullable=False, default=UserRole.USER)
    is_admin: Mapped[bool] = mapped_column(Boolean, default=False)
    is_user: Mapped[bool] = mapped_column(Boolean, default=True)

    profile: Mapped["Profile"] = relationship("Profile", back_populates="user", uselist=False)
    wallet: Mapped["Wallet"] = relationship("Wallet", back_populates="user", uselist=False)
    investments: Mapped[List["Investment"]] = relationship("Investment", back_populates="user")
    deposits: Mapped[List["Deposit"]] = relationship("Deposit", back_populates="user")
    withdrawals: Mapped[List["WithDrawal"]] = relationship("WithDrawal", back_populates="user")
    verification_codes: Mapped["VerificationToken"] = relationship("VerificationToken", back_populates="user")

class VerificationToken(Base):
    __tablename__ = "verification_tokens"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    token_code: Mapped[str] = mapped_column(String(6), nullable=False)
    expires_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    user: Mapped["User"] = relationship("User", back_populates="verification_codes")
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)

class Profile(Base):
    __tablename__ = "profiles"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4())
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"), unique=True, nullable=False)
    profile_picture: Mapped[str | None] = mapped_column(String(255), nullable=True)
    address: Mapped[str | None] = mapped_column(String(255), nullable=True)
    country: Mapped[str | None] = mapped_column(String(100), nullable=True)

    user: Mapped["User"] = relationship("User", back_populates="profile")


class Wallet(Base):
    __tablename__ = "wallets"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4())
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"), unique=True, nullable=False)
    balance: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)

    user: Mapped["User"] = relationship("User", back_populates="wallet")


class InvestmentPlan(Base):
    __tablename__ = "investment_plans"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4())
    min_amount: Mapped[float] = mapped_column(Float, nullable=False)
    max_amount: Mapped[float] = mapped_column(Float, nullable=False)
    duration: Mapped[int] = mapped_column(Integer, nullable=False)
    referral_bonus: Mapped[int] = mapped_column(Integer, nullable=False)

    investments: Mapped[List["Investment"]] = relationship("Investment", back_populates="plan")


class Investment(Base):
    __tablename__ = "investments"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4())
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    plan_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("investment_plans.id"), nullable=False)
    amount: Mapped[float] = mapped_column(Float, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=lambda: datetime.now(timezone.utc))

    user: Mapped["User"] = relationship("User", back_populates="investments")
    plan: Mapped["InvestmentPlan"] = relationship("InvestmentPlan", back_populates="investments")


class Deposit(Base):
    __tablename__ = "deposits"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4())
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    amount: Mapped[float] = mapped_column(Float, nullable=False)
    payment_method: Mapped[PaymentMethods] = mapped_column(Enum(PaymentMethods), nullable=False, default=PaymentMethods.BITCOIN)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=lambda: datetime.now(timezone.utc))

    user: Mapped["User"] = relationship("User", back_populates="deposits")


class WithDrawal(Base):
    __tablename__ = "withdrawals"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4())
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    amount: Mapped[float] = mapped_column(Float, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=lambda: datetime.now(timezone.utc))
    payment_method: Mapped[PaymentMethods] = mapped_column(Enum(PaymentMethods), nullable=False, default=PaymentMethods.BITCOIN)
    user: Mapped["User"] = relationship("User", back_populates="withdrawals")


class Message(Base):
    __tablename__ = "messages"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4())
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    email: Mapped[str] = mapped_column(String(100), nullable=False)
    message: Mapped[str] = mapped_column(Text, nullable=False)

