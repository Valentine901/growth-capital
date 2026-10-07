from sqlalchemy.orm import Session
from fastapi import Depends, APIRouter
from dependencies.auth import BaseAuth 
from error_wrapper import BaseErrorException
from settings.database_engine import get_db 
from settings.config import settings 
from typing import Annotated
from models.tesla_table import TeslaUser
from schemas.tesla.configure_schema import CreateConfigure
from models.tesla_enums import PaymentStatus
from settings.config import settings
from crud.tesla.configurator import BaseConfigurator
import httpx


NOWPAYMENTS_API_KEY = settings.NOWPAYMENTS_API_KEY
NOWPAYMENTS_URL = settings.NOWPAYMENTS_URL 

router = APIRouter(prefix="/configure", tags=["TeslaConfigure"])

CurrentUser = Annotated[TeslaUser, Depends(BaseAuth.get_tesla_current_user)]
DatabaseEngine = Annotated[Session, Depends(get_db)]

@router.post("/configure-car")
async def configure_car(data: CreateConfigure, db: DatabaseEngine, current_user: CurrentUser):

    headers = {
        "x-api-key": NOWPAYMENTS_API_KEY,
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Accept": "application/json, text/plain, */*",
        "Accept-Language": "en-US,en;q=0.9",
        "Connection": "keep-alive",
        "Cache-Control": "no-cache",
    }

    crypto_mapping = {"Bitcoin": "btc", "Tron": "trx", "bnb": "bnb", "Ethereum": "eth"}
    crypto_ticker = crypto_mapping.get(data.crypto_currency, "btc")

    nowpayments_payload = {
        "price_amount" : data.estimated_total, 
        "price_currency": "usd",
        "pay_currency": crypto_ticker,
        "order_description": f"Test Drive for {data.model}"
    }

    response = None 
    payment_data = None

    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(NOWPAYMENTS_URL, json=nowpayments_payload, headers=headers)
        except httpx.HTTPError:
            BaseErrorException.internal_server_error("Crypto payment gateway unreachable.")
    
    if response is None:
        BaseErrorException.internal_server_error("Crypto payment gateway did not return a response.")
        return 

    if response.status_code != 201:
        BaseErrorException.bad_request("Crypto gateway address generation failed.")

    try:
        payment_data = response.json()
    except ValueError:
        BaseErrorException.bad_request("Failed to parse gateway data")

    generated_address = payment_data.get("pay_address")
    exact_crypto_amount = payment_data.get("pay_amount")

    db_data = data.model_dump()
    db_data["estimated_total"] = data.estimated_total
    db_data["crypto_address"] = generated_address 
    db_data["payment_status"] = PaymentStatus.PENDING
    db_data["user_id"] = current_user.id

    new_config = BaseConfigurator.configure(data=db_data, db=db)

    return {
           "vehicle_model": new_config.model,
            "payment_status": new_config.payment_status.value,
            "estimated_total": new_config.estimated_total,
            "generated_crypto_address": generated_address,
            "exact_crypto_amount": exact_crypto_amount,
            "crypto_ticker": crypto_ticker.upper()
    }