'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FileAudio, FileVideo, RotateCcw, Clock, Globe, Layout, Send } from 'lucide-react';
import FileUpload from '@/components/FileUpload';
import ResultCard from '@/components/ResultCard';

const API_URL = 'https://nontactical-annelle-obversely.ngrok-free.dev/transcribe';

export default function TranscriptionApp() {
  const [file, setFile] = useState<File | null>(null);
  const [sessionId, setSessionId] = useState(() => Math.floor(1000 + Math.random() * 9000).toString());
  const [language, setLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ text: string; session_id: string; language: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !sessionId) {
      setError('Please provide both a file and a Session ID.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('session_id', sessionId);
    formData.append('language', language);

    try {
      const response = await axios.post(API_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'ngrok-skip-browser-warning': 'true',
        },
      });
      setResult(response.data);
    } catch (err: unknown) {
      console.error('Transcription error:', err);
      if (axios.isAxiosError(err)) {
        if (!err.response) {
          setError('Network Error: Please ensure the backend API is running and accessible (check ngrok status).');
        } else {
          setError(err.response.data?.error || `Error ${err.response.status}: Failed to transcribe.`);
        }
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const reset = () => {
    setFile(null);
    setResult(null);
    setError(null);
    setSessionId(Math.floor(1000 + Math.random() * 9000).toString());
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-5xl font-bold tracking-tight">
          <span className="gradient-text">Whisper</span> Transcribe
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Elevate your content with AI-powered transcription. Fast, accurate, and premium.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <div className="glass p-6 space-y-6">
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-300">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock size={16} className="text-primary" />
                    Session ID
                  </div>
                  <input
                    type="text"
                    value={sessionId}
                    onChange={(e) => setSessionId(e.target.value)}
                    placeholder="Enter session ID"
                    className="w-full px-4 py-3 rounded-xl premium-input text-white text-sm"
                  />
                </label>
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-300">
                  <div className="flex items-center gap-2 mb-2">
                    <Globe size={16} className="text-primary" />
                    Language
                  </div>
                  <input
                    type="text"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    placeholder="e.g. en, fr, es"
                    className="w-full px-4 py-3 rounded-xl premium-input text-white text-sm"
                  />
                  <p className="text-[10px] text-gray-500 mt-2 italic">
                    Tip: Specify the spoken language for higher accuracy.
                  </p>
                </label>
              </div>

              {file && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 rounded-xl bg-primary/10 border border-primary/20 flex items-center gap-3"
                >
                  <div className="p-2 rounded-lg bg-primary/20 text-primary">
                    {file.type.includes('video') ? <FileVideo size={20} /> : <FileAudio size={20} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{file.name}</p>
                    <p className="text-xs text-gray-400">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                  </div>
                  <button onClick={() => setFile(null)} className="text-gray-500 hover:text-white">
                    <RotateCcw size={16} />
                  </button>
                </motion.div>
              )}

              <button
                onClick={handleSubmit}
                disabled={isLoading || !file || !sessionId}
                className="w-full py-4 rounded-xl premium-button text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                    Transcribe Now
                  </>
                )}
              </button>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          {!file ? (
            <FileUpload onFileSelect={setFile} />
          ) : result ? (
            <ResultCard 
              result={result} 
              onCopy={copyToClipboard} 
              copied={copied} 
              onReset={reset} 
            />
          ) : isLoading ? (
             <div className="glass h-[400px] flex flex-col items-center justify-center p-8 text-center space-y-6">
                <div className="relative">
                   <div className="w-20 h-20 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                   <motion.div 
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute inset-0 flex items-center justify-center"
                   >
                     <FileAudio size={24} className="text-primary" />
                   </motion.div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-white">Transcribing your audio...</h3>
                  <p className="text-gray-400">This might take a few moments depending on the file size.</p>
                </div>
             </div>
          ) : error ? (
            <div className="glass p-8 text-center space-y-4 border-red-500/20 bg-red-500/5">
              <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto">
                <RotateCcw size={32} />
              </div>
              <h3 className="text-xl font-semibold text-white">Error Occurred</h3>
              <p className="text-gray-400">{error}</p>
              <button 
                onClick={() => setError(null)}
                className="px-6 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="glass h-[400px] flex flex-col items-center justify-center p-8 text-center space-y-4">
              <div className="w-16 h-16 bg-white/5 text-gray-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Layout size={32} />
              </div>
              <h3 className="text-xl font-semibold text-white">Ready for Transcription</h3>
              <p className="text-gray-400">Your file is loaded. Click the button on the left to start the process.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
