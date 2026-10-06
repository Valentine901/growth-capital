import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import QueryContextProvider from './tesla/context/QueryContext.jsx';
import AuthProvider from './tesla/context/AuthContext.jsx';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <QueryContextProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </QueryContextProvider>
    </AuthProvider>
  </StrictMode>,
)
