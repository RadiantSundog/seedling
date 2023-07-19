from typing import List
from bson import ObjectId
from queries.client import Queries, db
from models import PlantIn, PlantOut


class PlantRepository(Queries):
    DB_NAME = "db-seedling-db"
    COLLECTION = "plants"
    gardens_collection = db.gardens

    def create(self, plant: PlantIn) -> PlantOut:
        props = plant.dict()
        self.collection.insert_one(props)
        props["id"] = str(props["_id"])
        self.gardens_collection.update_one(
            {"_id": ObjectId(plant.garden_id)},
            {"$push": {"plant_ids": props["_id"]}},
        )
        return PlantOut(**props)

    def get_all(self) -> List[PlantOut]:
        plants = self.collection.find()
        plantsPropsList = list(plants)
        for plantProps in plantsPropsList:
            plantProps["id"] = str(plantProps["_id"])
        return [PlantOut(**plant) for plant in plantsPropsList]

    def get_one(self, plant_id: str) -> List[PlantOut]:
        plant = self.collection.find_one({"_id": ObjectId(plant_id)})
        plant["id"] = str(plant["_id"])
        return PlantOut(**plant)

    def delete(self, plant_id: str) -> bool:
        plant = self.collection.delete_one({"_id": ObjectId(plant_id)})
        return plant.deleted_count == 1
