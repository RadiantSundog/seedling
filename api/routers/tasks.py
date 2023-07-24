from fastapi import APIRouter, Depends, Response
from typing import List
from queries.tasks import TasksQueries
from models import TaskIn, TaskOut


router = APIRouter()


@router.post("/tasks", response_model=TaskOut)
def create_task(
    task: TaskIn,
    repo: TasksQueries = Depends(),
):
    return repo.create(task)


@router.get("/tasks", response_model=List[TaskOut])
def get_all_tasks(
    repo: TasksQueries = Depends(),
):
    return repo.get_all()


@router.get("/tasks/{task_id}", response_model=TaskOut)
def get_one_task(
    task_id: str,
    response: Response,
    repo: TasksQueries = Depends(),
):
    task = repo.get_one(task_id)
    if task is None:
        response.status_code = 404
    return task


@router.delete("/tasks/{task_id}", response_model=bool)
def delete_task(
    task_id: str,
    repo: TasksQueries = Depends(),
):
    repo.delete(task_id=task_id)
    return True
