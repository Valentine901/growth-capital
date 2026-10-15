from fastapi import Depends, APIRouter
from sqlalchemy.orm import Session 
from crud.invest.wallet import BaseWallet
from crud.invest.withdrawal import BaseWithDrawal
from crud.invest.transaction import BaseTransaction
from dependencies.auth import BaseAuth
from error_wrapper import BaseErrorException
from models.tables import User 
from schemas.invest.withdrawal import * 
from typing import Annotated, List
from settings.database_engine import get_db 



router = APIRouter(prefix="/withdrawals", tags=["Withdrawal"])

DatabaseEngine = Annotated[Session, Depends(get_db)]
CurrentUser = Annotated[User, Depends(BaseAuth.get_current_user)]

@router.post("/make-withdrawal", response_model=WithdrawalResponse)
async def make_withdrawal(data: CreateWithdrawalSchema, current_user: CurrentUser, db: DatabaseEngine):
    data_dict = data.model_dump()
    data_dict["user_id"] = current_user.id
    withdrawal = BaseWithDrawal.create(data=data_dict, db=db)
    wallet = BaseWallet.get_wallet(user_id=current_user.id, db=db)
    if wallet is None:
        BaseErrorException.not_found("Wallet not found")
    BaseWallet.decrement(amount=data.amount, wallet=wallet, db=db)
    return withdrawal

@router.get("/", response_model=List[WithdrawalResponse])
async def api_get_withdrawals(current_user: CurrentUser, db: DatabaseEngine):
    withdrawals = BaseWithDrawal.get_withdrawals(user_id=current_user.id, db=db)
    return withdrawals