from fastapi import Depends, APIRouter, Response, Request
from sqlalchemy.orm import Session
from datetime import datetime, timedelta 
from error_wrapper import BaseErrorException
from dependencies.security import BaseSecurity
from schemas.invest.user import CreateUserSchema
from settings.config import settings 
from dependencies.auth import BaseAuth
from schemas.invest import user
from crud.invest.user import BaseUser
from settings.database_engine import get_db
from typing import Annotated, List
from models.enums import UserRole
from models.tables import User 
import uuid 

router = APIRouter(tags=["User"])
DatabaseEngine = Annotated[Session, Depends(get_db)]
CurrentUser = Annotated[User, Depends(BaseAuth.get_current_user)]






