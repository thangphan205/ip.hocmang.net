from fastapi import APIRouter, Request

router = APIRouter()


@router.get("/")
def read_dia_diem(request: Request):
    ip = request.client.host
    return {"ip": ip}
