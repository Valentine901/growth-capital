from fastapi import Depends, APIRouter, Response, Request
from sqlalchemy.orm import Session
from datetime import datetime, timedelta 
from error_wrapper import BaseErrorException
from dependencies.security import BaseSecurity
from settings.config import settings 
from dependencies.auth import BaseAuth
from schemas.user import CreateUserSchema, UserLoginSchema, UserResponseSchema 
from crud.user import BaseUser
from settings.database_engine import get_db
from typing import Annotated, List
from models.enums import UserRole
from models.tables import User 
import uuid 

router = APIRouter(tags=["User"])
DatabaseEngine = Annotated[Session, Depends(get_db)]
CurrentUser = Annotated[User, Depends(BaseAuth.get_current_user)]

@router.post("/create-user")
async def api_create_user(data: CreateUserSchema, response: Response, db: DatabaseEngine):
    data_dict = data.model_dump()
    user = BaseUser.get_user_by_email(email=data_dict["email"], db=db)
    if user:
        BaseErrorException.bad_request(detail="User already existed")

    data_dict["password"] =  BaseSecurity.hash_password(data_dict["password"])
    data_dict["is_admin"] = False 
    data_dict["is_user"] = True
    data_dict["role"] = UserRole.USER

    new_user = BaseUser.create_user(data=data_dict, db=db)

    access_token = BaseSecurity.create_token(data={"sub": str(new_user.id)}, expires_delta=timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES))
    refresh_token = BaseSecurity.create_token(data={"sub": str(new_user.id)}, expires_delta=timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS))

    response.set_cookie(key="access_token", value=str(access_token), max_age=60* settings.ACCESS_TOKEN_EXPIRE_MINUTES, httponly=True, secure=True, samesite="lax")
    response.set_cookie(key="refresh_token", value=str(refresh_token), max_age=60*60*24*settings.ACCESS_TOKEN_EXPIRE_MINUTES, httponly=True, secure=True, samesite="lax")

    return {"message": "Registered success"} 


@router.post("/user-login")
async def api_login_user(data: UserLoginSchema, response: Response, db: DatabaseEngine):
    user = BaseUser.get_user_by_email(email=data.email, db=db)
    if user is None:
        BaseErrorException.not_found("User does not exist")

    if not BaseSecurity.verify_password(data.password, user.password):
        BaseErrorException.bad_request("Incorrect user password")

    access_token = BaseSecurity.create_token(data={"sub": str(user.id)}, expires_delta=timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES))
    refresh_token = BaseSecurity.create_token(data={"sub": str(user.id)}, expires_delta=timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS))

    response.set_cookie(key="access_token", value=str(access_token), max_age=60* settings.ACCESS_TOKEN_EXPIRE_MINUTES, httponly=True, secure=True, samesite="lax")
    response.set_cookie(key="refresh_token", value=str(refresh_token), max_age=60*60*24*settings.ACCESS_TOKEN_EXPIRE_MINUTES, httponly=True, secure=True, samesite="lax")

    return {"message": "Login success"}
