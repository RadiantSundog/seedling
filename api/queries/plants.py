from typing import List
from bson import ObjectId
from queries.client import Queries, db
from models import PlantIn, PlantOut


class PlantQueries(Queries):
    DB_NAME = "db-seedling-db"
    COLLECTION = "plants"
    gardens_collection = db.gardens
    identified_collection = db.identified

    def create(self, plant: PlantIn) -> PlantOut:
        plant_data_to_insert = plant.dict()
        plant_data_to_insert["_id"] = self.collection.insert_one(
            plant_data_to_insert
        ).inserted_id
        plant_data_to_insert["id"] = str(plant_data_to_insert["_id"])
        garden_id = ObjectId(plant.garden_id)
        self.gardens_collection.update_one(
            {"_id": garden_id},
            {"$push": {"plant_ids": plant_data_to_insert["_id"]}},
            upsert=True,
        )
        return PlantOut(**plant_data_to_insert)

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

    def delete(self, plant_id: str):
        self.collection.delete_one(
            {
                "_id": ObjectId(plant_id),
            }
        )
