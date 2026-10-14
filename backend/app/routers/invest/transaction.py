from fastapi import Depends, APIRouter, status 
from sqlalchemy.orm import Session 
from crud.invest.transaction import BaseTransaction
from crud.invest.deposit import BaseDeposit
from crud.invest.wallet import BaseWallet
from dependencies.auth import BaseAuth
from error_wrapper import BaseErrorException
from models.tables import User 
from models.enums import UserRole, TransactionStatus
from schemas.invest.deposit import * 
from schemas.invest.transaction import CreateTransaction, TransactionResponseSchema
from typing import Annotated, List
from settings.database_engine import get_db 
from settings.config import settings
import httpx, os 


router = APIRouter(prefix="/transactions", tags=["Transaction"])


DatabaseEngine = Annotated[Session, Depends(get_db)]
CurrentUser = Annotated[User, Depends(BaseAuth.get_current_user)]

@router.put("/update-transaction-status/{transaction_id}")
async def update_transaction_status(transaction_id: int, payment_status: TransactionStatus, current_user: CurrentUser, db: DatabaseEngine):
    if current_user.role != UserRole.ADMIN and current_user.is_admin == False:
        BaseErrorException.forbidden("Only admin can perform this action")

    transaction = BaseTransaction.get_transaction(transaction_id=transaction_id, db=db)
    if transaction is None:
        BaseErrorException.not_found("Transaction data not found")
    updated_transaction = BaseTransaction.update_user_transaction_status(transaction=transaction, payment_status=payment_status, db=db)
    
    if transaction.payment_status == TransactionStatus.COMPLETED:
        wallet = BaseWallet.get_wallet(user_id=updated_transaction.user_id, db=db)
        BaseWallet.increment(amount=float(updated_transaction.amount), wallet=wallet, db=db)
    return updated_transaction

@router.get("/user-transactions", response_model=List[TransactionResponseSchema])
async def api_get_user_transaction(current_user: CurrentUser, db: DatabaseEngine):
    transactions = BaseTransaction.get_transactions_by_user_id(user_id=current_user.id, db=db)
    return transactions

@router.get("/admin-view-user-transactions/{user_id}", response_model=List[TransactionResponseSchema])
async def api_admin_view_user_transaction(user_id: uuid.UUID, current_user: CurrentUser, db: DatabaseEngine):
    if current_user.role != UserRole.ADMIN and current_user.is_admin == False:
        BaseErrorException.forbidden("Only admin can perform this action")

    transactions = BaseTransaction.get_transactions_by_user_id(user_id=user_id, db=db)
    return transactions
    

@router.get("/", response_model=List[TransactionResponseSchema])
async def api_get_transactions(db: DatabaseEngine):
    transactions = BaseTransaction.get_transactions(db=db)
    return transactions