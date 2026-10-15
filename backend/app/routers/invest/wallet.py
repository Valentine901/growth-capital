from fastapi import Depends, APIRouter, status 
from sqlalchemy.orm import Session 
from crud.invest.wallet import BaseWallet
from crud.invest.withdrawal import BaseWithDrawal
from dependencies.auth import BaseAuth
from error_wrapper import BaseErrorException
from models.tables import User 
from schemas.invest.wallet import * 
from typing import Annotated
from settings.database_engine import get_db 
import uuid 


router = APIRouter(prefix="/wallets", tags=["Wallet"])


DatabaseEngine = Annotated[Session, Depends(get_db)]
CurrentUser = Annotated[User, Depends(BaseAuth.get_current_user)]

@router.get("/user-wallet", response_model=WalletResponseSchema)
async def api_get_user_wallet(current_user: CurrentUser, db: DatabaseEngine):
    wallet = BaseWallet.get_wallet(user_id=current_user.id, db=db)
    if wallet is None:
        BaseErrorException.bad_request("User don't have wallet")
    return wallet 

@router.put("/increment-wallet")
async def increment_wallet(amount: float, current_user: CurrentUser, db: DatabaseEngine):
    if amount < 10.0:
        BaseErrorException.bad_request("Amount is less than 10.0")

    user_wallet = BaseWallet.get_wallet(user_id=current_user.id, db=db)
    if user_wallet is None:
        BaseErrorException.bad_request("User don't have wallet")

    updated_wallet = BaseWallet.increment(amount=amount, wallet=user_wallet, db=db)
    return {"data": {"wallet_id": updated_wallet.id, "balance": updated_wallet.balance}}

@router.put("/decrement-wallet")
async def decrement_wallet(amount: float, current_user: CurrentUser, db: DatabaseEngine):

    if amount < 10.0:
        BaseErrorException.bad_request("Amount is less than 10.0")

    user_wallet = BaseWallet.get_wallet(user_id=current_user.id, db=db)
    if user_wallet is None:
        BaseErrorException.bad_request("User don't have wallet")

    if amount > user_wallet.balance: #type: ignore
        BaseErrorException.bad_request("Insufficient funds")

    updated_wallet = BaseWallet.decrement(amount=amount, wallet=user_wallet, db=db)

    return {"data": {"wallet_id": updated_wallet.id, "balance": updated_wallet.balance}}