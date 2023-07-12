from pydantic import BaseModel
from typing import List, Optional, Union
from .database import db
from bson import ObjectId


class Error(BaseModel):
    message: str


class GardenIn(BaseModel):
    name: str
    location: str


class GardenOut(BaseModel):
    id: str
    name: str
    location: str


class GardenRepository:
    gardens_collection = db.gardens
    plants_collection = db.plants

    def create(self, garden: GardenIn) -> Union[GardenOut, Error]:
        try:
            result = self.gardens_collection.insert_one(garden.dict())
            inserted_id = str(result.inserted_id)
            return GardenOut(
                id=inserted_id, name=garden.name, location=garden.location
            )
        except Exception as e:
            error_message = str(e)
            return Error(message=error_message)

    def get_all(self) -> Union[Error, List[GardenOut]]:
        try:
            gardens = [
                GardenOut(
                    id=str(garden["_id"]),
                    name=garden["name"],
                    location=garden["location"],
                )
                for garden in self.gardens_collection.find().sort("name")
            ]
            return gardens
        except Exception as e:
            error_message = str(e)
            return Error(message=error_message)

    def get_one(self, garden_id: str) -> Optional[GardenOut]:
        try:
            garden = self.gardens_collection.find_one(
                {"_id": ObjectId(garden_id)}
            )
            if garden is None:
                return None
            return GardenOut(
                id=str(garden["_id"]),
                name=garden["name"],
                location=garden["location"],
            )
        except Exception as e:
            error_message = str(e)
            return Error(message=error_message)

    def delete(self, garden_id: str) -> bool:
        try:
            result = self.gardens_collection.delete_one(
                {"_id": ObjectId(garden_id)}
            )
            return result.deleted_count == 1
        except Exception as e:
            error_message = str(e)
            return Error(message=error_message)
