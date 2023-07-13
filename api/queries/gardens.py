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
            props = garden.dict()
            self.gardens_collection.insert_one(props)
            props["id"] = str(props["_id"])
            return GardenOut(**props)
        except Exception as e:
            error_message = str(e)
            return Error(message=error_message)

    def get_all(self) -> Union[Error, List[GardenOut]]:
        try:
            garden = self.gardens_collection.aggregate(
                [
                    {"$match": {"_id": {"$exists": True}}},
                    {"$sort": {"name": 1}},
                ]
            )
            gardensPropsList = list(garden)
            for gardensProps in gardensPropsList:
                gardensProps["id"] = str(gardensProps["_id"])
            return [GardenOut(**garden) for garden in gardensPropsList]
        except Exception as e:
            error_message = str(e)
            return Error(message=error_message)

    def get_one(self, garden_id: str) -> GardenOut:
        props = self.gardens_collection.find_one({"_id": ObjectId(garden_id)})
        if not props:
            return None
        props["id"] = str(props["_id"])
        return GardenOut(**props)

    def delete(self, garden_id: str) -> bool:
        try:
            result = self.gardens_collection.delete_one(
                {"_id": ObjectId(garden_id)}
            )
            return result.deleted_count == 1
        except Exception as e:
            error_message = str(e)
            return Error(message=error_message)
