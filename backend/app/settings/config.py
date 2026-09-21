from pydantic_settings import BaseSettings, SettingsConfigDict
import os 
from dotenv import load_dotenv

load_dotenv()


class Settings(BaseSettings):
    APP_NAME: str 
    APP_ENV: str 
    DEBUG: bool 

    DATABASE_URL: str = os.getenv("DATABASE_URL") 
    JWT_SECRET_KEY: str = os.getenv("JWT_SECRET_KEY") 
    ALGORITHM: str = os.getenv("ALGORITHM")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES") )
    REFRESH_TOKEN_EXPIRE_DAYS: int = int(os.getenv("REFRESH_TOKEN_EXPIRE_DAYS"))



settings = Settings()
