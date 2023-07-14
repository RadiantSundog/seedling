from fastapi import APIRouter, Depends, Response, HTTPException, status
from typing import List
from token_auth import get_current_user
from queries.gardens import GardenRepository
from models import GardenIn, GardenOut


router = APIRouter()

# not_authorized = HTTPException(
#     status_code=status.HTTP_401_UNAUTHORIZED,
#     detail="Invalid authentication credentials",
#     headers={"WWW-Authenticate": "Bearer"},
# )


@router.post("/gardens", response_model=GardenOut)
def create_garden(
    garden: GardenIn,
    repo: GardenRepository = Depends(),
    # account: dict = Depends(get_current_user),
):
    return repo.create(garden)


@router.get("/gardens", response_model=List[GardenOut])
def get_all_gardens(
    repo: GardenRepository = Depends(),
    # account: dict = Depends(get_current_user),
):
    return repo.get_all()


@router.get("/gardens/{garden_id}", response_model=GardenOut)
def get_one_garden(
    garden_id: str,
    response: Response,
    repo: GardenRepository = Depends(),
    # account: dict = Depends(get_current_user),
):
    garden = repo.get_one(garden_id)
    if garden is None:
        response.status_code = 404
    return garden


@router.delete("/gardens/{garden_id}", response_model=bool)
def delete_garden(
    garden_id: str,
    repo: GardenRepository = Depends(),
    # account: dict = Depends(get_current_user),
):
    return repo.delete(garden_id)
