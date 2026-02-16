# Whisper AI Transcription System

A high-performance, professional-grade transcription application powered by OpenAI's Whisper. This project is optimized for modern hardware and provides a sleek, premium web interface.

## ✨ Features

- **Whisper Large v3**: Utilizes the latest and most powerful Whisper model for state-of-the-art accuracy.
- **Mac M-Series Optimization**: Specially tuned for Apple Silicon (M1, M2, M3) using optimized inference libraries for lightning-fast processing on Mac hardware.
- **Premium Frontend**: A modern Next.js 16 dashboard with glassmorphism, real-time feedback, and a dark-first aesthetic.
- **Multi-Format Support**: Seamlessly transcribes both audio and video files.
- **Smart Session Management**: Track transcriptions via session IDs with multi-language support.

## 🏗️ Project Structure

```bash
Whisper/
├── frontend/   # Next.js Application (React, Tailwind CSS, Framer Motion)
└── backend/    # Python API (Whisper Large v3, Mac M-Chip optimized)
```

## 🚀 Getting Started

### 1. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 2. Backend Setup
- Ensure you have Python 3.10+ installed.
- Install optimized Whisper dependencies for Mac M chips (MPS/MLX).
- Start the server to expose the `/transcribe` endpoint.

## 🛠️ Tech Stack

- **Frontend**: Next.js (App Router), TypeScript, Tailwind CSS, Lucide Icons, Framer Motion.
- **Backend**: Python, OpenAI Whisper Large v3, ngrok.
- **Inference**: Optimized for MPS (Metal Performance Shaders) on macOS.

---
Built with ❤️ for high-performance transcription.
