import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

console.log('🚀 Starting React app...');
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('ServiceWorker registration successful');
      })
      .catch(err => {
        console.log('ServiceWorker registration failed: ', err);
      });
  });
}
const rootElement = document.getElementById('root');
console.log('📍 Root element found:', rootElement);

if (!rootElement) {
  console.error('❌ Root element not found!');
} else {
  const root = ReactDOM.createRoot(rootElement);
  console.log('✅ React root created');
  
  root.render(<App />);
  console.log('✅ App component rendered');
}

