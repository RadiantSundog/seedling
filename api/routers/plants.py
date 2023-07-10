from fastapi import APIRouter, Depends, Response
from typing import List, Optional, Union
from queries.plants import (
    Error,
    PlantIn,
    PlantRepository,
    PlantOut,
)


router = APIRouter()
plant_repo = PlantRepository()


# @router.post("/plants", response_model=Union[PlantOut, Error])
# def create_plant(plant: PlantIn, response: Response):
#     return plant_repo.create(plant)


@router.post("/plants", response_model=Union[PlantOut, Error])
def create_plant(
    plant: PlantIn,
    response: Response,
    repo: PlantRepository = Depends(),
):
    # response.status_code = 400
    return repo.create(plant)


# @router.get("/plants", response_model=List[PlantOut])
# def get_all_plants():
#     return plant_repo.get_all()


@router.get("/plants", response_model=Union[List[PlantOut], Error])
def get_all(
    repo: PlantRepository = Depends(),
):
    return repo.get_all()


# @router.delete("/plants/{plant_id}", response_model=bool)
# def delete_plant(plant: str):
#     return plant_repo.delete(plant_id)


@router.delete("/plants/{plant_id}", response_model=bool)
def delete_plant(
    plant_id: str,
    repo: PlantRepository = Depends(),
) -> bool:
    return repo.delete(plant_id)


# @router.get("/plants/{plant_id}", response_model=Optional[PlantOut])
# def get_one_plant(plant_id: str, response: Response):
#     return plant_repo.get_one(plant_id)


@router.get("/plants/{plant_id}", response_model=Optional[PlantOut])
def get_one_plant(
    plant_id: str,
    response: Response,
    repo: PlantRepository = Depends(),
) -> PlantOut:
    vacation = repo.get_one(plant_id)
    if vacation is None:
        response.status_code = 404
    return vacation
