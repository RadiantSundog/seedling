from pydantic import BaseModel
from typing import List, Optional, Union
from .database import db
from bson import ObjectId
from datetime import datetime
from .gardens import Error


class JournalIn(BaseModel):
    created_on: datetime
    title: str
    description: str


class JournalOut(BaseModel):
    id: str
    created_on: datetime
    title: str
    description: str


class JournalRepository:
    journals_collection = db.journals

    def create(self, journal: JournalIn) -> Union[JournalOut, Error]:
        try:
            result = self.journals_collection.insert_one(journal.dict())
            inserted_id = str(result.inserted_id)
            return JournalOut(
                id=inserted_id,
                created_on=journal.created_on,
                title=journal.title,
                description=journal.description,
            )
        except Exception as e:
            error_message = str(e)
            return Error(message=error_message)

    def get_all(self) -> Union[Error, List[JournalOut]]:
        try:
            journals = [
                JournalOut(
                    id=str(journal["_id"]),
                    created_on=journal["created_on"],
                    title=journal["title"],
                    description=journal["description"],
                )
                for journal in self.journals_collection.find().sort(
                    "created_on"
                )
            ]
            return journals
        except Exception as e:
            error_message = str(e)
            return Error(message=error_message)

    def get_one(self, journal_id: str) -> Optional[JournalOut]:
        try:
            journal = self.journals_collection.find_one(
                {"_id": ObjectId(journal_id)}
            )
            if journal is None:
                return None
            return JournalOut(
                id=str(journal["_id"]),
                created_on=journal["created_on"],
                title=journal["title"],
                description=journal["description"],
            )
        except Exception as e:
            print(f"Error retrieving garden: {e}")
            return None

    def delete(self, journal_id: str) -> bool:
        try:
            result = self.journals_collection.delete_one(
                {"_id": ObjectId(journal_id)}
            )
            return result.deleted_count == 1
        except Exception as e:
            error_message = str(e)
            return Error(message=error_message)
