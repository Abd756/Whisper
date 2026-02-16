import whisper
import os

def setup_model():
    model_name = "large-v3"
    download_path = "./models"
    
    print(f"Initializing download for Whisper model: {model_name}")
    print(f"Target location: {os.path.abspath(download_path)}")
    
    os.makedirs(download_path, exist_ok=True)
    
    # This function checks if the model exists in download_root.
    # If not, it downloads it. If yes, it loads it (verifying the file).
    # We load it to 'cpu' just to verify the download without allocating heavy GPU memory for this setup step,
    # or we can load to 'mps' to verify it fits. 
    # Since we just want to ensure it's downloaded, 'cpu' is fine for the setup script.
    
    try:
        model = whisper.load_model(model_name, download_root=download_path, device="cpu")
        print(f"SUCCESS: Model '{model_name}' is ready in '{download_path}'")
    except Exception as e:
        print(f"ERROR: Failed to download/load model. Reason: {e}")

if __name__ == "__main__":
    setup_model()
