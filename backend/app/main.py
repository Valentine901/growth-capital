from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pathlib import Path 
# investment
from routers.invest.user import router as user_router
from routers.invest.plan import router as plan_router
from routers.invest.deposit import router as deposit_router
from routers.invest.transaction import router as transaction_router
from routers.invest.wallet import router as wallet_router
from routers.invest.withdrawal import router as withdrawal_router
from routers.invest.investment import router as invest_router
# tesla
from routers.tesla.tesla_user import router as tesla_user_router
from routers.tesla.test_drive import router as test_drive_router
from routers.tesla.configure import router as configure_router
from routers.tesla.support import router as support_router

app = FastAPI()

app.include_router(wallet_router)
app.include_router(deposit_router)
app.include_router(invest_router)
app.include_router(withdrawal_router)
app.include_router(transaction_router)
app.include_router(user_router)
app.include_router(plan_router)

# tesla router
app.include_router(tesla_user_router)
app.include_router(test_drive_router)
app.include_router(configure_router)
app.include_router(support_router)

@app.get("/")
async def get_data():
    return {"message": "Valentine welcome"}

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["http://localhost:5173", "http://localhost:5174", "http://localhost:3000"],
    allow_methods = ["*"],
    allow_credentials = True,
    allow_headers=["*"]
)

MEDIA_DIR = Path(__file__).parent / "media"

app.mount("/media", StaticFiles(directory=MEDIA_DIR), name="media")

