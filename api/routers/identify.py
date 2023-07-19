from fastapi import APIRouter, UploadFile, File
from queries.identify import send_image_for_identification, process_identification_response
import base64

router = APIRouter()

@router.post("/identify-plant")
async def identify_plant(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        image_64_encode = base64.b64encode(contents).decode("utf8")

        image_64 = f"data:image/jpg;base64,{image_64_encode}"

        plant_id_response = await send_image_for_identification(image_64)
        plant_info = process_identification_response(plant_id_response)
        return plant_info
    except Exception as inst:
        return inst
