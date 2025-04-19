import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import components with correct lowercase filenames
import Welcome from './pages/welcome';
import Main from './pages/main';
import Cart from './pages/cart';
import Confirmation from './pages/confirmation';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* show Welcome at the root */}
        <Route path="/" element={<Welcome />} />

        {/* your other routes */}
        <Route path="/menu" element={<Main />} />
        {/* Remove route for cart-page */}
        {/* <Route path="/cart-page" element={<CartPage />} /> */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/confirmation" element={<Confirmation />} />

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
