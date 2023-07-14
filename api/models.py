from bson.objectid import ObjectId
from pydantic import BaseModel, HttpUrl
from datetime import datetime


class PydanticObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, value: ObjectId | str) -> ObjectId:
        if value:
            try:
                ObjectId(value)
            except:
                raise ValueError(f"Not a valid object id: {value}")
        return value


class DuplicateAccountError(ValueError):
    pass


class AccountIn(BaseModel):
    email: str
    password: str
    username: str


class Account(AccountIn):
    id: PydanticObjectId


class AccountOut(BaseModel):
    id: str
    email: str
    username: str


class AccountOutWithPassword(AccountOut):
    hashed_password: str


class Error(BaseModel):
    message: str


class GardenIn(BaseModel):
    name: str
    location: str


class GardenOut(BaseModel):
    id: str
    name: str
    location: str


# class PlantIn(BaseModel):
#     name: str
#     plant_picture: HttpUrl
#     garden_id: str


# class PlantOut(BaseModel):
#     id: str
#     name: str
#     plant_picture: HttpUrl
#     garden: GardenOut


class TaskIn(BaseModel):
    description: str
    due_date: datetime


class TaskOut(BaseModel):
    id: str
    description: str
    due_date: datetime


class JournalIn(BaseModel):
    created_on: datetime
    title: str
    description: str


class JournalOut(BaseModel):
    id: str
    created_on: datetime
    title: str
    description: str
