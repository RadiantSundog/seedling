from fastapi import APIRouter, Depends, Response
from typing import List
from queries.plants import (
    PlantIn,
    PlantRepository,
    PlantOut,
)


router = APIRouter()

# not_authorized = HTTPException(
#     status_code=status.HTTP_401_UNAUTHORIZED,
#     detail="Invalid authentication credentials",
#     headers={"WWW-Authenticate": "Bearer"},
# )


@router.post("/plants", response_model=PlantOut)
def create_plant(
    plant: PlantIn,
    repo: PlantRepository = Depends(),
    # account: dict = Depends(get_current_user),
):
    return repo.create(plant)


@router.get("/plants", response_model=List[PlantOut])
def get_all_plants(
    repo: PlantRepository = Depends(),
    # account: dict = Depends(get_current_user),
):
    return repo.get_all()


@router.get("/plants/{plant_id}", response_model=PlantOut)
def get_one_plant(
    plant_id: str,
    response: Response,
    repo: PlantRepository = Depends(),
    # account: dict = Depends(get_current_user),
):
    plant = repo.get_one(plant_id)
    if plant is None:
        response.status_code = 404
    return plant


@router.delete("/plants/{plant_id}", response_model=bool)
def delete_plant(
    plant_id: str,
    repo: PlantRepository = Depends(),
    # account: dict = Depends(get_current_user),
):
    return repo.delete(plant_id)


# @router.update_plant("/plants/{plant_id}", response_model=TaskOut)
# def update_plant(
#     plant_id: str,
#     repo: PlantsRepository = Depends(),
# ):
