import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="loading-container">
      <div className="spinner-wrapper">
        <div className="spinner-bg"></div>
        <div className="spinner-fg"></div>
        <div style={{ position: 'absolute', color: '#22c55e' }}>
          <Loader2 size={32} />
        </div>
      </div>
      
      <div className="loading-text">
        <h3>Procesando...</h3>
        <p>
          Analizando imagen con Gemini Vision
        </p>
      </div>

      {/* Retro Console Logs simulation */}
      <div className="console-box">
         <span className="console-line line-1">> Initializing scan...</span>
         <span className="console-line line-2">> Uploading buffer...</span>
         <span className="console-line line-3">> Identifying objects...</span>
      </div>
    </div>
  );
};

export default LoadingScreen;