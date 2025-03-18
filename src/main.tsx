
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import App from './App.tsx'
import './index.css'

// Get the root element
const rootElement = document.getElementById("root");

// Add error handling for root element
if (!rootElement) {
  console.error("Failed to find the root element");
  document.body.innerHTML = '<div style="color: red; padding: 20px;">Failed to load application: Root element not found</div>';
} else {
  try {
    // Create root and render app
    const root = createRoot(rootElement);
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
    console.log("Application rendered successfully");
  } catch (error) {
    console.error("Failed to render the application", error);
    rootElement.innerHTML = '<div style="color: red; padding: 20px;">Failed to load application. Please try refreshing the page.</div>';
  }
}
