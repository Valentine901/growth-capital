from sqlalchemy.orm import Session
from fastapi import Depends, APIRouter, status, Request, Response
from dependencies.auth import BaseAuth 
from dependencies.security import BaseSecurity
from error_wrapper import BaseErrorException
from models.enums import UserRole
from settings.database_engine import get_db 
from settings.config import settings 
from typing import Annotated
from models.tesla_table import TeslaUser
from datetime import datetime, timedelta, timezone
from crud.tesla.tesla_user import BaseTeslaUser
from schemas.tesla.user_schema import UserLoginSchema, UserResponseSchema, CreateUserSchema
import uuid

router = APIRouter(prefix="/tesla-user", tags=["TeslaUser"])

CurrentUser = Annotated[TeslaUser, Depends(BaseAuth.get_tesla_current_user)]
DatabaseEngine = Annotated[Session, Depends(get_db)]


@router.get("/me", response_model=UserResponseSchema)
async def get_logged_in_user(current_user: CurrentUser):
    return current_user

@router.get("/refresh-token")
async def api_refresh_token(request: Request, response: Response):
    token = request.cookies.get("refresh_token")
    if token is None:
        BaseErrorException.not_found("Refresh token found.")
    payload = BaseSecurity.decode_token(token=token) #type:ignore

    # convert the Unix time: 17774646474 to datetime 
    expiration_time = datetime.fromtimestamp(payload["exp"], tz=timezone.utc) #type:ignore
    if expiration_time > datetime.now(timezone.utc):
        # convert user_id back to uuid type 
        user_id = uuid.UUID(payload.get("sub")) #type:ignore

        new_access_token = BaseSecurity.create_token(data={"sub": str(user_id)}, expires_delta=timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES))

        response.set_cookie(key="access_token", value=str(new_access_token), max_age=60* settings.ACCESS_TOKEN_EXPIRE_MINUTES, httponly=True, secure=True, samesite="lax")
        return {"message":"Token refreshed successfully"}

@router.post("/user-register")
async def api_create_user(data: CreateUserSchema, response: Response, db: DatabaseEngine):
    data_dict = data.model_dump()

    email_clean = data_dict["email"].strip().lower()
    data_dict["email"] = email_clean

    user = BaseTeslaUser.get_user_by_email(email=email_clean, db=db)
    
    if user is not None:
        BaseErrorException.bad_request(detail="Email already existed")

    data_dict["password"] =  BaseSecurity.hash_password(data_dict["password"])

    new_user = BaseTeslaUser.create_user(data=data_dict, db=db)

    access_token = BaseSecurity.create_token(data={"sub": str(new_user.id)}, expires_delta=timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES))
    refresh_token = BaseSecurity.create_token(data={"sub": str(new_user.id)}, expires_delta=timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS))

    response.set_cookie(key="access_token", value=str(access_token), max_age=60* settings.ACCESS_TOKEN_EXPIRE_MINUTES, httponly=True, secure=True, samesite="lax")
    response.set_cookie(key="refresh_token", value=str(refresh_token), max_age=60*60*24*settings.ACCESS_TOKEN_EXPIRE_MINUTES, httponly=True, secure=True, samesite="lax")

    return {"message": "Registered success"} 


@router.post("/user-login")
async def api_login_user(data: UserLoginSchema, response: Response, db: DatabaseEngine):
    user = BaseTeslaUser.get_user_by_email(email=data.email, db=db)
    if user is None:
        BaseErrorException.not_found("The credentials provided do not match our records")

    if not BaseSecurity.verify_password(data.password, user.password): #type: ignore
        BaseErrorException.bad_request("Incorrect user password")

    access_token = BaseSecurity.create_token(data={"sub": str(user.id)}, expires_delta=timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)) #type: ignore
    refresh_token = BaseSecurity.create_token(data={"sub": str(user.id)}, expires_delta=timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)) #type: ignore

    response.set_cookie(key="access_token", value=str(access_token), max_age=60* settings.ACCESS_TOKEN_EXPIRE_MINUTES, httponly=True, secure=True, samesite="lax")
    response.set_cookie(key="refresh_token", value=str(refresh_token), max_age=60*60*24*settings.ACCESS_TOKEN_EXPIRE_MINUTES, httponly=True, secure=True, samesite="lax")

    return {"message": "Login success"}