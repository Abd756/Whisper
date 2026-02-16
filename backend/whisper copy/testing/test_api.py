from fastapi.testclient import TestClient
from app.main import app
import os

def test_transcribe_endpoint():
    # Use the existing harvard.wav for testing
    audio_file_path = "harvard.wav"
    
    if not os.path.exists(audio_file_path):
        print(f"SKIPPING: {audio_file_path} not found.")
        return

    print(f"Testing with file: {audio_file_path}")
    
    # Use TestClient as a context manager to trigger lifespan events
    with TestClient(app) as client:
        with open(audio_file_path, "rb") as f:
            files = {"file": ("harvard.wav", f, "audio/wav")}
            data = {"session_id": "test_session_123", "language": "en"}
            
            response = client.post("/transcribe", files=files, data=data)
        
        print(f"Status Code: {response.status_code}")
        if response.status_code == 200:
            json_resp = response.json()
            print("Response JSON Keys:", json_resp.keys())
            print(f"Session ID: {json_resp['session_id']}")
            print(f"Text Length: {len(json_resp['text'])}")
            print(f"Text Preview: {json_resp['text'][:100]}...")
            assert json_resp["session_id"] == "test_session_123"
            assert "text" in json_resp
            assert len(json_resp["text"]) > 0
        else:
            print("Response:", response.text)
            assert False, f"Request failed with status {response.status_code}"

if __name__ == "__main__":
    test_transcribe_endpoint()
