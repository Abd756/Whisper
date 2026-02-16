import sys
import torch

def check_environment():
    print(f"Python Version: {sys.version}")
    
    # Check PyTorch
    print(f"PyTorch Version: {torch.__version__}")
    
    # Check MPS availability
    if torch.backends.mps.is_available():
        print("MPS (Metal Performance Shaders) is available: True")
        device = torch.device("mps")
        # specific check for mps
        x = torch.ones(1, device=device)
        print(f"Tensor successfully created on device: {x.device}")
    else:
        print("MPS (Metal Performance Shaders) is available: False")
        if not torch.backends.mps.is_built():
             print("MPS not built into this PyTorch build")
        
if __name__ == "__main__":
    check_environment()
