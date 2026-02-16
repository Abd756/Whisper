from fastapi import FastAPI
from contextlib import asynccontextmanager
from app.api.endpoints import router
from app.services.whisper_mlx_service import whisper_service

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Load model on startup
    whisper_service.load_model()
    yield
    # Clean up (if needed)

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Whisper Transcription API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

@app.get("/")
async def root():
    return {"message": "Whisper API is running"}
