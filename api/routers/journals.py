from fastapi import APIRouter, Depends, Response
from typing import List, Optional, Union
from queries.journals import (
    Error,
    JournalIn,
    JournalRepository,
    JournalOut,
)


router = APIRouter()
journal_repo = JournalRepository()


@router.post("/journals", response_model=Union[JournalOut, Error])
def create_journal(
    journal: JournalIn,
    response: Response,
    repo: JournalRepository = Depends(),
):
    return repo.create(journal)


@router.get("/journals", response_model=Union[List[JournalOut], Error])
def get_all_journals(
    repo: JournalRepository = Depends(),
):
    return repo.get_all()


@router.get("/journals/{journal_id}", response_model=Optional[JournalOut])
def get_one_journal(
    journal_id: str,
    response: Response,
    repo: JournalRepository = Depends(),
) -> JournalOut:
    journal = repo.get_one(journal_id)
    if journal is None:
        response.status_code = 404
    return journal


@router.delete("/journals/{journal_id}", response_model=bool)
def delete_journal(
    journal_id: str,
    repo: JournalRepository = Depends(),
) -> bool:
    return repo.delete(journal_id)
