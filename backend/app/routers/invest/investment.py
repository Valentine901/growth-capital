from fastapi import Depends, APIRouter, status 
from sqlalchemy.orm import Session 
from crud.invest.transaction import BaseTransaction
from crud.invest.investment import BaseInvestment
from crud.invest.plan import BasePlan
from crud.invest.wallet import BaseWallet
from dependencies.auth import BaseAuth
from error_wrapper import BaseErrorException
from models.tables import User 
from schemas.invest.investments import * 
from schemas.invest.transaction import *
from typing import Annotated
from settings.database_engine import get_db 
from models.enums import TransactionStatus, TransactionType
from datetime import datetime, timezone, timedelta


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

    created_at = datetime.now(timezone.utc)
    next_profit_at = created_at + timedelta(minutes=2)
    expires_at = created_at + timedelta(days=7)

    investment_data = {"user_id": current_user.id, "amount": data.amount, "plan_id": data.plan_id, "created_at": created_at, "next_profit_at": next_profit_at, "expires_at": expires_at}

    investment_transac = BaseTransaction.create(data=data_dict, db=db)
    BaseInvestment.create(data=investment_data, db=db)
    return investment_transac

@router.get("/active-investments")
async def api_get_active_investments(current_user: CurrentUser, db: DatabaseEngine):
    investments = BaseInvestment.get_active_investments_by_id(user_id=current_user.id, db=db)
    for investment in investments:
        plan = BasePlan.get_plan(plan_id=investment.plan_id, db=db)
        return {
            "plan_name": plan.plan_name,
            "amount": investment.amount,
            "created_at": investment.created_at,
            "expires_at": investment.expires_at
        }