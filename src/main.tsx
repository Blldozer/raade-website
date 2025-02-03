import { StrictMode } from "react";  // Only import what we need
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./config/gsapConfig.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);