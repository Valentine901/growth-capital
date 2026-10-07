from sqlalchemy.orm import Session 
from fastapi import Depends, APIRouter
from crud.tesla.suport import BaseSupport
from settings.database_engine import get_db 
from schemas.tesla.support_schema import CreateSupport, SupportResponse
from typing import Annotated, List


router = APIRouter(prefix="/support", tags=["Support"])

DatabaseEngine = Annotated[Session, Depends(get_db)]


@router.post("/send-message")
async def send_message(data: CreateSupport, db: DatabaseEngine):
    message = BaseSupport.create_support(data_dict=data.model_dump(), db=db)
    return message

@router.get("/messages", response_model=List[SupportResponse])
async def api_get_messages(db: DatabaseEngine):
    messages = BaseSupport.get_messages(db=db)
    return messages