from .client import Queries
from pymongo.errors import DuplicateKeyError
from pymongo import ASCENDING
from models import (
    PydanticObjectId,
    DuplicateAccountError,
    AccountIn,
    AccountOut,
    Account,
    AccountOutWithPassword,
)


class AccountQueries(Queries):
    DB_NAME = "db-seedling-db"
    COLLECTION = "accounts"

    def get(self, email: str) -> AccountOutWithPassword:
        props = self.collection.find_one({"email": email})
        if not props:
            return None
        props["id"] = str(props["_id"])
        return AccountOutWithPassword(**props)

    def create(
        self, info: AccountIn, hashed_password: str
    ) -> AccountOutWithPassword:
        props = info.dict()
        props["hashed_password"] = hashed_password
        del props["password"]
        try:
            self.collection.insert_one(props)
        except DuplicateKeyError:
            raise DuplicateAccountError()
        props["id"] = str(props["_id"])
        del props["_id"]
        return AccountOutWithPassword(**props)
