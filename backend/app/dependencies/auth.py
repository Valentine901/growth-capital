from fastapi import Request, HTTPException, status, Depends 
from settings.database_engine import get_db
from sqlalchemy.orm import Session
from sqlalchemy import select
from dependencies.security import BaseSecurity
from error_wrapper import BaseErrorException
from crud.user import BaseUser
from models.tables import VerificationToken
from datetime import timedelta, timezone, datetime
import uuid, random 

class BaseAuth:

    @staticmethod
    def generate_random_code() -> str:
        code = random.randint(100000, 999999)
        return str(code)

    @staticmethod 
    def create_credentials_reset_code(user_id: uuid.UUID, expires_at: timedelta, db: Session):
        code = BaseAuth.generate_random_code()
        expire = datetime.now(timezone.utc) + expires_at
        token_data = VerificationToken(token_code=code, expires_at=expire, user_id=user_id)
        db.add(token_data)
        db.commit()
        db.refresh(token_data)
        return token_data.token_code 

    @staticmethod
    def verify_credentials_reset_code(code: str, db: Session):
        query = select(VerificationToken).where(
            VerificationToken.token_code == code
        )
        
        result = db.execute(query)
        token_data = result.scalar_one_or_none()

        if not token_data:
            BaseErrorException.bad_request(detail="Invalid verification token")
        
        if token_data.token_code != code:
            BaseErrorException.bad_request(detail="Incorrect 6-digit verification code.")

        if datetime.now(timezone.utc) > token_data.expires_at:
            db.delete(token_data)
            db.commit()
            BaseErrorException.bad_request(detail="This code has expired. Please request a new one.")
        return token_data

    @staticmethod
    def get_current_user(request: Request, db: Session = Depends(get_db)):
        token = request.cookies.get("access_token")

        if not token or token is None:
            BaseErrorException.unauthorized(detail="Access token is missing")
        
        payload = BaseSecurity.decode_token(token)
        user_id_str = payload.get("sub")
        user_id = uuid.UUID(user_id_str)


        user = BaseUser.get_user_by_id(user_id=user_id, db=db)
        if user is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
        return user

    