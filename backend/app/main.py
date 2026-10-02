from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pathlib import Path 
# investment
from routers.invest.user import router as user_router

# tesla
from routers.tesla.tesla_user import router as tesla_user_router
from routers.tesla.vehicle import router as vehicle_router

app = FastAPI()

app.include_router(user_router)

# tesla router
app.include_router(tesla_user_router)
app.include_router(vehicle_router)

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

