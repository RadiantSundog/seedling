from typing import List
from bson import ObjectId
from models import TaskIn, TaskOut
from queries.client import Queries


class TasksRepository(Queries):
    DB_NAME = "db-seedling-db"
    COLLECTION = "tasks"

    def create(self, task: TaskIn) -> TaskOut:
        tasks = task.dict()
        self.collection.insert_one(tasks)
        tasks["id"] = str(tasks["_id"])
        return TaskOut(**tasks)

    def get_all(self) -> List[TaskOut]:
        tasks = self.collection.find()
        tasksPropsList = list(tasks)
        for tasksProps in tasksPropsList:
            tasksProps["id"] = str(tasksProps["_id"])
        return [TaskOut(**task) for task in tasksPropsList]

    def get_one(self, task_id: str) -> TaskOut:
        tasks = self.collection.find_one({"_id": ObjectId(task_id)})
        tasks["id"] = str(tasks["_id"])
        return TaskOut(**tasks)

    def delete(self, task_id: str):
        self.collection.delete_one(
            {
                "_id": ObjectId(task_id),
            }
        )
