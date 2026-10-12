from fastapi import Depends, APIRouter
from sqlalchemy.orm import Session
from error_wrapper import BaseErrorException
from dependencies.auth import BaseAuth
from schemas.invest.plan import CreatePlanSchema, PlanResponseSchema
from crud.invest.plan import BasePlan
from settings.database_engine import get_db
from typing import Annotated, List
from models.enums import UserRole
from models.tables import User 


router = APIRouter(prefix="/plans", tags=["Plan"])
DatabaseEngine = Annotated[Session, Depends(get_db)]
CurrentUser = Annotated[User, Depends(BaseAuth.get_current_user)]

@router.post("/create-plan", response_model=PlanResponseSchema)
async def api_create_plan(data: CreatePlanSchema, db: DatabaseEngine, current_user: CurrentUser):
    if current_user.role != UserRole.ADMIN:
        BaseErrorException.forbidden("Only admin can perform this action")

    data_dict = data.model_dump()
    new_plan = BasePlan.create(data=data_dict, db=db)
    return new_plan

@router.delete("/delete-plan/{plan_id}", status_code=204)
async def api_delete_plan(plan_id: int, db: DatabaseEngine, current_user: CurrentUser):
    if current_user.role != UserRole.ADMIN:
        BaseErrorException.forbidden("Only admin can perform this action")

    plan = BasePlan.get_plan(plan_id=plan_id, db=db)
    if not plan:
        BaseErrorException.not_found("Plan not found")

    BasePlan.delete_plan(plan=plan, db=db)
    return {"message" : "Plan deleted successfully"}


@router.get("/", response_model=List[PlanResponseSchema])
async def api_plans(db: DatabaseEngine):
    plans = BasePlan.get_plans(db=db)
    return plans