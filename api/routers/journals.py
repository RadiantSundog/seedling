from fastapi import APIRouter, Depends, Response
from typing import List
from queries.journals import JournalQueries
from models import JournalIn, JournalOut


router = APIRouter()

# not_authorized = HTTPException(
#     status_code=status.HTTP_401_UNAUTHORIZED,
#     detail="Invalid authentication credentials",
#     headers={"WWW-Authenticate": "Bearer"},
# )


@router.post("/journals", response_model=JournalOut)
def create_journal(
    journal: JournalIn,
    repo: JournalQueries = Depends(),
    # account: dict = Depends(get_current_user),
):
    return repo.create(journal)


@router.get("/journals", response_model=List[JournalOut])
def get_all_journals(
    repo: JournalQueries = Depends(),
    # account: dict = Depends(get_current_user),
):
    return repo.get_all()


@router.get("/journals/{journal_id}", response_model=JournalOut)
def get_one_journal(
    journal_id: str,
    response: Response,
    repo: JournalQueries = Depends(),
    # account: dict = Depends(get_current_user),
):
    journal = repo.get_one(journal_id)
    if journal is None:
        response.status_code = 404
    return journal


@router.delete("/journals/{journal_id}", response_model=bool)
def delete_journal(
    journal_id: str,
    repo: JournalQueries = Depends(),
    # account: dict = Depends(get_current_user),
):
    return repo.delete(journal_id)