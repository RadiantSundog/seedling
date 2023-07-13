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
            props = journal.dict()
            self.journals_collection.insert_one(props)
            props["id"] = str(props["_id"])
            return JournalOut(**props)
        except Exception as e:
            error_message = str(e)
            return Error(message=error_message)

    def get_all(self) -> Union[Error, List[JournalOut]]:
        try:
            journal = self.journals_collection.aggregate(
                [
                    {"$match": {"_id": {"$exists": True}}},
                    {"$sort": {"created_on": 1}},
                ]
            )
            journalsPropsList = list(journal)
            for journalsProps in journalsPropsList:
                journalsProps["id"] = str(journalsProps["_id"])
            return [JournalOut(**journal) for journal in journalsPropsList]
        except Exception as e:
            error_message = str(e)
            return Error(message=error_message)

    def get_one(self, journal_id: str) -> JournalOut:
        props = self.journals_collection.find_one(
            {"_id": ObjectId(journal_id)}
        )
        if not props:
            return None
        props["id"] = str(props["_id"])
        return JournalOut(**props)

    def delete(self, journal_id: str) -> bool:
        try:
            result = self.journals_collection.delete_one(
                {"_id": ObjectId(journal_id)}
            )
            return result.deleted_count == 1
        except Exception as e:
            error_message = str(e)
            return Error(message=error_message)
