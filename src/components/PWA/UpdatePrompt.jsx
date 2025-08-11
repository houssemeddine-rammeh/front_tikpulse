import React from 'react';
import { RefreshCw, X } from 'lucide-react';



export const UpdatePrompt = ({
  onUpdate,
  onDismiss,
  isVisible
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed top-4 left-4 right-4 z-50 animate-slide-down">
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl p-4 mx-auto max-w-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
              <RefreshCw className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                Update Available
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                A new version of TikPluse is ready
              </p>
            </div>
          </div>
          <button
            onClick={onDismiss}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            aria-label="Dismiss update prompt"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
        
        <div className="mt-4 flex space-x-3">
          <button
            onClick={onUpdate}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Update Now</span>
          </button>
          <button
            onClick={onDismiss}
            className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
          >
            Later
          </button>
        </div>
        
        <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
          • Bug fixes • Performance improvements • New features
        </div>
      </div>
    </div>
  );
};

export default UpdatePrompt; 

