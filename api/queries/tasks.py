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
            props = task.dict()
            self.tasks_collection.insert_one(props)
            props["id"] = str(props["_id"])
            return TaskOut(**props)
        except Exception as e:
            error_message = str(e)
            return Error(message=error_message)

    def get_all(self) -> Union[Error, List[TaskOut]]:
        try:
            task = self.tasks_collection.aggregate(
                [
                    {"$match": {"_id": {"$exists": True}}},
                    {"$sort": {"due_date": 1}},
                ]
            )
            tasksPropsList = list(task)
            for tasksProps in tasksPropsList:
                tasksProps["id"] = str(tasksProps["_id"])
            return [TaskOut(**task) for task in tasksPropsList]
        except Exception as e:
            error_message = str(e)
            return Error(message=error_message)

    def get_one(self, task_id: str) -> TaskOut:
        props = self.tasks_collection.find_one({"_id": ObjectId(task_id)})
        if not props:
            return None
        props["id"] = str(props["_id"])
        return TaskOut(**props)

    def delete(self, task_id: str) -> bool:
        try:
            result = self.tasks_collection.delete_one(
                {"_id": ObjectId(task_id)}
            )
            return result.deleted_count == 1
        except Exception as e:
            error_message = str(e)
            return Error(message=error_message)
