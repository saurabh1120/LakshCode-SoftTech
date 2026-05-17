// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import './mobile.css'
import { HelmetProvider } from 'react-helmet-async'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <App />
    <ToastContainer position="top-right" autoClose={3000} theme="dark" />
  </HelmetProvider>
)