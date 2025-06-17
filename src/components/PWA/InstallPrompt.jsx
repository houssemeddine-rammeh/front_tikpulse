import React from 'react';
import { X, Download, Smartphone } from 'lucide-react';



export const InstallPrompt = ({
  onInstall,
  onDismiss,
  isVisible
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 animate-slide-up">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl shadow-2xl p-4 mx-auto max-w-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Install TikPluse</h3>
              <p className="text-sm opacity-90">Get the full app experience</p>
            </div>
          </div>
          <button
            onClick={onDismiss}
            className="p-1 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Dismiss install prompt"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="mt-4 flex space-x-3">
          <button
            onClick={onInstall}
            className="flex-1 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Install</span>
          </button>
          <button
            onClick={onDismiss}
            className="px-4 py-2 text-white/80 hover:text-white transition-colors"
          >
            Not now
          </button>
        </div>
        
        <div className="mt-3 text-xs opacity-75">
          • Works offline • Fast loading • Native app feel
        </div>
      </div>
    </div>
  );
};

export default InstallPrompt; 

