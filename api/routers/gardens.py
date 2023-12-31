from fastapi import APIRouter, Depends, Response
from typing import List
from queries.gardens import GardenQueries
from models import GardenIn, GardenOut


router = APIRouter()


@router.post("/gardens", response_model=GardenOut)
def create_garden(
    garden: GardenIn,
    repo: GardenQueries = Depends(),
):
    return repo.create(garden)


@router.get("/gardens", response_model=List[GardenOut])
def get_all_gardens(
    repo: GardenQueries = Depends(),
):
    return repo.get_all()


@router.get("/gardens/{garden_id}", response_model=GardenOut)
def get_one_garden(
    garden_id: str,
    response: Response,
    repo: GardenQueries = Depends(),
):
    garden = repo.get_one(garden_id)
    if garden is None:
        response.status_code = 404
    return garden


@router.delete("/gardens/{garden_id}", response_model=bool)
def delete_garden(
    garden_id: str,
    repo: GardenQueries = Depends(),
):
    repo.delete(garden_id=garden_id)
    return True
