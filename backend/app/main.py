from fastapi import FastAPI
from app.core.config import settings
from fastapi.middleware.cors import CORSMiddleware
from app.core.template import react_base_template
from app.schemas.chat import ChatRequest
from app.external.google.google import SnippetAgent

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


@app.post("/api/template")
async def get_template(request: ChatRequest):
    agent = SnippetAgent(model_name=settings.MODEL_NAME)
    valid_query = await agent.chat_with_agent_with_tools(
        prompt=request.user_query,
    )
    return {"valid_query": valid_query, "template": react_base_template}


@app.post("/api/chat")
async def chat_with_agent(request: ChatRequest):
    agent = SnippetAgent(model_name=settings.MODEL_NAME)
    response = await agent.chat_with_agent(prompt=request.user_query)
    return response


@app.get("/settings")
def get_settings():
    return {
        "environment": settings.ENVIRONMENT,
        "app_name": settings.APP_NAME,
        "api_prefix": settings.API_PREFIX,
        "host_url": settings.HOST_URL,
    }
