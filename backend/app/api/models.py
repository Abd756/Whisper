from pydantic import BaseModel

class TranscribeResponse(BaseModel):
    session_id: str
    text: str
    language: str | None = None
