from fastapi import APIRouter, Depends, Response
from typing import List
from queries.tasks import TasksRepository
from models import TaskIn, TaskOut



router = APIRouter()
# not_authorized = HTTPException(
#     status_code=status.HTTP_401_UNAUTHORIZED,
#     detail="Invalid authentication credentials",
#     headers={"WWW-Authenticate": "Bearer"},
# )


@router.post("/tasks", response_model=TaskOut)
def create_task(
    task: TaskIn,
    repo: TasksRepository = Depends(),
    # account: dict = Depends(get_current_user),
):
    return repo.create(task)


@router.get("/tasks", response_model=List[TaskOut])
def get_all_tasks(
    repo: TasksRepository = Depends(),
    # account: dict = Depends(get_current_user),
):
    return repo.get_all()


@router.get("/tasks/{task_id}", response_model=TaskOut)
def get_one_task(
    task_id: str,
    response: Response,
    repo: TasksRepository = Depends(),
    # account: dict = Depends(get_current_user),
):
    task = repo.get_one(task_id)
    if task is None:
        response.status_code = 404
    return task


@router.delete("/tasks/{task_id}", response_model=bool)
def delete_task(
    task_id: str,
    repo: TasksRepository = Depends(),
    # account: dict = Depends(get_current_user),
):
    return repo.delete(task_id)


# @router.update_task("/tasks/{task_id}", response_model=TaskOut)
# def update_task(
#     task_id: str,
#     repo: TasksRepository = Depends(),
# ):
