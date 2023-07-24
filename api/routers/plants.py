from fastapi import APIRouter, Depends, Response
from typing import List
from queries.plants import (
    PlantIn,
    PlantQueries,
    PlantOut,
)


router = APIRouter()


@router.post("/plants", response_model=PlantOut)
def create_plant(
    plant: PlantIn,
    repo: PlantQueries = Depends(),
):
    return repo.create(plant)


@router.get("/plants", response_model=List[PlantOut])
def get_all_plants(
    repo: PlantQueries = Depends(),
):
    return repo.get_all()


@router.get("/plants/{plant_id}", response_model=PlantOut)
def get_one_plant(
    plant_id: str,
    response: Response,
    repo: PlantQueries = Depends(),
):
    plant = repo.get_one(plant_id)
    if plant is None:
        response.status_code = 404
    return plant


@router.delete("/plants/{plant_id}", response_model=bool)
def delete_plant(
    plant_id: str,
    repo: PlantQueries = Depends(),
):
    repo.delete(plant_id=plant_id)
    return True
