from pydantic import BaseModel
from typing import List, Optional, Union
from .database import db
from bson import ObjectId
from .gardens import Error
from datetime import datetime


class TaskIn(BaseModel):
    description: str
    due_date: datetime


class TaskOut(BaseModel):
    id: str
    description: str
    due_date: datetime


class TasksRepository:
    tasks_collection = db.tasks

    def create(self, task: TaskIn) -> Union[TaskOut, Error]:
        try:
            result = self.tasks_collection.insert_one(task.dict())
            inserted_id = str(result.inserted_id)
            return TaskOut(
                id=inserted_id,
                description=task.description,
                due_date=task.due_date,
            )
        except Exception as e:
            error_message = str(e)
            return Error(message=error_message)

    def get_all(self) -> Union[Error, List[TaskOut]]:
        try:
            tasks = [
                TaskOut(
                    id=str(task["_id"]),
                    description=task["description"],
                    due_date=task["due_date"],
                )
                for task in self.tasks_collection.find().sort("due_date")
            ]
            return tasks
        except Exception as e:
            error_message = str(e)
            return Error(message=error_message)

    def get_one(self, task_id: str) -> Optional[TaskOut]:
        try:
            task = self.tasks_collection.find_one({"_id": ObjectId(task_id)})
            if task is None:
                return None
            return TaskOut(
                id=str(task["_id"]),
                description=task["description"],
                due_date=task["due_date"],
            )
        except Exception as e:
            error_message = str(e)
            return Error(message=error_message)

    def delete(self, task_id: str) -> bool:
        try:
            result = self.tasks_collection.delete_one(
                {"_id": ObjectId(task_id)}
            )
            return result.deleted_count == 1
        except Exception as e:
            error_message = str(e)
            return Error(message=error_message)
