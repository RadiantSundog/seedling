from fastapi import APIRouter, FastAPI, UploadFile, File
import httpx

router = APIRouter()

@router.post("/identify-plant")
async def identify_plant(file: UploadFile = File(...)):
    contents = await file.read()
    plant_id_response = await send_image_for_identification(contents)
    plant_info = process_identification_response(plant_id_response)
    return plant_info
