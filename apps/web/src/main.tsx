import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastProvider } from './components/ui/feedback/ToastProvider.tsx';
import App from './App.tsx'

import "./styles/globals.css";
import "./styles/layout.css";
import "./styles/components.css";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastProvider>
    <App />
    </ToastProvider>  
  </StrictMode>,
)
