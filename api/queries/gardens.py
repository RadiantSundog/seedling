from typing import List
from bson import ObjectId
from models import GardenIn, GardenOut
from queries.client import Queries


class GardenQueries(Queries):
    DB_NAME = "db-seedling-db"
    COLLECTION = "gardens"
    PLANT_COLLECTION = "plants"

    def create(self, garden: GardenIn) -> GardenOut:
        garden = garden.dict()
        self.collection.insert_one(garden)
        garden["id"] = str(garden["_id"])
        return GardenOut(**garden)

    def get_all(self) -> List[GardenOut]:
        gardens = self.collection.find()
        gardensPropsList = list(gardens)
        for gardenProps in gardensPropsList:
            gardenProps["id"] = str(gardenProps["_id"])
        return [GardenOut(**garden) for garden in gardensPropsList]

    def get_one(self, garden_id: str) -> List[GardenOut]:
        garden = self.collection.find_one({"_id": ObjectId(garden_id)})
        plants = [
            {"$match": {"_id": ObjectId(garden_id)}},
            {"$unwind": "$plant_ids"},
            {
                "$lookup": {
                    "from": "plants",
                    "localField": "plant_ids",
                    "foreignField": "_id",
                    "as": "plantObjects",
                }
            },
            {"$unwind": "$plantObjects"},
            {
                "$group": {
                    "_id": "$_id",
                    "name": {"$last": "$name"},
                    "location": {"$last": "$location"},
                    "plants": {"$push": "$plantObjects"},
                }
            },
        ]
        result = self.collection.aggregate(plants)
        for garden in result:
            garden["id"] = str(garden["_id"])
            for plant in garden["plants"]:
                plant["id"] = str(plant["_id"])
                del plant["_id"]
            return GardenOut(**garden)

    def delete(self, garden_id: str) -> bool:
        garden = self.collection.delete_one({"_id": ObjectId(garden_id)})
        return garden.deleted_count == 1
