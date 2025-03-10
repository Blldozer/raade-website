
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Initialize the app
const initialize = () => {
  const rootElement = document.getElementById("root");
  
  if (!rootElement) {
    console.error("Failed to find the root element");
    return;
  }
  
  createRoot(rootElement).render(<App />);
};

// Execute initialization
initialize();
