import os
from pymongo import MongoClient

client = MongoClient(os.environ["DATABASE_URL"])
db = client.get_database("DB_NAME")
gardens_collection = db.get_collection("gardens")
