from typing import List

from pydantic import BaseModel
from datetime import datetime


class GetIpBase(BaseModel):
    pass


class GetIpCreate(GetIpBase):
    pass


class GetIpUpdate(GetIpBase):
    pass


class GetIp(GetIpBase):
    pass
