from fastapi import Depends, APIRouter
from sqlalchemy.orm import Session 
from crud.invest.wallet import BaseWallet
from crud.invest.withdrawal import BaseWithDrawal
from crud.invest.transaction import BaseTransaction
from dependencies.auth import BaseAuth
from error_wrapper import BaseErrorException
from models.tables import User 
from models.enums import UserRole
from schemas.invest.withdrawal import * 
from typing import Annotated, List
from settings.database_engine import get_db 
from models.enums import TransactionStatus



router = APIRouter(prefix="/withdrawals", tags=["Withdrawal"])

DatabaseEngine = Annotated[Session, Depends(get_db)]
CurrentUser = Annotated[User, Depends(BaseAuth.get_current_user)]

@router.post("/make-withdrawal", response_model=WithdrawalResponse)
async def make_withdrawal(data: CreateWithdrawalSchema, current_user: CurrentUser, db: DatabaseEngine):
    data_dict = data.model_dump()
    data_dict["user_id"] = current_user.id
    data_dict["payment_status"] = TransactionStatus.PENDING
    withdrawal = BaseWithDrawal.create(data=data_dict, db=db)
    # wallet = BaseWallet.get_wallet(user_id=current_user.id, db=db)
    # if wallet is None:
    #     BaseErrorException.not_found("Wallet not found")
    # BaseWallet.decrement(amount=data.amount, wallet=wallet, db=db)
    return withdrawal

@router.put("/update-withdrawal-status/{withdrawal_id}")
async def api_update_withdrawal(withdrawal_id: uuid.UUID, payment_status: TransactionStatus, current_user: CurrentUser, db: DatabaseEngine):
    if current_user.role != UserRole.ADMIN and current_user.is_admin == False:
        BaseErrorException.forbidden("Only admin can perform this action")

    data = BaseWithDrawal.get_withdrawal_by_id(withdrawal_id=withdrawal_id, db=db)
    print("-----finding withdrawal------")
    if data is None:
        print("-------withdrawal not found--------")
        BaseErrorException.not_found("Transaction not found")

    previous_status = data.payment_status

    # nothing to do if the status isn't changing
    if previous_status == payment_status:
        return data

    # don't allow moving a completed withdrawal to another status
    if previous_status == TransactionStatus.COMPLETED:
        BaseErrorException.bad_request("Withdrawal already completed")
        
    updated_data = BaseWithDrawal.update(data=data, payment_status=payment_status, db=db)
    if not updated_data:
        BaseErrorException.internal_server_error("Failed to updated transaction status")

    if updated_data.payment_status == TransactionStatus.COMPLETED:
        wallet = BaseWallet.get_wallet(user_id=updated_data.user_id, db=db)
        if wallet is None:
            BaseErrorException.not_found("Wallet not found")
        BaseWallet.decrement(amount=float(updated_data.amount), wallet=wallet, db=db)
    return updated_data

@router.get("/get-withdrawal/{withdrawal_id}", response_model=WithdrawalResponse)
async def get_withdrawal(withdrawal_id: uuid.UUID, db: DatabaseEngine):
    data = BaseWithDrawal.get_withdrawal_by_id(withdrawal_id=withdrawal_id, db=db) 
    if data is None:
        BaseErrorException.not_found("Withdrawal not found")
    return data


@router.get("/completed", response_model=List[WithdrawalResponse])
async def api_get_withdrawals_completed(current_user: CurrentUser, db: DatabaseEngine):
    withdrawals = BaseWithDrawal.get_withdrawals_completed(user_id=current_user.id, db=db)
    return withdrawals

@router.get("/", response_model=List[WithdrawalResponse])
async def api_get_withdrawals(current_user: CurrentUser, db: DatabaseEngine):
    withdrawals = BaseWithDrawal.get_withdrawals(user_id=current_user.id, db=db)
    return withdrawals

@router.get("/admin-view-user-withdrawals/{user_id}", response_model=List[WithdrawalResponse])
async def api_get_admin_user_Withdrawals(user_id: uuid.UUID, current_user: CurrentUser, db: DatabaseEngine):
    if current_user.role != UserRole.ADMIN and current_user.is_admin == False:
        BaseErrorException.forbidden("Only admin can perform this action")
    withdrawals = BaseWithDrawal.get_withdrawals(user_id=user_id, db=db)
    return withdrawals