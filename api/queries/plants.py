from pydantic import BaseModel
from typing import List, Optional, Union
from queries.database import db
from bson import ObjectId
from .gardens import GardenOut, Error


class PlantIn(BaseModel):
    name: str
    garden_id: str


class PlantOut(BaseModel):
    id: str
    name: str
    garden: GardenOut


class PlantRepository:
    plants_collection = db.plants
    gardens_collection = db.gardens

    def create(self, plant: PlantIn) -> Union[PlantOut, Error]:
        try:
            result = self.plants_collection.insert_one(plant.dict())
            inserted_id = str(result.inserted_id)
            garden = self.gardens_collection.find_one(
                {"_id": ObjectId(plant.garden_id)}
            )
            if garden:
                garden_info = GardenOut(
                    id=str(garden["_id"]),
                    name=garden["name"],
                    location=garden["location"],
                )
                return PlantOut(
                    id=inserted_id, name=plant.name, garden=garden_info
                )
            else:
                return Error(message="Invalid Garden ID")
        except Exception as e:
            error_message = str(e)
            return Error(message=error_message)

    def get_all(self) -> Union[Error, List[PlantOut]]:
        try:
            plants = []
            for plant in self.plants_collection.find().sort("name"):
                garden_id = plant["garden_id"]
                garden = self.gardens_collection.find_one(
                    {"_id": ObjectId(garden_id)}
                )
                if garden:
                    garden_info = GardenOut(
                        id=str(garden["_id"]),
                        name=garden["name"],
                        location=garden["location"],
                    )
                    plant_info = PlantOut(
                        id=str(plant["_id"]),
                        name=plant["name"],
                        garden=garden_info,
                    )
                    plants.append(plant_info)
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
            garden_id = plant["garden_id"]
            garden = self.gardens_collection.find_one(
                {"_id": ObjectId(garden_id)}
            )
            if garden is None:
                return None
            garden_info = GardenOut(
                id=str(garden["_id"]),
                name=garden["name"],
                location=garden["location"],
            )
            return PlantOut(
                id=str(plant["_id"]), name=plant["name"], garden=garden_info
            )
        except Exception as e:
            error_message = str(e)
            return Error(message=error_message)

    def delete(self, plant_id: str) -> bool:
        try:
            result = self.plants_collection.delete_one(
                {"_id": ObjectId(plant_id)}
            )
            return result.deleted_count == 1
        except Exception as e:
            error_message = str(e)
            return Error(message=error_message)
