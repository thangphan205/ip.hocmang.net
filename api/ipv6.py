from fastapi import APIRouter, Request
import subprocess

router = APIRouter()


@router.get("/")
def read_ip(request: Request):
    ip = request.client.host
    return {"ip": ip}


@router.get("/ping")
def ping(hostname: str, request: Request):
    ip = request.client.host
    result = subprocess.run(
        ["ping", hostname, "-6", "-c4"], stdout=subprocess.PIPE, universal_newlines=True
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


@router.get("/traceroute")
def traceroute(hostname: str, request: Request):
    ip = request.client.host
    result = subprocess.run(
        ["traceroute", hostname, "-6", "-n"],
        stdout=subprocess.PIPE,
        universal_newlines=True,
    )
    if result.returncode == 0:
        return {
            "success": True,
            "message": "Traceroute successfully.",
            "data": {"ip": ip, "result": result.stdout.split("\n")},
        }
    return {
        "success": False,
        "message": "Traceroute Failed.",
        "data": {"ip": ip, "result": ""},
    }
