import requests
import os

async def send_image_for_identification(image_data):
    url="https://plant.id/api/v3/identification"
    headers={
        "Content-Type": "application/json",
        "Api-Key": os.environ["API_KEY"],
    }
    data = {"images": [image_data]}
    response = requests.post(url=url, headers=headers, data=data)
    print("///////////////////", response)
    # return response.json()

# def process_identification_response(response):
#     plant_info = {
#         "name": response["common_names"],
#         "profile_page": response["url"],
#         "description": response["description"],
#         "edible_parts": response["edible_parts"],
#         "watering": response["watering"],

#     }
#     return plant_info
