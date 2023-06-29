from bson.objectid import ObjectId
from pydantic import BaseModel
from .client import Queries
from pymongo.errors import DuplicateKeyError


class PydanticObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, value: ObjectId | str) -> ObjectId:
        if value:
            try:
                ObjectId(value)
            except:
                raise ValueError(f"Not a valid object id: {value}")
        return value


class DuplicateAccountError(ValueError):
    pass


class AccountIn(BaseModel):
    email: str
    password: str
    username: str


class Account(AccountIn):
    id: PydanticObjectId


class AccountOut(BaseModel):
    id: str
    email: str
    username: str


class AccountOutWithPassword(AccountOut):
    hashed_password: str


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
        self, info: AccountIn, hashed_password: str, roles=["patron"]
    ) -> AccountOutWithPassword:
        props = info.dict()
        props["hashed_password"] = hashed_password
        props["roles"] = roles
        try:
            self.collection.insert_one(props)
        except DuplicateKeyError:
            raise DuplicateAccountError()
        props["id"] = str(props["_id"])
        return Account(**props)
