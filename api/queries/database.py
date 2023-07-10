import os
import pymongo


MONGO_URL = os.environ["DATABASE_URL"]
client = pymongo.MongoClient(MONGO_URL)
db = client.get_database("DB_NAME")
gardens_collection = db.get_collection("gardens")
