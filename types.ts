export interface ScanResult {
  items: string[];
}

export interface AnalysisState {
  status: 'idle' | 'scanning' | 'analyzing' | 'complete' | 'error';
  imageSrc: string | null;
  items: string[];
  errorMessage?: string;
}
