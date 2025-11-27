import React, { useRef } from 'react';
import { Camera, Upload } from 'lucide-react';

interface ScannerProps {
  onImageSelected: (file: File) => void;
  isProcessing: boolean;
}

const Scanner: React.FC<ScannerProps> = ({ onImageSelected, isProcessing }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageSelected(file);
    }
  };

  const triggerInput = () => {
    if (!isProcessing) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-6 p-6">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        capture="environment"
        className="hidden"
      />

      <div 
        onClick={triggerInput}
        className={`
          relative group cursor-pointer w-64 h-64 rounded-2xl 
          border-2 border-dashed border-zinc-700 hover:border-green-500/50
          bg-zinc-900/50 flex flex-col items-center justify-center
          transition-all duration-300 ease-out
          ${isProcessing ? 'opacity-50 pointer-events-none' : 'active:scale-95'}
        `}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 bg-green-500/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className="z-10 flex flex-col items-center space-y-4">
          <div className="p-4 rounded-full bg-zinc-800 text-green-400 group-hover:bg-zinc-800 group-hover:text-green-300 transition-colors shadow-lg shadow-black/50">
            <Camera size={48} />
          </div>
          <div className="text-center">
            <p className="text-lg font-mono font-bold text-zinc-200">Tomar Foto</p>
            <p className="text-xs font-mono text-zinc-500 mt-1">Tap Card Anytime</p>
          </div>
        </div>
      </div>

      <p className="text-xs text-zinc-600 font-mono text-center max-w-xs">
        Usa la cámara para escanear recibos, objetos o escenas.
        <br/>
        La IA identificará el contenido.
      </p>
    </div>
  );
};

export default Scanner;
