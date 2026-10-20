from apscheduler.schedulers.asyncio import AsyncIOScheduler
import asyncio
from datetime import datetime, timezone, timedelta
from crud.invest.investment import BaseInvestment
from crud.invest.plan import BasePlan
from dependencies.auth import BaseAuth
from models.tables import User
from crud.invest.profit import BaseProfit
from settings.database_engine import get_db 
from fastapi import Depends
from sqlalchemy.orm import Session
from settings.database_engine import SessionLocal
from datetime import timezone, datetime, timedelta
import logging


scheduler = AsyncIOScheduler()

# apscheduler is for performing some background task that requires time count down and it offers asynchronous operation 
# It has four main components which are 
# Scheduler: it is the timer that determines when a function runs
# Function/Job: it is the actual task to be execute or run
# Trigger: It triggers the action
# Scheduler Lifecycle: it starts when application start and got shutdown when application shuts

def check_investment():
    db = SessionLocal()
    try:
        investments = BaseInvestment.get_active_investments(db=db)
        for investment in investments:
            if investment.next_profit_at <= datetime.now(timezone.utc):
                plan = BasePlan.get_plan(plan_id=investment.plan_id, db=db)
                amount_earned = (plan.daily_profit_percentage * investment.amount) / 100 #type:ignore
                profit_data = {"total_amount": amount_earned, "user_id": investment.user_id, "investment_id": investment.id}
                BaseProfit.create(data=profit_data, db=db)
                investment.next_profit_at += timedelta(minutes=2)
                db.commit()
                
    except Exception:
        db.rollback()
        logging.exception("Failed to check investment")
    finally:
        db.close()

    # add background task to run
scheduler.add_job(check_investment, trigger="interval", seconds=60, id="investment_checker")