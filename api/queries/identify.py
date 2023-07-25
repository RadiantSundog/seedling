import requests
import os
import json
import time


async def send_image_for_identification(image_data):
    url = "https://plant.id/api/v3/identification"
    headers = {
        "Api-Key": os.environ["API_KEY"],
        "Content-Type": "application/json",
    }
    data = json.dumps({"images": [image_data], "similar_images": True})
    response = requests.post(url=url, headers=headers, data=data)
    time.sleep(1)
    response_as_json = response.json()
    params = {
        "details": [
            "common_names",
            "url",
            "description",
            "taxonomy",
            "rank",
            "gbif_id",
            "inaturalist_id",
            "image",
            "synonyms",
            "edible_parts",
            "watering",
        ]
    }
    result_url = f"{url}/{response_as_json['access_token']}"
    result = requests.get(url=result_url, headers=headers, params=params)
    return result.json()


def process_identification_response(result):
    plant_info = {
        "name": result["result"]["classification"]["suggestions"][0]["name"],
        "similar_image1": result["result"]["classification"]["suggestions"][0][
            "similar_images"
        ][0]["url"],
        "similar_image2": result["result"]["classification"]["suggestions"][0][
            "similar_images"
        ][1]["url"],
        "watering_max": result["result"]["classification"]["suggestions"][0][
            "details"
        ]["watering"]["max"],
        "watering_min": result["result"]["classification"]["suggestions"][0][
            "details"
        ]["watering"]["min"],
    }
    return plant_info
