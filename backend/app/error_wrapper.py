from fastapi import HTTPException, status

class BaseErrorException:

    @staticmethod
    def bad_request(detail: str = "Bad request"):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=detail)

    @staticmethod
    def unauthorized(detail: str = "Unauthorized access"):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=detail)

    @staticmethod
    def forbidden(detail: str = "Action forbidden"):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=detail)

    @staticmethod
    def not_found(detail: str = "Resource not found"):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=detail)

    @staticmethod
    def method_not_allowed(detail: str = "Method not allowed"):
        raise HTTPException(status_code=status.HTTP_405_METHOD_NOT_ALLOWED, detail=detail)

    @staticmethod
    def conflict(detail: str = "Resource conflict"):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=detail)

    @staticmethod
    def unprocessable_entity(detail: str = "Validation error or unprocessable data"):
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail=detail)

    @staticmethod
    def internal_server_error(detail: str = "An internal server error occurred"):
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=detail)
