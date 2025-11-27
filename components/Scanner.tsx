import React, { useRef } from 'react';
import { Camera } from 'lucide-react';

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
    <div className="scanner-container">
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
        className={`scanner-zone ${isProcessing ? 'disabled' : ''}`}
      >
        <div className="scanner-glow" />

        <div className="scanner-text">
          <div className="flex justify-center">
            <div className="scanner-icon-wrapper">
              <Camera size={48} />
            </div>
          </div>
          <div>
            <p className="scanner-title">Tomar Foto</p>
            <p className="scanner-subtitle">Tap Card Anytime</p>
          </div>
        </div>
      </div>

      <p className="scanner-help">
        Usa la cámara para escanear recibos, objetos o escenas.
        <br/>
        La IA identificará el contenido.
      </p>
    </div>
  );
};

export default Scanner;