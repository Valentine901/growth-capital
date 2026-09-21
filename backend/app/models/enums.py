from sqlalchemy import Enum 

class UserRole(str, Enum):
    ADMIN = "admin"
    ORDINARY_USER = "ordinary_user"