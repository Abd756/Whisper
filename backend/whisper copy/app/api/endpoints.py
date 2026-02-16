from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from app.api.models import TranscribeResponse
from app.services.whisper_mlx_service import whisper_service
import shutil
import os
import uuid

router = APIRouter()

@router.post("/transcribe", response_model=TranscribeResponse)
async def transcribe(
    file: UploadFile = File(...),
    language: str | None = Form(None),
    session_id: str = Form(...)
):
    # Create a temporary file to store the upload
    file_ext = os.path.splitext(file.filename)[1]
    if not file_ext:
        file_ext = ".wav" # Default fall back
    temp_filename = f"temp_{uuid.uuid4()}{file_ext}"
    try:
        with open(temp_filename, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        # Transcribe
        text = await whisper_service.transcribe(temp_filename, language)
        
        return TranscribeResponse(
            session_id=session_id,
            text=text,
            language=language
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        # Clean up
        if os.path.exists(temp_filename):
            os.remove(temp_filename)
