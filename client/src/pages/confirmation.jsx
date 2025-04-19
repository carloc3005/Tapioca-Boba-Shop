import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo_bubble_tea from '../assets/logo/bubble-tea.png';
import boba_confirmation from '../assets/logo/boba-confirmation.png';

export default function Confirmation() {
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [orderNumber, setOrderNumber] = useState('');

  useEffect(() => {
    // Retrieve user info from localStorage
    const name = localStorage.getItem('userName') || 'Valued Customer';
    const phone = localStorage.getItem('userPhone') || '';
    setUserName(name);
    setUserPhone(phone);

    // Generate a simple order number (e.g., based on timestamp)
    const generatedOrderNumber = `TE-${Date.now().toString().slice(-6)}`;
    setOrderNumber(generatedOrderNumber);

    // Optional: Clear cart from localStorage if needed
    // localStorage.removeItem('cartItems');

    // Optional: Clear user info after confirmation if desired
    // localStorage.removeItem('userName');
    // localStorage.removeItem('userPhone');

  }, []); // Run only once on component mount

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Simplified Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex items-center">
          <Link to="/menu" className="flex items-center mr-4">
            <img src={logo_bubble_tea} alt="Boba Icon" className="h-10 w-10 mr-2" />
            <span className="text-xl font-bold text-gray-800">Tapioca Express</span>
          </Link>
        </div>
      </header>

      {/* Main Confirmation Content */}
      <main className="flex-grow flex items-center justify-center container mx-auto px-4 py-12">
        <div className="confirmation-container bg-white rounded-lg shadow-xl p-8 md:p-12 max-w-lg w-full text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-indigo-600 mb-4">
            Thank You for Your Order, {userName}!
          </h2>
          <p className="text-gray-700 mb-2">
            Your order number is <strong id="order-number" className="text-gray-900">{orderNumber}</strong>.
          </p>
          {userPhone && (
            <p className="text-sm text-gray-500 mb-4">
              We may contact you at {userPhone} if needed.
            </p>
          )}
          <p className="text-gray-700 mb-6">
            We appreciate your business and hope you enjoy your drinks!
          </p>

          {/* Confirmation Image */}
          <div className="image-container mb-8 flex justify-center">
            <img src={boba_confirmation} alt="Bubble Tea Icon" className="confirmation-icon h-32 w-auto" />
          </div>

          {/* Link back to Home/Menu */}
          <Link
            to="/menu"
            className="home-link inline-block bg-indigo-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200"
          >
            Return to Menu
          </Link>
        </div>
      </main>

      {/* Optional Footer */}
      <footer className="bg-gray-800 text-gray-300 py-6 px-4 mt-auto">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Tapioca Express. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
