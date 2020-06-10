import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.api import api_router
from settings import settings


app = FastAPI(title="ip.hocmang.net", openapi_url=f"{settings.API_V1_STR}/openapi.json")
app.include_router(api_router, prefix=settings.API_V1_STR)

origins = [
    "http://ip.hocmang.net",
    "http://localhost",
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8002)
