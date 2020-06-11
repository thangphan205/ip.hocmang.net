from fastapi import APIRouter, Request
import subprocess

router = APIRouter()


@router.get("/")
def read_ip(request: Request):
    ip = request.client.host
    return {"ipv6": ip}


@router.get("/ping")
def ping(hostname: str, request: Request):
    ip = request.client.host
    result = subprocess.run(
        ["ping", hostname, "-6", "-c4"], stdout=subprocess.PIPE, universal_newlines=True
    )
    if result.returncode == 0:
        return {"ipv6": ip, "result": result.stdout}
    return {"ipv6": ip, "result": ""}


@router.get("/traceroute")
def traceroute(hostname: str, request: Request):
    ip = request.client.host
    result = subprocess.run(
        ["traceroute", hostname, "-6", "-n"],
        stdout=subprocess.PIPE,
        universal_newlines=True,
    )
    if result.returncode == 0:
        return {"ipv6": ip, "result": result.stdout}
    return {"ipv6": ip, "result": ""}
