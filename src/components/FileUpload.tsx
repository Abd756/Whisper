'use client';

import React, { useState } from 'react';
import { CloudUpload, FileAudio, FileVideo } from 'lucide-react';
import { motion } from 'framer-motion';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

export default function FileUpload({ onFileSelect }: FileUploadProps) {
  const [isDragActive, setIsDragActive] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = () => {
    setIsDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      onFileSelect(files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      onFileSelect(files[0]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`glass h-[400px] flex flex-col items-center justify-center border-2 border-dashed transition-all cursor-pointer relative group
        ${isDragActive ? 'border-primary bg-primary/5' : 'border-white/10 hover:border-primary/50'}`}
      onClick={() => document.getElementById('file-input')?.click()}
    >
      <input
        id="file-input"
        type="file"
        accept="audio/*,video/*"
        className="hidden"
        onChange={handleFileChange}
      />
      
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />

      <motion.div
        animate={{ y: isDragActive ? -10 : 0 }}
        className="space-y-6 text-center z-10 p-8"
      >
        <div className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
          <CloudUpload size={48} className="text-primary" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-white">Upload Audio or Video</h3>
          <p className="text-gray-400 font-medium">Drag & drop your file here or click to browse</p>
        </div>
        <div className="flex items-center justify-center gap-6 mt-8">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <FileAudio size={16} /> MP3, WAV, M4A
          </div>
          <div className="w-1 h-1 bg-gray-700 rounded-full" />
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <FileVideo size={16} /> MP4, MOV, AVI
          </div>
        </div>
      </motion.div>

      {isDragActive && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-20 rounded-[1.5rem]">
          <h2 className="text-3xl font-bold text-primary animate-pulse">Drop to Upload</h2>
        </div>
      )}
    </motion.div>
  );
}
