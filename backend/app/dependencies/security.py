from passlib.context import CryptContext
from datetime import timedelta, datetime, timezone
from error_wrapper import BaseErrorException    
import jwt

from settings.config import settings

crypt_context = CryptContext(schemes=["argon2"], deprecated="auto")

class BaseSecurity:


    @staticmethod
    def hash_password(password: str) -> str:
        return crypt_context.hash(password)
    
    @staticmethod
    def verify_password(plain_password: str, hashed_password: str) -> bool:
        return crypt_context.verify(plain_password, hashed_password)

    @staticmethod
    def create_token(data: dict, expires_delta: timedelta):
        to_encode = data.copy()
        expire = datetime.now(timezone.utc) + expires_delta

        to_encode.update({"exp": expire})
        # payload = {"sub": "user_id", "exp": expire}

        encoded_jwt = jwt.encode(to_encode, settings.JWT_SECRET_KEY, algorithm=settings.ALGORITHM)
        return encoded_jwt

    @staticmethod
    def decode_token(token: str):
        try:
            payload = jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=[settings.ALGORITHM])
            # payload = {"sub": "user_id", "exp": expire}
            return payload
        except jwt.ExpiredSignatureError:
            BaseErrorException.unauthorized(detail="Token has expired")
        except jwt.InvalidTokenError:
            BaseErrorException.unauthorized(detail="Invalid token")