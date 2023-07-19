from pydantic import BaseModel, HttpUrl
from typing import List, Optional
from queries.database import db
from bson import ObjectId


class PlantIn(BaseModel):
    name: str
    plant_picture: HttpUrl
    description: Optional[str]
    garden_id: str


class PlantOut(BaseModel):
    id: str
    name: str
    description: Optional[str]
    plant_picture: HttpUrl
    garden_id: str


class PlantRepository:
    plants_collection = db.plants
    gardens_collection = db.gardens

    def create(self, plant: PlantIn) -> PlantOut:
        props = plant.dict()
        self.plants_collection.insert_one(props)
        props["id"] = str(props["_id"])
        self.gardens_collection.update_one(
            {"_id": ObjectId(plant.garden_id)},
            {"$push": {"plant_ids": props["_id"]}},
        )
        return PlantOut(**props)

    def get_all(self) -> List[PlantOut]:
        plants = self.plants_collection.find()
        plantsPropsList = list(plants)
        for plantProps in plantsPropsList:
            plantProps["id"] = str(plantProps["_id"])
        return [PlantOut(**plant) for plant in plantsPropsList]

    def get_one(self, plant_id: str) -> List[PlantOut]:
        plant = self.plants_collection.find_one({"_id": ObjectId(plant_id)})
        plant["id"] = str(plant["_id"])
        return PlantOut(**plant)

    def delete(self, plant_id: str) -> bool:
        plant = self.plants_collection.delete_one({"_id": ObjectId(plant_id)})
        return plant.deleted_count == 1
