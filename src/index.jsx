import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

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

