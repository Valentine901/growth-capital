from fastapi import Depends, APIRouter, status 
from sqlalchemy.orm import Session 
from crud.invest.transaction import BaseTransaction
from crud.invest.deposit import BaseDeposit
from dependencies.auth import BaseAuth
from error_wrapper import BaseErrorException
from models.tables import User 
from schemas.invest.deposit import * 
from schemas.invest.transaction import CreateTransaction
from typing import Annotated
from settings.database_engine import get_db 
from settings.config import settings
from models.enums import TransactionStatus, PaymentMethods, TransactionType
import httpx, os 


router = APIRouter(prefix="/deposits", tags=["Deposit"])

NOWPAYMENTS_API_KEY = settings.NOWPAYMENTS_API_KEY
NOWPAYMENTS_URL = settings.NOWPAYMENTS_URL

DatabaseEngine = Annotated[Session, Depends(get_db)]
CurrentUser = Annotated[User, Depends(BaseAuth.get_current_user)]

@router.post("/make-deposit")
async def api_make_deposit(plan_id: int, data: CreateDepositSchema, current_user: CurrentUser, db: DatabaseEngine):
    headers = {
        "x-api-key": NOWPAYMENTS_API_KEY,
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Accept": "application/json, text/plain, */*",
        "Accept-Language": "en-US,en;q=0.9",
        "Connection": "keep-alive",
        "Cache-Control": "no-cache",
    }

    crypto_mapping = {PaymentMethods.BITCOIN: "btc", PaymentMethods.TRON: "trx", PaymentMethods.BNB: "bnb", PaymentMethods.ETHEREUM: "eth"}
    crypto_ticker = crypto_mapping.get(data.payment_method, "btc")

    nowpayments_payload = {
        "price_amount" : data.amount, 
        "price_currency": "usd",
        "pay_currency": crypto_ticker
    }

    response = None 
    payment_data = None

    async with httpx.AsyncClient() as client:
        try:
            # print("step 1")
            response = await client.post(NOWPAYMENTS_URL, json=nowpayments_payload, headers=headers)
        except httpx.HTTPError:
            # Catching network errors exclusively
            BaseErrorException.internal_server_error("Crypto payment gateway unreachable.")
   
        if response is None:
            BaseErrorException.internal_server_error("Crypto payment gateway did not return a response.")
            return
        # print(response.text)
        if response.status_code != 201:
            BaseErrorException.bad_request("Crypto gateway address generation failed.")
            
        try:
            # print("step 1")
            payment_data = response.json()
        except ValueError:
            BaseErrorException.bad_request("Failed to parse gateway data")
   
        generated_address = payment_data.get("pay_address") #type: ignore
        exact_crypto_amount = payment_data.get("pay_amount") #type: ignore

    data_dict = data.model_dump()
    data_dict["amount"] = float(data.amount) 
    data_dict["generated_crypto_address"] = generated_address
    data_dict["payment_status"] = TransactionStatus.PENDING  
    data_dict["user_id"] = current_user.id
    
    new_deposit = BaseDeposit.create(data=data_dict, db=db)
    
    transac_data = CreateTransaction(**{
        "plan_id": plan_id, 
        "user_id": current_user.id,
        "amount": float(data.amount),
        "payment_status": TransactionStatus.PENDING,
        "transaction_type": TransactionType.DEPOSIT
    })

    new_transaction = BaseTransaction.create(data=transac_data.model_dump(), db=db)


    return {
        "id": new_transaction.id,
        "user_id": new_transaction.user_id, 
        "crypto_address": generated_address,
        "crypto_amount": exact_crypto_amount,
        "payment_method" : new_deposit.payment_method,
        "payment_status" : new_transaction.payment_status,
        "transaction_type": TransactionType.DEPOSIT
    }
