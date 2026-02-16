import os
import torch

class Settings:
    MODEL_NAME: str = "large-v3"
    MODEL_PATH: str = os.path.abspath("./models")
    # Determine device: "mps" for Mac Silicon, else "cpu"
    DEVICE: str = "mps" if torch.backends.mps.is_available() else "cpu"

settings = Settings()
