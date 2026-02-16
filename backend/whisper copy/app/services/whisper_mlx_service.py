import mlx_whisper
from app.core.config import settings
import asyncio
from concurrent.futures import ThreadPoolExecutor

class WhisperMLXService:
    def __init__(self):
        # MLX Whisper handles caching internally, but we can define the model path here
        # We use the MLX community converted models usually, e.g. "mlx-community/whisper-large-v3-mlx"
        # Or we can convert the local one. For simplicity and best performance, we often search/download the mlx version.
        # However, to use the LOCAL existing model structure, we might need to convert it or just use the HF repo.
        # Given the user wants speed, we should recommend using the mlx-community optimized weights.
        self.model_path = "mlx-community/whisper-large-v3-mlx" 
        self.executor = ThreadPoolExecutor(max_workers=1)

    def load_model(self):
        # MLX loads lazily/caches, but we can do a dummy transcribe to warm it up
        print(f"Warming up MLX Whisper model: {self.model_path}")
        try:
             # Warmup with short silence is tricky without audio file, but we can just let the first request handle it
             # or try to load weights if the library exposes it.
             # mlx_whisper doesn't have a direct 'load_model' returning an object in the same way as openai-whisper
             # It acts more like a functional API.
             pass
        except Exception as e:
            print(f"Error checking MLX model: {e}")

    def _transcribe_sync(self, audio_path: str, language: str = None):
        print(f"Transcribing {audio_path} using MLX Whisper (language={language})...")
        
        # Build decode options
        decode_options = {}
        if language:
            decode_options["language"] = language

        # mlx_whisper.transcribe(audio_file, path_or_hf_repo=model_path, **kwargs)
        result = mlx_whisper.transcribe(
            audio_path, 
            path_or_hf_repo=self.model_path,
            **decode_options
        )
        return result["text"]

    async def transcribe(self, audio_path: str, language: str = None) -> str:
        loop = asyncio.get_running_loop()
        return await loop.run_in_executor(self.executor, self._transcribe_sync, audio_path, language)

# Global instance
whisper_service = WhisperMLXService()
