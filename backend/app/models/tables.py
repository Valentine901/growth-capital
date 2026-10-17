from sqlalchemy import String, Boolean, Text, ForeignKey, Integer, Float, DateTime, Enum, UUID
from datetime import datetime, timezone
from sqlalchemy.orm import Mapped, mapped_column, relationship
from settings.database_engine import Base
import uuid 
from models.enums import UserRole, PaymentMethods, TransactionStatus, TransactionType
from typing import List


class User(Base):
    __tablename__ = "users"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    first_name: Mapped[str] = mapped_column(String(50), nullable=False)
    last_name: Mapped[str] = mapped_column(String(50), nullable=False)
    email: Mapped[str] = mapped_column(String(50), nullable=False)
    phone: Mapped[str] = mapped_column(String(20), nullable=False)
    password: Mapped[str] = mapped_column(String(255), nullable=False)
    role: Mapped[UserRole] = mapped_column(Enum(UserRole), nullable=False, default=UserRole.USER)
    is_admin: Mapped[bool] = mapped_column(Boolean, default=False)
    is_user: Mapped[bool] = mapped_column(Boolean, default=True)

    wallet: Mapped["Wallet"] = relationship("Wallet", back_populates="user", uselist=False)
    transactions: Mapped[List["Transaction"]] = relationship("Transaction", back_populates="user")
    deposits: Mapped[List["Deposit"]] = relationship("Deposit", back_populates="user")
    investments: Mapped[List["Investment"]] = relationship("Investment", back_populates="user")
    withdrawals: Mapped[List["WithDrawal"]] = relationship("WithDrawal", back_populates="user")
    profits: Mapped[List["Profit"]] = relationship("Profit", back_populates="user")
    verification_codes: Mapped["VerificationToken"] = relationship("VerificationToken", back_populates="user")

class VerificationToken(Base):
    __tablename__ = "verification_tokens"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    token_code: Mapped[str] = mapped_column(String(6), nullable=False)
    expires_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    user: Mapped["User"] = relationship("User", back_populates="verification_codes")
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)



class Wallet(Base):
    __tablename__ = "wallets"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"), unique=True, nullable=False)
    balance: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)

    user: Mapped["User"] = relationship("User", back_populates="wallet")


class InvestmentPlan(Base):
    __tablename__ = "investment_plans"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    plan_name: Mapped[str] = mapped_column(String, nullable=False)
    min_amount: Mapped[int] = mapped_column(Integer, nullable=False)
    max_amount: Mapped[int] = mapped_column(Integer, nullable=False)
    duration: Mapped[int] = mapped_column(Integer, nullable=False)
    daily_profit_percentage: Mapped[int] = mapped_column(Integer, default=0.0, nullable=False)
    referral_bonus: Mapped[int] = mapped_column(Integer, nullable=False)

    transactions: Mapped[List["Transaction"]] = relationship("Transaction", back_populates="plan")
    investments: Mapped[List["Investment"]] = relationship("Investment", back_populates="plan")

class Deposit(Base):
    __tablename__ = "deposits"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    amount: Mapped[float] = mapped_column(Float, nullable=False)
    payment_method: Mapped[PaymentMethods] = mapped_column(Enum(PaymentMethods), nullable=False, default=PaymentMethods.BITCOIN)
    generated_crypto_address: Mapped[str] = mapped_column(String)
    payment_status: Mapped[TransactionStatus] = mapped_column(Enum(TransactionStatus), nullable=False, default=TransactionStatus.PENDING)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=lambda: datetime.now(timezone.utc))
    user: Mapped["User"] = relationship("User", back_populates="deposits")

class Transaction(Base):
    __tablename__ = "transactions"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    plan_id: Mapped[int] = mapped_column(Integer, ForeignKey("investment_plans.id"), nullable=False)
    amount: Mapped[float] = mapped_column(Float, nullable=False)
    transaction_type: Mapped[TransactionType] = mapped_column(Enum(TransactionType), default=TransactionType.INVESTMENT, nullable=False)
    payment_status: Mapped[TransactionStatus] = mapped_column(Enum(TransactionStatus), nullable=False, default=TransactionStatus.PENDING)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    user: Mapped["User"] = relationship("User", back_populates="transactions")
    plan: Mapped["InvestmentPlan"] = relationship("InvestmentPlan", back_populates="transactions")



class WithDrawal(Base):
    __tablename__ = "withdrawals"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    amount: Mapped[float] = mapped_column(Float, nullable=False)
    payment_method: Mapped[PaymentMethods] = mapped_column(Enum(PaymentMethods), nullable=False, default=PaymentMethods.BITCOIN)
    crypto_withdrawal_address: Mapped[str] = mapped_column(String, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    user: Mapped["User"] = relationship("User", back_populates="withdrawals")


class Investment(Base):
    __tablename__ = "investments"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    plan_id: Mapped[int] = mapped_column(Integer, ForeignKey("investment_plans.id"), nullable=False)
    amount: Mapped[float] = mapped_column(Float, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    next_profit_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    expires_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    user: Mapped["User"] = relationship("User", back_populates="investments")
    plan: Mapped["InvestmentPlan"] = relationship("InvestmentPlan", back_populates="investments")
    profits: Mapped[List["Profit"]] = relationship("Profit", back_populates="investment")



class Profit(Base):
    __tablename__ = "profits"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    total_amount: Mapped[float] = mapped_column(Float, nullable=False)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    investment_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("investments.id"), nullable=False)
    user: Mapped["User"] = relationship("User", back_populates="profits")
    investment: Mapped["Investment"] = relationship("Investment", back_populates="profits")
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

class Message(Base):
    __tablename__ = "messages"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    email: Mapped[str] = mapped_column(String(100), nullable=False)
    message: Mapped[str] = mapped_column(Text, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

