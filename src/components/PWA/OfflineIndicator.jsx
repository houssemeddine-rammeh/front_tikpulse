import React from 'react';
import { WifiOff, Wifi } from 'lucide-react';



export const OfflineIndicator = ({ isOffline }) => {
  if (!isOffline) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-slide-down">
      <div className="bg-red-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center space-x-2">
        <WifiOff className="w-4 h-4" />
        <span className="text-sm font-medium">You're offline</span>
      </div>
    </div>
  );
};



export const NetworkStatus = ({ 
  isOffline, 
  className = "" 
}) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {isOffline ? (
        <>
          <WifiOff className="w-4 h-4 text-red-500" />
          <span className="text-sm text-red-600 dark:text-red-400">Offline</span>
        </>
      ) : (
        <>
          <Wifi className="w-4 h-4 text-green-500" />
          <span className="text-sm text-green-600 dark:text-green-400">Online</span>
        </>
      )}
    </div>
  );
};

export default OfflineIndicator;

