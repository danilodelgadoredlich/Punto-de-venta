import React from 'react';
import { RefreshCw, Check, ArrowRight } from 'lucide-react';

interface ResultListProps {
  items: string[];
  imageSrc: string | null;
  onReset: () => void;
}

const ResultList: React.FC<ResultListProps> = ({ items, imageSrc, onReset }) => {
  return (
    <div className="w-full max-w-md mx-auto p-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Receipt/Terminal Container */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden shadow-2xl shadow-black">
        
        {/* Header Section with Image Preview */}
        <div className="relative h-48 bg-zinc-900 border-b border-zinc-800">
          {imageSrc && (
            <img 
              src={imageSrc} 
              alt="Scanned" 
              className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-500" 
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
            <div>
              <p className="text-green-500 text-xs font-mono uppercase tracking-widest mb-1">
                Análisis Completado
              </p>
              <h2 className="text-white font-mono text-xl font-bold">
                Items Detectados
              </h2>
            </div>
            <div className="h-8 w-8 rounded bg-green-900/30 border border-green-500/50 flex items-center justify-center text-green-400">
               <Check size={16} />
            </div>
          </div>
        </div>

        {/* List Items */}
        <div className="p-6 space-y-4 min-h-[300px]">
          {items.length === 0 ? (
            <div className="text-zinc-500 font-mono text-sm text-center py-10">
              No se detectaron objetos claros.
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item, index) => (
                <li 
                  key={index} 
                  className={`
                    flex items-center justify-between group
                    ${index === items.length - 1 ? 'pl-3 border-l-2 border-white' : ''} 
                  `}
                >
                  <span className={`
                    font-mono text-base truncate pr-4
                    ${index === items.length - 1 ? 'text-white font-bold' : 'text-zinc-400'}
                  `}>
                    {item}
                  </span>
                  
                  {index === items.length - 1 && (
                     <span className="text-xs text-zinc-600 font-mono uppercase">Nuevo</span>
                  )}
                </li>
              ))}
            </ul>
          )}
          
          {/* Decorative Divider */}
          <div className="border-t border-dashed border-zinc-800 my-6" />

          {/* Footer Info */}
          <div className="flex justify-between items-center text-xs font-mono text-zinc-500">
            <span>TOTAL ITEMS</span>
            <span>{items.length.toString().padStart(2, '0')}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="p-4 bg-zinc-900/50 border-t border-zinc-800">
          <button
            onClick={onReset}
            className="w-full py-3 px-4 rounded bg-green-600 hover:bg-green-500 text-black font-mono font-bold uppercase tracking-wide transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw size={18} />
            Escanear Otro
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultList;
