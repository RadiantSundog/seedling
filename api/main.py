from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from authenticator import authenticator
from routers import accounts, gardens, journals, plants, tasks, identify
import os


app = FastAPI()
app.include_router(authenticator.router)
app.include_router(accounts.router)
app.include_router(gardens.router)
app.include_router(journals.router)
app.include_router(plants.router)
app.include_router(tasks.router)
app.include_router(identify.router)

origins = [
    "http://localhost:3000",
    "https://push-the-buttons.gitlab.io/seedling",
    os.environ.get("CORS_HOST", None),
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
