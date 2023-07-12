from fastapi import APIRouter, Depends, Response
from typing import List, Optional, Union
from queries.tasks import (
    Error,
    TaskIn,
    TasksRepository,
    TaskOut,
)


router = APIRouter()
task_repo = TasksRepository()


@router.post("/tasks", response_model=Union[TaskOut, Error])
def create_task(
    task: TaskIn,
    repo: TasksRepository = Depends(),
):
    return repo.create(task)


@router.get("/tasks", response_model=Union[List[TaskOut], Error])
def get_all_tasks(
    repo: TasksRepository = Depends(),
):
    return repo.get_all()


@router.get("/tasks/{task_id}", response_model=Optional[TaskOut])
def get_one_task(
    task_id: str,
    response: Response,
    repo: TasksRepository = Depends(),
) -> TaskOut:
    task = repo.get_one(task_id)
    if task is None:
        response.status_code = 404
    return task


@router.delete("/task/{task_id}", response_model=bool)
def delete_task(
    task_id: str,
    repo: TasksRepository = Depends(),
) -> bool:
    return repo.delete(task_id)
