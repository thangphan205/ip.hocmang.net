from pydantic import BaseSettings
import secrets


class DevSettings(BaseSettings):
    API_V1_STR: str = "/api"

    SECRET_KEY: str = secrets.token_urlsafe(32)
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 600


settings = DevSettings()
