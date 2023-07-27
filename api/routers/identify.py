from fastapi import APIRouter, UploadFile, File
from queries.identify import (
    send_image_for_identification,
    process_identification_response,
)
import base64
from queries.client import Queries
from bson.objectid import ObjectId
import os
import pymongo

router = APIRouter()

queries = Queries()

MONGO_URL = os.environ["DATABASE_URL"]
client = pymongo.MongoClient(MONGO_URL)
db = client.get_database("db-seedling-db")
identified_collection = db.identified


@router.post("/identify-plant")
async def identify_plant(file: UploadFile = File(...)):
    print("////", file)
    try:
        contents = await file.read()
        image_64_encode = base64.b64encode(contents).decode("utf8")

        image_64 = f"data:image/jpg;base64,{image_64_encode}"

        plant_id_response = await send_image_for_identification(image_64)
        plant_info = process_identification_response(plant_id_response)

        plant_info["watering_max"] = float(plant_info["watering_max"])
        plant_info["watering_min"] = float(plant_info["watering_min"])

        plant_info["_id"] = str(ObjectId())

        collection = client.get_database("db-seedling-db")["identified"]
        collection.insert_one(plant_info)
        return plant_info
    except Exception as inst:
        return inst


@router.get("/identify-plant")
def get_all_identified_plants():
    identified_plants = list(identified_collection.find({}))
    return identified_plants
