from fastapi import Depends, APIRouter
from sqlalchemy.orm import Session 
from crud.invest.profit import BaseProfit
from dependencies.auth import BaseAuth
from models.tables import User 
from schemas.invest.profit import ProfitResponseSchema
from typing import Annotated, List
from settings.database_engine import get_db 



router = APIRouter(prefix="/profits", tags=["Profit"])

DatabaseEngine = Annotated[Session, Depends(get_db)]
CurrentUser = Annotated[User, Depends(BaseAuth.get_current_user)]

@router.get("/", response_model=List[ProfitResponseSchema])
async def api_get_user_profits(current_user: CurrentUser, db: DatabaseEngine):
    profits = BaseProfit.get_profits(user_id=current_user.id, db=db)
    return profits

