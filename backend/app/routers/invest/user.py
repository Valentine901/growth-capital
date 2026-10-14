from fastapi import Depends, APIRouter, Response, Request
from sqlalchemy.orm import Session
from datetime import datetime, timedelta, timezone 
from error_wrapper import BaseErrorException
from dependencies.security import BaseSecurity
from settings.config import settings 
from dependencies.auth import BaseAuth
from schemas.invest.user import CreateUserSchema, UserLoginSchema, UserResponseSchema 
from crud.invest.wallet import BaseWallet
from crud.invest.user import BaseUser
from settings.database_engine import get_db
from typing import Annotated, List
from models.enums import UserRole
from models.tables import User 
import uuid 

router = APIRouter(prefix="/investment", tags=["User"])
DatabaseEngine = Annotated[Session, Depends(get_db)]
CurrentUser = Annotated[User, Depends(BaseAuth.get_current_user)]


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

@router.post("/user-register", response_model=UserResponseSchema)
async def api_create_user(data: CreateUserSchema, response: Response, db: DatabaseEngine):
    data_dict = data.model_dump()
    user = BaseUser.get_user_by_email(email=data_dict["email"], db=db)
    if user:
        BaseErrorException.bad_request(detail="Email account already existed")

    data_dict["password"] =  BaseSecurity.hash_password(data_dict["password"])
    data_dict["is_admin"] = False 
    data_dict["is_user"] = True
    data_dict["role"] = UserRole.USER

    new_user = BaseUser.create_user(data=data_dict, db=db)

    new_wallet = {
        "user_id": new_user.id,
        "balance": 0.0
    }

    # create user wallet
    BaseWallet.create(new_wallet, db=db)

    access_token = BaseSecurity.create_token(data={"sub": str(new_user.id)}, expires_delta=timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES))
    refresh_token = BaseSecurity.create_token(data={"sub": str(new_user.id)}, expires_delta=timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS))

    response.set_cookie(key="access_token", value=str(access_token), max_age=60* settings.ACCESS_TOKEN_EXPIRE_MINUTES, httponly=True, secure=True, samesite="lax")
    response.set_cookie(key="refresh_token", value=str(refresh_token), max_age=60*60*24*settings.ACCESS_TOKEN_EXPIRE_MINUTES, httponly=True, secure=True, samesite="lax")

    return new_user


@router.post("/user-login", response_model=UserResponseSchema)
async def api_login_user(data: UserLoginSchema, response: Response, db: DatabaseEngine):
    user = BaseUser.get_user_by_email(email=data.email, db=db)
    if user is None:
        BaseErrorException.not_found("Email account not registered")

    if not BaseSecurity.verify_password(data.password, user.password): #type: ignore
        BaseErrorException.bad_request("Incorrect user password")

    access_token = BaseSecurity.create_token(data={"sub": str(user.id)}, expires_delta=timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)) #type: ignore
    refresh_token = BaseSecurity.create_token(data={"sub": str(user.id)}, expires_delta=timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)) #type: ignore

    response.set_cookie(key="access_token", value=str(access_token), max_age=60* settings.ACCESS_TOKEN_EXPIRE_MINUTES, httponly=True, secure=True, samesite="lax")
    response.set_cookie(key="refresh_token", value=str(refresh_token), max_age=60*60*24*settings.ACCESS_TOKEN_EXPIRE_MINUTES, httponly=True, secure=True, samesite="lax")

    return user








# ADMIN SECTION LOGIC 
@router.post("/create-admin", response_model=UserResponseSchema)
async def api_create_admin(data: CreateUserSchema, response: Response, db: DatabaseEngine):
    data_dict = data.model_dump()
    user = BaseUser.get_user_by_email(email=data_dict["email"], db=db)
    if user:
        BaseErrorException.bad_request(detail="Admin already existed")

    data_dict["password"] =  BaseSecurity.hash_password(data_dict["password"])
    data_dict["is_admin"] = True
    data_dict["is_user"] = True
    data_dict["role"] = UserRole.ADMIN

    new_user = BaseUser.create_user(data=data_dict, db=db)

    access_token = BaseSecurity.create_token(data={"sub": str(new_user.id)}, expires_delta=timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES))
    refresh_token = BaseSecurity.create_token(data={"sub": str(new_user.id)}, expires_delta=timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS))

    response.set_cookie(key="access_token", value=str(access_token), max_age=60* settings.ACCESS_TOKEN_EXPIRE_MINUTES, httponly=True, secure=True, samesite="lax")
    response.set_cookie(key="refresh_token", value=str(refresh_token), max_age=60*60*24*settings.ACCESS_TOKEN_EXPIRE_MINUTES, httponly=True, secure=True, samesite="lax")

    return new_user


@router.get("/user/{user_id}", response_model=UserResponseSchema)
async def api_get_user(user_id: uuid.UUID, current_user: CurrentUser, db: DatabaseEngine):
    if current_user.role != UserRole.ADMIN:
        BaseErrorException.forbidden("Unauthorized access, only admin can perform this action")
    user = BaseUser.get_user_by_id(user_id=user_id, db=db)
    if user is None:
        BaseErrorException.not_found("User not found")
    return user 

@router.delete("/delete/user/{user_id}")
async def api_delete_user(user_id: uuid.UUID, current_user: CurrentUser, db: DatabaseEngine):
    if current_user.role != UserRole.ADMIN:
        BaseErrorException.forbidden("Unauthorized access, only admin can perform this action")
    user = BaseUser.get_user_by_id(user_id=user_id, db=db)
    if user is None:
        BaseErrorException.not_found("User not found")
    BaseUser.delete_user(user=user, db=db) #type: ignore
    return {"message": "User deleted successfully"}


@router.get("/users", response_model=List[UserResponseSchema])
async def admin_get_users(db: DatabaseEngine, current_user: CurrentUser):
    if current_user.role != UserRole.ADMIN:
        BaseErrorException.forbidden("Unauthorized access, only admin can perform this action")
    users = BaseUser.get_users(db=db)
    return users