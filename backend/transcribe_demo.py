import whisper
import torch
import os
import sys

# Configuration
MODEL_NAME = "large-v3"
MODEL_PATH = "./models"
DEVICE = "mps" if torch.backends.mps.is_available() else "cpu"

def transcribe_audio(audio_path=None):
    print(f"Loading model '{MODEL_NAME}' from '{MODEL_PATH}' on device '{DEVICE}'...")
    
    try:
        # Load the model from the local directory
        model = whisper.load_model(MODEL_NAME, download_root=MODEL_PATH, device=DEVICE)
        print("Model loaded successfully.")
    except Exception as e:
        print(f"Error loading model: {e}")
        return

    if audio_path and os.path.exists(audio_path):
        print(f"Transcribing file: {audio_path}")
        # MPS often requires FP32 for stability
        result = model.transcribe(audio_path, fp16=False)
        print("\nTranscription Result:")
        print("-" * 40)
        print(result["text"])
        print("-" * 40)
    else:
        print("No audio file provided or file not found.")
        print("Running dummy inference (silence) to verify computation...")
        
        # 3 seconds of silence
        dummy_audio = torch.zeros(16000 * 3)
        
        # MPS often requires FP32 for stability on some operations
        print("Transcribing with fp16=False for MPS stability...")
        result = model.transcribe(dummy_audio, fp16=False)
        
        print("\nDummy Transcription Result (should be empty/silence):")
        print(f"'{result['text']}'")
        print("Inference successful.")

if __name__ == "__main__":
    # Check for command line argument
    if len(sys.argv) > 1:
        audio_file = sys.argv[1]
    else:
        audio_file = None
        
    transcribe_audio(audio_file)
