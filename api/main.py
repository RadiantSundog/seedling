from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from authenticator import authenticator
from routers import accounts
import os
from queries.accounts import AccountIn
import pymongo

app = FastAPI()
app.include_router(authenticator.router)
app.include_router(accounts.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("CORS_HOST", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MONGO_URL = os.environ["DATABASE_URL"]
client = pymongo.MongoClient(MONGO_URL)
db = client["db-seedling-db"]
users_collection = db["accounts"]

# @app.get("/api/launch-details")
# def launch_details():
#     return {
#         "launch_details": {
#             "module": 3,
#             "week": 17,
#             "day": 5,
#             "hour": 19,
#             "min": "00",
#         }
#     }

@app.post("/accounts/signup")
async def signup(user_data: AccountIn):
    if users_collection.find_one({"email": user_data.email}):
        return {"message": "User already exists"}

    user={
        "email": user_data.email,
        "username": user_data.username,
        "password": user_data.password,
    }
    users_collection.insert_one(user)

    return{"message": "User created successfully"}
