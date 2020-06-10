from fastapi import APIRouter

from api import get_ip


api_router = APIRouter()
api_router.include_router(get_ip.router, prefix="/get_ip", tags=["get_ip"])
