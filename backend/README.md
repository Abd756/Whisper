# Whisper Backend Setup

This guide explains how to set up the environment, run the backend, and expose it via ngrok.

## 1. Environment Setup

First, activate the virtual environment.

### Mac / Linux
```bash
# Activate virtual environment
source venv/bin/activate
```

### Windows (PowerShell)
```powershell
# Activate virtual environment
.\venv\Scripts\Activate.ps1
```

### Windows (Command Prompt)
```cmd
# Activate virtual environment
venv\Scripts\activate.bat
```

## 2. Install Dependencies

If setting up for the first time, install the required packages:

```bash
pip install -r requirements.txt
```

## 3. Run the Backend

Run the FastAPI server using `uvicorn`.

```bash
uvicorn app.main:app --reload
```

The server will start at `http://127.0.0.1:8000`.

## 4. Expose via ngrok

Open a **new terminal window**, activate the virtual environment (optional for ngrok but good practice), and run:

```bash
ngrok http 8000
```

Look for the `Forwarding` URL in the output (e.g., `https://<random-id>.ngrok-free.app`). 
Use this URL to access your API externally.
