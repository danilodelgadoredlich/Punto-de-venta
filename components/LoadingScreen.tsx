import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] w-full p-8 text-center space-y-6">
      <div className="relative w-20 h-20 flex items-center justify-center">
        <div className="absolute inset-0 border-4 border-zinc-800 rounded-full"></div>
        <div className="absolute inset-0 border-t-4 border-green-500 rounded-full animate-spin"></div>
        <Loader2 className="text-green-500 animate-pulse" size={32} />
      </div>
      
      <div className="space-y-2">
        <h3 className="text-xl font-mono text-white font-bold animate-pulse">Procesando...</h3>
        <p className="text-sm font-mono text-zinc-500">
          Analizando imagen con Gemini Vision
        </p>
      </div>

      {/* Retro Console Logs simulation */}
      <div className="w-full max-w-xs bg-zinc-900 p-3 rounded border border-zinc-800 text-left space-y-1 opacity-70">
         <p className="text-[10px] font-mono text-green-500/80">> Initializing scan...</p>
         <p className="text-[10px] font-mono text-green-500/60">> Uploading buffer...</p>
         <p className="text-[10px] font-mono text-green-500/40 animate-pulse">> Identifying objects...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
