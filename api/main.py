from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from authenticator import authenticator
<<<<<<< HEAD
from routers import accounts, gardens, journals, plants, tasks
=======
from routers import accounts, gardens, plants
from routers import accounts, gardens, journals
>>>>>>> 38c9ae9d47b49b3f95c774425db626b73eb9fc9c
import os


app = FastAPI()
app.include_router(authenticator.router)
app.include_router(accounts.router)
app.include_router(gardens.router)
<<<<<<< HEAD
app.include_router(journals.router)
app.include_router(plants.router)
app.include_router(tasks.router)
=======
app.include_router(plants.router)
app.include_router(journals.router)

>>>>>>> 38c9ae9d47b49b3f95c774425db626b73eb9fc9c


app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("CORS_HOST", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
