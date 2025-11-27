import React from 'react';
import { RefreshCw, Check } from 'lucide-react';

interface ResultListProps {
  items: string[];
  imageSrc: string | null;
  onReset: () => void;
}

const ResultList: React.FC<ResultListProps> = ({ items, imageSrc, onReset }) => {
  return (
    <div className="result-wrapper">
      
      {/* Receipt/Terminal Container */}
      <div className="receipt-card">
        
        {/* Header Section with Image Preview */}
        <div className="receipt-header">
          {imageSrc && (
            <img 
              src={imageSrc} 
              alt="Scanned" 
              className="receipt-image"
            />
          )}
          <div className="receipt-overlay" />
          <div className="receipt-title-box">
            <div>
              <span className="receipt-label">
                Análisis Completado
              </span>
              <h2 className="receipt-title">
                Items Detectados
              </h2>
            </div>
            <div className="check-icon">
               <Check size={16} />
            </div>
          </div>
        </div>

        {/* List Items */}
        <div className="receipt-body">
          {items.length === 0 ? (
            <div className="empty-state">
              No se detectaron objetos claros.
            </div>
          ) : (
            <ul className="item-list">
              {items.map((item, index) => (
                <li 
                  key={index} 
                  className={`list-item ${index === items.length - 1 ? 'last' : ''}`}
                >
                  <span className="truncate pr-4">
                    {item}
                  </span>
                  
                  {index === items.length - 1 && (
                     <span className="new-badge">Nuevo</span>
                  )}
                </li>
              ))}
            </ul>
          )}
          
          {/* Decorative Divider */}
          <div className="divider" />

          {/* Footer Info */}
          <div className="receipt-footer">
            <span>TOTAL ITEMS</span>
            <span>{items.length.toString().padStart(2, '0')}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="actions">
          <button
            onClick={onReset}
            className="btn-primary"
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