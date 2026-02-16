
import time
import sys
import os
# Ensure app is in path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.services.whisper_mlx_service import whisper_service

def run_benchmark():
    audio_file = "harvard.wav"
    if not os.path.exists(audio_file):
        print("harvard.wav not found. Skipping benchmark.")
        return

    print("Warming up model...")
    try:
        # First run includes model loading/compilation
        start = time.time()
        whisper_service._transcribe_sync(audio_file)
        print(f"Warmup time: {time.time() - start:.2f}s")
    except Exception as e:
        print(f"Error during warmup: {e}")
        return

    print("Running benchmark (3 iterations)...")
    times = []
    for i in range(3):
        start = time.time()
        whisper_service._transcribe_sync(audio_file)
        duration = time.time() - start
        times.append(duration)
        print(f"Run {i+1}: {duration:.2f}s")

    avg_time = sum(times) / len(times)
    print(f"\nAverage Inference Time: {avg_time:.2f}s")

if __name__ == "__main__":
    run_benchmark()
