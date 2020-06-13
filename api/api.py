from fastapi import APIRouter, Request
import subprocess
from api import ipv4, ipv6

api_router = APIRouter()
api_router.include_router(ipv4.router, prefix="/ipv4", tags=["ipv4"])
api_router.include_router(ipv6.router, prefix="/ipv6", tags=["ipv6"])


@api_router.get("/")
def read_ip(request: Request):
    ip = request.client.host
    # return {
    #     "success": True,
    #     "message": "Get IP Public successfully.",
    #     "data": {"ip": ip,},
    # }
    return {"ip": ip}


@api_router.get("/ping")
def ping(hostname: str, request: Request):
    ip = request.client.host
    result = subprocess.run(
        ["ping", hostname, "-c4"], stdout=subprocess.PIPE, universal_newlines=True
    )
    if result.returncode == 0:
        return {
            "success": True,
            "message": "Ping successfully.",
            "data": {"ip": ip, "result": result.stdout.split("\n")},
        }
    return {
        "success": False,
        "message": "Ping Failed.",
        "data": {"ip": ip, "result": ""},
    }


@api_router.get("/traceroute")
def traceroute(hostname: str, request: Request):
    ip = request.client.host
    result = subprocess.run(
        ["traceroute", hostname, "-n"], stdout=subprocess.PIPE, universal_newlines=True,
    )
    if result.returncode == 0:
        return {
            "success": True,
            "message": "Ping successfully.",
            "data": {"ip": ip, "result": result.stdout.split("\n")},
        }
    return {
        "success": False,
        "message": "Ping Failed.",
        "data": {"ip": ip, "result": ""},
    }
