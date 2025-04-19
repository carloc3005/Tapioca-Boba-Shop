import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'    // ← pulls in Tailwind
import { CartProvider } from './context/CartContext'; // Import CartProvider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider> {/* Wrap App with CartProvider */}
      <App />
    </CartProvider>
  </React.StrictMode>
)
