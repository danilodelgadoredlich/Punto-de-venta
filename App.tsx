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
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-green-500/30">
      
      {/* Navbar / Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-900">
        <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-green-500/10 p-2 rounded text-green-500">
              <ScanLine size={20} />
            </div>
            <span className="font-mono font-bold tracking-tight text-white">
              ScanList<span className="text-green-500">.AI</span>
            </span>
          </div>
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="pt-24 pb-12 px-4 flex flex-col items-center justify-start min-h-screen max-w-md mx-auto">
        
        {state.status === 'idle' && (
          <div className="flex-1 flex flex-col justify-center w-full animate-in zoom-in-95 duration-500">
            <Scanner 
              onImageSelected={handleImageSelected} 
              isProcessing={false} 
            />
          </div>
        )}

        {state.status === 'analyzing' && (
          <div className="flex-1 flex flex-col justify-center w-full">
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
          <div className="p-6 bg-red-950/30 border border-red-900 rounded-lg text-center space-y-4">
             <p className="text-red-400 font-mono text-sm">{state.errorMessage}</p>
             <button 
               onClick={handleReset}
               className="text-white bg-red-900 hover:bg-red-800 px-4 py-2 rounded font-mono text-xs uppercase"
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
