from sqlalchemy import String, Boolean, Text, ForeignKey, Integer, Float, DateTime, Enum, UUID, Index
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
    payment_status: Mapped[TransactionStatus] = mapped_column(Enum(TransactionStatus), nullable=False, default=TransactionStatus.PENDING)
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

def utcnow():
    return datetime.now(timezone.utc)

class Conversation(Base):
    __tablename__ = "conversations"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    # unique=True, one conversation per user
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), unique=True, index=True)
    # empty until admin replies
    admin_id: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("users.id", ondelete="SET NULL"), nullable=True, index=True)

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow())
    last_message_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow())

    messages: Mapped[List["Message"]] = relationship("Message", back_populates="conversation", cascade="all, delete-orphan", order_by="Message.created_at",)

    user: Mapped["User"] = relationship("User", foreign_keys=[user_id])



class Message(Base):
    __tablename__ = "messages"
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    conversation_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("conversations.id", ondelete="CASCADE"))
    sender_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"))
    content: Mapped[str] = mapped_column(Text)
    is_read: Mapped[bool] = mapped_column(Boolean, default=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow())
    conversation: Mapped["Conversation"] = relationship("Conversation", back_populates="messages")

# fast lookup for messages in this conversation, newest first
    __table_args__ = (Index("ix_messages_conversation_created", "conversation_id", "created_at"),)
