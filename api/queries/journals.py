from typing import List
from bson import ObjectId
from models import JournalIn, JournalOut
from queries.client import Queries


class JournalQueries(Queries):
    DB_NAME = "db-seedling-db"
    COLLECTION = "journals"

    def create(self, journal: JournalIn) -> JournalOut:
        journal = journal.dict()
        self.collection.insert_one(journal)
        journal["id"] = str(journal["_id"])
        return JournalOut(**journal)

    def get_all(self) -> List[JournalOut]:
        journals = self.collection.find()
        journalPropsList = list(journals)
        for journalProps in journalPropsList:
            journalProps["id"] = str(journalProps["_id"])
        return [JournalOut(**journal) for journal in journalPropsList]

    def get_one(self, journal_id: str) -> JournalOut:
        journal = self.collection.find_one({"_id": ObjectId(journal_id)})
        journal["id"] = str(journal["_id"])
        return JournalOut(**journal)

    def delete(self, journal_id: str):
        self.collection.delete_one(
            {
                "_id": ObjectId(journal_id),
            }
        )

    def update_one(self, journal_id: str, journal: JournalIn) -> JournalOut:
        update = journal.dict()
        self.collection.find_one_and_update(
            {
                "_id": ObjectId(journal_id),
            },
            {"$set": {**update}},
        )
        update["id"] = str(ObjectId(journal_id))
        return JournalOut(**update)
