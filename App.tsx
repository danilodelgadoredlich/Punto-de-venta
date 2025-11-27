import React, { useState } from 'react';
import Scanner from './components/Scanner';
import ResultList from './components/ResultList';
import LoadingScreen from './components/LoadingScreen';
import { analyzeImageContent, fileToGenerativePart } from './services/geminiService';
import { AnalysisState } from './types';
import { ScanLine } from 'lucide-react';

const App: React.FC = () => {
  const [state, setState] = useState<AnalysisState>({
    status: 'idle',
    imageSrc: null,
    items: [],
  });

  const handleImageSelected = async (file: File) => {
    try {
      // 1. Show local preview immediately
      const base64Data = await fileToGenerativePart(file);
      const mimeType = file.type;
      const imageSrc = `data:${mimeType};base64,${base64Data}`;

      setState({
        status: 'analyzing',
        imageSrc,
        items: [],
      });

      // 2. Send to Gemini API
      const detectedItems = await analyzeImageContent(base64Data, mimeType);

      setState(prev => ({
        ...prev,
        status: 'complete',
        items: detectedItems,
      }));

    } catch (error: any) {
      console.error(error);
      setState(prev => ({
        ...prev,
        status: 'error',
        errorMessage: error.message || "Error desconocido",
      }));
    }
  };

  const handleReset = () => {
    setState({
      status: 'idle',
      imageSrc: null,
      items: [],
    });
  };

  return (
    <div className="app-container">
      
      {/* Navbar / Header */}
      <header className="navbar">
        <div className="navbar-content">
          <div className="brand">
            <div className="brand-icon">
              <ScanLine size={20} />
            </div>
            <span className="brand-text">
              ScanList<span>.AI</span>
            </span>
          </div>
          <div className="status-dot" />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="main-content">
        
        {state.status === 'idle' && (
          <div className="w-full flex justify-center animate-zoom">
            <Scanner 
              onImageSelected={handleImageSelected} 
              isProcessing={false} 
            />
          </div>
        )}

        {state.status === 'analyzing' && (
          <div className="w-full flex justify-center">
            <LoadingScreen />
          </div>
        )}

        {state.status === 'complete' && (
          <ResultList 
            items={state.items} 
            imageSrc={state.imageSrc} 
            onReset={handleReset} 
          />
        )}

        {state.status === 'error' && (
          <div className="error-box">
             <p className="error-msg">{state.errorMessage}</p>
             <button 
               onClick={handleReset}
               className="btn-error"
             >
               Intentar de nuevo
             </button>
          </div>
        )}

      </main>
    </div>
  );
};

export default App;