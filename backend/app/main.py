from fastapi import FastAPI
from app.core.config import settings
from fastapi.middleware.cors import CORSMiddleware
from app.core.template import react_base_template

app = FastAPI(
    title=settings.APP_NAME,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"message": "Welcome to the FastAPI server!"}


@app.get("/api/template")
def get_template():
    return react_base_template


@app.get("/settings")
def get_settings():
    return {
        "environment": settings.ENVIRONMENT,
        "app_name": settings.APP_NAME,
        "api_prefix": settings.API_PREFIX,
        "host_url": settings.HOST_URL,
    }
