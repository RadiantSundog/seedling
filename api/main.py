from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from authenticator import authenticator
from routers import accounts, gardens, journals, plants, tasks
import os
from fastapi import APIRouter, FastAPI, UploadFile, File

# import httpx
# from identify.config import API_KEY


app = FastAPI()
app.include_router(authenticator.router)
app.include_router(accounts.router)
app.include_router(gardens.router)
app.include_router(journals.router)
app.include_router(plants.router)
app.include_router(tasks.router)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("CORS_HOST", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# @app.post("/identify-plant")
# async def identify_plant(file: UploadFile = File(...)):
#     contents = await file.read()
#     plant_id_response = await send_image_for_identification(contents)
#     plant_info = process_identification_response(plant_id_response)
#     return plant_info

# async def send_image_for_identification(image_data):
#     url="https://plant.id/api/v3/identification"
#     headers={
#         "Content-Type": "multipart/form-data",
#         "Authorization": API_KEY,
#     }
#     files = {"image": image_data}
#     async with httpx.AsyncClient() as client:
#         response = await client.post(url, headers)
#     return response.json()

# def process_identification_response(response):
#     plant_info = {
#         "name": response["common_names"],
#         "profile_page": response["url"],
#         "description": response["description"],
#         "edible_parts": response["edible_parts"],
#         "watering": response["watering"],

#     }
#     return plant_info


# @app.get("/api/launch-details")
# def launch_details():
#     return {
#         "launch_details": {
#             "module": 3,
#             "week": 17,
#             "day": 5,
#             "hour": 19,
#             "min": "00",
#         }
#     }
