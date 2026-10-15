from fastapi import Depends, APIRouter, status 
from sqlalchemy.orm import Session 
from crud.invest.transaction import BaseTransaction
from crud.invest.investment import BaseInvestment
from crud.invest.wallet import BaseWallet
from dependencies.auth import BaseAuth
from error_wrapper import BaseErrorException
from models.tables import User 
from schemas.invest.investments import * 
from schemas.invest.transaction import CreateTransaction
from typing import Annotated
from settings.database_engine import get_db 
from settings.config import settings
from models.enums import TransactionStatus, PaymentMethods, TransactionType



router = APIRouter(prefix="/investments", tags=["Investment"])

DatabaseEngine = Annotated[Session, Depends(get_db)]
CurrentUser = Annotated[User, Depends(BaseAuth.get_current_user)]

@router.post("/invest", response_model=TransactionResponseSchema)
async def create_investment(data: CreateInvestment, current_user: CurrentUser, db: DatabaseEngine):
    data_dict = data.model_dump()
    data_dict["user_id"] = current_user.id
    data_dict["payment_status"] = TransactionStatus.COMPLETED
    data_dict["transaction_type"] = TransactionType.INVESTMENT

    wallet = BaseWallet.get_wallet(user_id=current_user.id, db=db)
    if wallet is None:
        BaseErrorException.not_found("User don't have wallet")

    BaseWallet.decrement(amount=data.amount, wallet=wallet, db=db)

    investment_data = {"user_id": current_user.id, "amount": data.amount}

    investment_transac = BaseTransaction.create(data=data_dict, db=db)
    BaseInvestment.create(data=investment_data, db=db)
    return investment_transac