import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {SessionStorageProvider} from "./pages/SessionStorageContext.jsx";

createRoot(document.getElementById('root')).render(
   <SessionStorageProvider>
    <App />
  </SessionStorageProvider>
)
