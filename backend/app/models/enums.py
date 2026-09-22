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
    PAYEE = "payee"
    TRON = "tron"
    USDT = "usdt"
    USDTTRC = "usdttrc"

class TransactionType(str, enum.Enum):
    DEPOSIT = "deposit"
    WITHDRAWAL = "withdrawal"
    INVESTMENT = "investment"
    PROFIT = "profit"
    CAPITAL_RETURN = "capital_return"
    REFERRAL_BONUS = "referral_bonus"