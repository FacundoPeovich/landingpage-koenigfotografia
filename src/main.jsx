// src/main.jsx
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js' // navbar toggler, tooltips, etc.

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Tus estilos (van después de Bootstrap para poder overridear)
import './index.css'
import './App.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
