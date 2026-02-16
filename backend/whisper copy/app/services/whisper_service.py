import whisper
import torch
import asyncio
from concurrent.futures import ThreadPoolExecutor
from app.core.config import settings

class WhisperService:
    def __init__(self):
        self.model = None
        self.executor = ThreadPoolExecutor(max_workers=1)

    def load_model(self):
        print(f"Loading Whisper model '{settings.MODEL_NAME}' on {settings.DEVICE}...")
        try:
            self.model = whisper.load_model(
                settings.MODEL_NAME, 
                download_root=settings.MODEL_PATH, 
                device=settings.DEVICE
            )
            print("Whisper model loaded successfully.")
        except Exception as e:
            print(f"Failed to load Whisper model: {e}")
            raise e

    def _transcribe_sync(self, audio_path: str, language: str = None):
        if not self.model:
            raise RuntimeError("Model not loaded")
        
        # Determine fp16 based on device
        fp16 = False if settings.DEVICE == "mps" else True

        options = {"fp16": fp16}
        if language:
            options["language"] = language

        print(f"Transcribing {audio_path} with language={language}...")
        result = self.model.transcribe(audio_path, **options)
        return result["text"]

    async def transcribe(self, audio_path: str, language: str = None) -> str:
        loop = asyncio.get_running_loop()
        return await loop.run_in_executor(self.executor, self._transcribe_sync, audio_path, language)

# Global instance
whisper_service = WhisperService()
