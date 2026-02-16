import TranscriptionApp from '@/components/TranscriptionApp';
import { Cpu } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen py-12 px-6">
      <header className="fixed top-0 left-0 right-0 z-50 px-8 py-4 flex items-center justify-between border-b border-white/5 bg-background/50 backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Cpu size={20} className="text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-white">Whisper<span className="text-primary italic">AI</span></span>
        </div>
      </header>

      <div className="pt-24 pb-12">
        <TranscriptionApp />
      </div>

      <footer className="mt-20 border-t border-white/5 py-12 text-center space-y-4">
        <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Contact Support</a>
        </div>
        <p className="text-gray-600 text-xs text-center">
          Built with Next.js, Tailwind CSS & Whisper AI. Powered by ngrok.
        </p>
      </footer>
    </main>
  );
}
