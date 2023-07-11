from fastapi import APIRouter, Depends, Response
from typing import List, Optional, Union
from queries.gardens import (
    Error,
    GardenIn,
    GardenRepository,
    GardenOut,
)


router = APIRouter()
garden_repo = GardenRepository()


@router.post("/gardens", response_model=Union[GardenOut, Error])
def create_garden(
    garden: GardenIn,
    repo: GardenRepository = Depends(),
):
    return repo.create(garden)


@router.get("/gardens", response_model=Union[List[GardenOut], Error])
def get_all_gardens(
    repo: GardenRepository = Depends(),
):
    return repo.get_all()


@router.get("/gardens/{garden_id}", response_model=Optional[GardenOut])
def get_one_garden(
    garden_id: str,
    response: Response,
    repo: GardenRepository = Depends(),
) -> GardenOut:
    garden = repo.get_one(garden_id)
    if garden is None:
        response.status_code = 404
    return garden


@router.delete("/gardens/{garden_id}", response_model=bool)
def delete_garden(
    garden_id: str,
    repo: GardenRepository = Depends(),
) -> bool:
    return repo.delete(garden_id)
