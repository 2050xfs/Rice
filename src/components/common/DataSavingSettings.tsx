"use client";

import { useState, useEffect } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useDataSaving } from '@/context/DataSavingContext';
import { Wifi, WifiOff, Smartphone } from 'lucide-react';

export default function DataSavingSettings() {
  const { 
    isLowDataMode, 
    setLowDataMode,
    isAutomaticDataSaving,
    setAutomaticDataSaving
  } = useDataSaving();
  const [connectionType, setConnectionType] = useState<string>('unknown');
  
  // Get connection information
  useEffect(() => {
    if (typeof navigator !== 'undefined' && 'connection' in navigator && (navigator as any).connection) {
      const connection = (navigator as any).connection;
      setConnectionType(connection.effectiveType || connection.type || 'unknown');
      
      const updateConnectionInfo = () => {
        setConnectionType(connection.effectiveType || connection.type || 'unknown');
      };
      
      connection.addEventListener('change', updateConnectionInfo);
      return () => {
        connection.removeEventListener('change', updateConnectionInfo);
      };
    }
  }, []);
  
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Data Saving Settings</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Smartphone className="h-5 w-5 text-gray-500" />
            <Label htmlFor="auto-data-saving" className="cursor-pointer">
              Automatic Data Saving
            </Label>
          </div>
          <Switch
            id="auto-data-saving"
            checked={isAutomaticDataSaving}
            onCheckedChange={setAutomaticDataSaving}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {isLowDataMode ? (
              <WifiOff className="h-5 w-5 text-amber-500" />
            ) : (
              <Wifi className="h-5 w-5 text-green-500" />
            )}
            <Label htmlFor="low-data-mode" className="cursor-pointer">
              Low Data Mode
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {isAutomaticDataSaving 
                  ? `Currently ${isLowDataMode ? 'enabled' : 'disabled'} (${connectionType} connection)`
                  : 'Manual control'}
              </p>
            </Label>
          </div>
          <Switch
            id="low-data-mode"
            checked={isLowDataMode}
            onCheckedChange={setLowDataMode}
            disabled={isAutomaticDataSaving}
          />
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
          Low data mode reduces animation quality and disables autoplay to save bandwidth.
        </p>
      </div>
    </div>
  );
}
