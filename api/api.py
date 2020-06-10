from fastapi import APIRouter, Request

api_router = APIRouter()


@api_router.get("/")
def read_ip(request: Request):
    ip = request.client.host
    return {"ipv4": ip}
