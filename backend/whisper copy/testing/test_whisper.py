import whisper
import torch
import ssl

# Bypass SSL verification for model download if needed
ssl._create_default_https_context = ssl._create_unverified_context

def test_whisper():
    # Check if MPS is available
    device = "mps" if torch.backends.mps.is_available() else "cpu"
    print(f"Using device: {device}")
    
    if device == "cpu":
        print("WARNING: MPS not available. Running on CPU which will be slow.")
    else:
        print("SUCCESS: MPS is available. Running on GPU.")

    print("Loading tiny model...")
    # Load the tiny model (smallest one for quick test)
    model = whisper.load_model("tiny", device=device)
    print("Model loaded successfully.")
    
    # We can't easily transcribe without an audio file, but loading the model 
    # on the device is proof enough that the GPU is being accessed for memory.
    # To test actual computation, we can generate dummy audio.
    
    print("Generating dummy audio (silence) for inference test...")
    # 1 second of silence at 16kHz
    dummy_audio = torch.zeros(16000) 
    
    print("Transcribing dummy audio...")
    result = model.transcribe(dummy_audio)
    print("Transcription successful!")
    print(f"Result text: '{result['text']}'") # Should be empty or simple
    
if __name__ == "__main__":
    test_whisper()
