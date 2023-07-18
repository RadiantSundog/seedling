import requests
import os
import json

async def send_image_for_identification(image_data):
    url="https://plant.id/api/v3/identification"
    headers={
        "Content-Type": "application/json",
        "Api-Key": os.environ["API_KEY"],
    }
    data = json.dumps({"images": [image_data], "similar_images": True})
    response = requests.post(url=url, headers=headers, data=data)
    return response.json()

# def process_identification_response(response):
#     plant_info = {
#         "name": response["result"]["classification"]["suggestions"][0]["name"],
#         "profile_page": response["url"],
#         "description": response["description"],
#         "edible_parts": response["edible_parts"],
#         "watering": response["watering"],

#     }
#     return plant_info
