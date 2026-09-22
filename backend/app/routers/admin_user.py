from fastapi import Depends, APIRouter, Response, Request
from sqlalchemy.orm import Session
from datetime import datetime, timedelta 
from error_wrapper import BaseErrorException
from dependencies.security import BaseSecurity
from settings.config import settings 
from dependencies.auth import BaseAuth
from schemas import user
from crud.user import BaseUser
from settings.database_engine import get_db
from typing import Annotated, List
from models.enums import UserRole
from models.tables import User 
import uuid 

router = APIRouter(tags=["User"])
DatabaseEngine = Annotated[Session, Depends(get_db)]
CurrentUser = Annotated[User, Depends(BaseAuth.get_current_user)]







@router.get("/user/{user_id}", response_model=user.UserResponseSchema)
async def api_get_user(user_id: uuid.UUID, current_user: CurrentUser, db: DatabaseEngine):
    if current_user.role != UserRole.ADMIN:
        BaseErrorException.unauthorized("Unauthorized access, only admin can perform this action")
    user = BaseUser.get_user_by_id(user_id=user_id, db=db)
    if user is None:
        BaseErrorException.not_found("User not found")
    return user 

@router.delete("/delete/user/{user_id}")
async def api_delete_user(user_id: uuid.UUID, current_user: CurrentUser, db: DatabaseEngine):
    if current_user.role != UserRole.ADMIN:
        BaseErrorException.unauthorized("Unauthorized access, only admin can perform this action")
    user = BaseUser.get_user_by_id(user_id=user_id, db=db)
    if user is None:
        BaseErrorException.not_found("User not found")
    BaseUser.delete_user(user=user, db=db)
    return {"message": "User deleted successfully"}