"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type DataSavingContextType = {
  isLowDataMode: boolean;
  setLowDataMode: (value: boolean) => void;
  isAutomaticDataSaving: boolean;
  setAutomaticDataSaving: (value: boolean) => void;
};

const DataSavingContext = createContext<DataSavingContextType | undefined>(undefined);

export function DataSavingProvider({ children }: { children: ReactNode }) {
  const [isLowDataMode, setLowDataMode] = useState(false);
  const [isAutomaticDataSaving, setAutomaticDataSaving] = useState(true);
  
  // Check connection type and set low data mode automatically
  useEffect(() => {
    if (!isAutomaticDataSaving) return;
    
    const checkConnection = () => {
      if (typeof navigator !== 'undefined' && 'connection' in navigator && (navigator as any).connection) {
        const connection = (navigator as any).connection;
        const isSlow = connection.effectiveType === '2g' || connection.effectiveType === '3g';
        const isCellular = connection.type === 'cellular';
        const isSaveData = connection.saveData === true;
        
        setLowDataMode(isSlow || isCellular || isSaveData);
      }
    };
    
    checkConnection();
    
    if (typeof navigator !== 'undefined' && 'connection' in navigator && (navigator as any).connection) {
      (navigator as any).connection.addEventListener('change', checkConnection);
      return () => {
        (navigator as any).connection.removeEventListener('change', checkConnection);
      };
    }
  }, [isAutomaticDataSaving]);
  
  return (
    <DataSavingContext.Provider value={{
      isLowDataMode,
      setLowDataMode,
      isAutomaticDataSaving,
      setAutomaticDataSaving
    }}>
      {children}
    </DataSavingContext.Provider>
  );
}

export function useDataSaving() {
  const context = useContext(DataSavingContext);
  if (context === undefined) {
    throw new Error('useDataSaving must be used within a DataSavingProvider');
  }
  return context;
}
