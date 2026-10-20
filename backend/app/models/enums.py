import enum

class UserRole(str, enum.Enum):
    ADMIN = "admin"
    USER = "user"


class TransactionStatus(str, enum.Enum):
    PENDING = "pending"
    COMPLETED = "completed"
    FAILED = "failed"
    CANCELLED = "cancelled"

class PaymentMethods(str, enum.Enum):
    BITCOIN = "bitcoin"
    ETHEREUM = "ethereum"
    BNB = "bnb"
    TRON = "tron"
    USDT = "usdt"

class TransactionType(str, enum.Enum):
    DEPOSIT = "deposit"
    INVESTMENT = "investment"
    PROFIT = "profit"
    WITHDRAWAL = "withdrawal"