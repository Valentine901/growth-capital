from fastapi import Response, Depends, APIRouter
from dependencies.auth import BaseAuth 
from crud.tesla.test_drive import BaseTestDrive
from error_wrapper import BaseErrorException
from models.tesla_table import TeslaUser
from settings.database_engine import get_db 
from settings.config import settings 
from typing import Annotated, List 
from models.tesla_enum import PaymentStatus
from sqlalchemy.orm import Session 
from schema.tesla.testdrive_schema import BookingCreate, BookingResponse 
import httpx

NOWPAYMENTS_API_KEY = settings.NOWPAYMENTS_API_KEY
NOWPAYMENTS_URL = settings.NOWPAYMENTS_URL

router = APIRouter(prefix='/test-drive', tags=["TestDrive"])
CurrentUser = Annotated[TeslaUser, Depends(BaseAuth.get_tesla_current_user)]
DatabaseEngine = Annotated[Session, Depends(get_db)]


@router.post("/book", response_model=BookingResponse)
async def book_test_drive(booking_in: BookingCreate, current_user: CurrentUser, db: DatabaseEngine):

    headers = {
        "x-api-key": NOWPAYMENTS_API_KEY,
        "Content-Type": "application/json"
    }

  
    crypto_ticker = "btc"
    if booking_in.crypto_currency == "Bitcoin": crypto_ticker = "btc"
    elif booking_in.crypto_currency == "Tron": crypto_ticker = "trx"
    elif booking_in.crypto_currency == "bnb": crypto_ticker = "bnb"
    elif booking_in.crypto_currency == "Ethereum": crypto_ticker = "eth"

    nowpayments_payload = {
        "price_amount" : booking_in.estimated_total, 
        "price_currency": "usd",
        "pay_currency": crypto_ticker,
        "order_description": f"Test Drive for {booking_in.vehicle_model}"
    }

    
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(NOWPAYMENTS_URL, json=nowpayments_payload, headers=headers)
            if response.status_code != 201:
                BaseErrorException.bad_request("Crypto gateway address generation failed.")
            
            payment_data = response.json()
        except Exception:
            BaseErrorException.internal_server_error("Crypto payment gateway unreachable.")

    generated_address = payment_data.get("pay_address")
    exact_crypto_amount = payment_data.get("pay_amount")

    db_data = booking_in.model_dump()

 
    db_data["estimated_total"] = booking_in.estimated_total
    db_data["crypto_address"] = generated_address 
    db_data["payment_status"] = PaymentStatus.PENDING
    db_data["user_id"] = current_user.id

    new_booking = BaseTestDrive.create_testdrive(data=db_data, db=db)

    return {
        "id": new_booking.id,
        "user_id": new_booking.user_id,
        "full_name": new_booking.full_name,
        "email_address": new_booking.email_address,
        "vehicle_model": new_booking.vehicle_model,
        "zip_code": new_booking.zip_code,
        "payment_status": new_booking.payment_status.value,
        "estimated_total": new_booking.estimated_total,
        "generated_crypto_address": generated_address,
        "exact_crypto_amount": exact_crypto_amount,
        "crypto_ticker": crypto_ticker.upper() 
    }
