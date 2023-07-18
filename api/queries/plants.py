from pydantic import BaseModel, HttpUrl
from typing import List, Dict, Any, Optional
from queries.database import db
from bson import ObjectId
from models import GardenOut


class PlantIn(BaseModel):
    name: str
    plant_picture: HttpUrl
    description: Optional[str]
    garden_id: str
    Garden: Optional[list]


class PlantOut(BaseModel):
    id: str
    name: str
    description: Optional[str]
    plant_picture: HttpUrl
    garden_id: str
    Garden: list


class PlantRepository:
    plants_collection = db.plants
    gardens_collection = db.gardens

    # def create(self, plant: PlantIn) -> PlantOut:
    #     props = plant.dict()
    #     self.plants_collection.insert_one(props)
    #     props["id"] = str(props["_id"])
    #     self.gardens_collection.update_one(
    #         {"_id": ObjectId(plant.garden_id)},
    #         {"$push": {"plant_ids": props["_id"]}},
    #     )
    #     return PlantOut(**props)

    def create(self, plant: PlantIn) -> PlantOut:
        garden = self.gardens_collection.find_one(
            {"_id": ObjectId(plant.garden_id)}
        )
        if garden:
            garden_info = GardenOut(
                id=str(garden["_id"]),
                name=garden["name"],
                location=garden["location"],
            )
            result = self.plants_collection.insert_one(
                {**plant.dict(), "garden_id": garden_info.id}
            )
            inserted_id = str(result.inserted_id)
            return PlantOut(
                id=inserted_id,
                name=plant.name,
                garden=garden_info,
                plant_picture=plant.plant_picture,
            )
        else:
            return Error(message="Invalid Garden Name")

    # def get_all(self) -> List[PlantOut]:
    #     plants = self.plants_collection.find()
    #     plantsPropsList = list(plants)
    #     for plantProps in plantsPropsList:
    #         plantProps["id"] = str(plantProps["_id"])
    #     return [PlantOut(**plant) for plant in plantsPropsList]

    def get_all(self) -> List[PlantOut]:
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
                    plant_picture=plant["plant_picture"],
                )
                plants.append(plant_info)
        return plants

    # def get_one(self, plant_id: str) -> List[PlantOut]:
    #     plant = self.plants_collection.find_one({"_id": ObjectId(plant_id)})
    #     plant["id"] = str(plant["_id"])
    #     return PlantOut(**plant)

    def get_one(self, plant_id: str) -> PlantOut:
        plant = self.plants_collection.find_one({"_id": ObjectId(plant_id)})
        if plant is None:
            return None
        garden_id = plant["garden_id"]
        garden = self.gardens_collection.find_one({"_id": ObjectId(garden_id)})
        if garden is None:
            return None
        garden_info = GardenOut(
            id=str(garden["_id"]),
            name=garden["name"],
            location=garden["location"],
        )
        return PlantOut(
            id=str(plant["_id"]),
            name=plant["name"],
            garden=garden_info,
            plant_picture=plant["plant_picture"],
        )

    def delete(self, plant_id: str) -> bool:
        plant = self.plants_collection.delete_one({"_id": ObjectId(plant_id)})
        return plant.deleted_count == 1


# {
# "_id": ObjectId('64b1c54d4fd9d17f50b2e745')
# }

# {
#   from: "gardens",
#   localField: "garden.id",
#   foreignField: "garden_id",
#   as: "Garden",
# }

# {
#   Garden: {
#     $map: {
#       input: "$Garden",
#       as: "garden",
#       in: {
#         id: "$$garden._id",
#         name: "$$garden.name",
#       },
#     },
#   },
# }
