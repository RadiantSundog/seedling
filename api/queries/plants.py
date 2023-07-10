from pydantic import BaseModel
from typing import List, Optional, Union
from queries.database import db
from bson import ObjectId


class Error(BaseModel):
    message: str


class PlantIn(BaseModel):
    name: str
    location: str


class PlantOut(BaseModel):
    id: str
    name: str
    location: str


class PlantRepository:
    plants_collection = db.plants

    def create(self, plant: PlantIn) -> Union[PlantOut, Error]:
        try:
            result = self.plants_collection.insert_one(plant.dict())
            inserted_id = str(result.inserted_id)
            return PlantOut(
                id=inserted_id, name=plant.name, location=plant.location
            )
        except Exception as e:
            error_message = str(e)
            return Error(message=error_message)

    def get_all(self) -> Union[Error, List[PlantOut]]:
        try:
            plants = [
                PlantOut(
                    id=str(plant["_id"]),
                    name=plant["name"],
                    location=plant["location"],
                )
                for plant in self.plants_collection.find().sort("name")
            ]
            return plants
        except Exception as e:
            error_message = str(e)
            return Error(message=error_message)

    def get_one(self, plant_id: str) -> Optional[PlantOut]:
        try:
            plant = self.plants_collection.find_one(
                {"_id": ObjectId(plant_id)}
            )
            if plant is None:
                return None
            return PlantOut(
                id=str(plant["_id"]),
                name=plant["name"],
                location=plant["location"],
            )
        except Exception as e:
            print(f"Error retrieving plant: {e}")
            return None

    def delete(self, plant_id: str) -> bool:
        try:
            result = self.plants_collection.delete_one(
                {"_id": ObjectId(plant_id)}
            )
            return result.deleted_count == 1
        except Exception as e:
            error_message = str(e)
            return Error(message=error_message)
