'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, RotateCcw, Share2, Download, Terminal } from 'lucide-react';

interface ResultCardProps {
  result: {
    text: string;
    session_id: string;
    language: string;
  };
  onCopy: () => void;
  onDownload: () => void;
  copied: boolean;
  onReset: () => void;
}

export default function ResultCard({ result, onCopy, onDownload, copied, onReset }: ResultCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass overflow-hidden flex flex-col h-full"
    >
      <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <Terminal size={18} />
          </div>
          <div>
            <h3 className="font-semibold text-white">Transcription Result</h3>
            <p className="text-xs text-gray-500">Session: #{result.session_id} • {result.language.toUpperCase()}</p>
          </div>
        </div>
        <div className="flex gap-2">
           <button 
            onClick={onCopy}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all flex items-center gap-2 text-sm px-4"
          >
            {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
          <button 
            onClick={onReset}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all"
            title="Start New"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>
      
      <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-300 leading-relaxed whitespace-pre-wrap text-lg font-light italic"
        >
          "{result.text}"
        </motion.p>
      </div>

      <div className="p-4 bg-white/5 border-t border-white/10 flex justify-between items-center px-6">
        <span className="text-xs text-gray-500 font-mono">ENCRYPTED END-TO-END</span>
        <div className="flex gap-4">
           <button 
            onClick={onDownload}
            className="text-xs text-gray-500 hover:text-white transition-colors flex items-center gap-1"
          >
             <Download size={14} /> Download TXT
           </button>
        </div>
      </div>
    </motion.div>
  );
}
