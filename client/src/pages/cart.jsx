import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo_bubble_tea from '../assets/logo/bubble-tea.png';
import { useCart } from '../context/CartContext'; // Import useCart
import Footer from '../components/Footer'; // Import Footer

export default function Cart() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart(); // Use cart context

  // Calculate totals based on cartItems from context
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const salesTaxRate = 0.0725;
  const salesTax = subtotal * salesTaxRate;
  const total = subtotal + salesTax;

  const handleCheckout = async () => { // Make the function async
    console.log('Proceeding to checkout...');

    // 1. Prepare the order data payload
    const orderData = {
      items: cartItems.map(item => ({
        name: item.name,
        sugar: item.sugar,
        boba: item.boba,
        quantity: item.quantity,
        price: item.price
      })),
      totalAmount: total // Use the calculated total
    };

    try {
      // 2. Send the POST request to the backend
      const response = await fetch('http://localhost:5001/api/orders', { // Use the full backend URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      // 3. Handle the response
      if (!response.ok) {
        // If response is not OK (e.g., 400, 500), throw an error
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit order');
      }

      // If response is OK (e.g., 201 Created)
      const result = await response.json();
      console.log('Order submitted successfully:', result);

      // 4. Clear cart and navigate ONLY on success
      clearCart();
      navigate('/confirmation'); // Navigate to the confirmation page

    } catch (error) {
      console.error('Checkout error:', error);
      // TODO: Display an error message to the user (e.g., using a state variable and rendering it)
      alert(`Error submitting order: ${error.message}`); // Simple alert for now
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Simplified Header for Cart Page */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex items-center">
          <Link to="/menu" className="flex items-center mr-4">
            <img src={logo_bubble_tea} alt="Boba Icon" className="h-10 w-10 mr-2" />
            <span className="text-xl font-bold text-gray-800">Tapioca Express</span>
          </Link>
          {/* Optional: Add a link back to the menu */}
          <Link to="/menu" className="text-indigo-600 hover:text-indigo-800 ml-auto">
            &larr; Back to Menu
          </Link>
        </div>
      </header>

      {/* Main Cart Content */}
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="cart-container bg-white rounded-lg shadow-lg p-6 md:p-8 max-w-2xl mx-auto">
          <h2 className="cart-title text-2xl md:text-3xl font-bold text-center mb-6 text-gray-800">Your Cart</h2>

          {/* Cart Items Section */}
          <div className="cart-items mb-6 divide-y divide-gray-200">
            {cartItems.length === 0 ? (
              <p className="text-center text-gray-500 py-4">Your cart is empty.</p>
            ) : (
              cartItems.map(item => (
                <div key={item.id} className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div className="mb-2 sm:mb-0">
                    <h3 className="font-semibold text-gray-700">{item.name}</h3>
                    {/* Display customizations */}
                    <p className="text-sm text-gray-500">Sugar: {item.sugar}, Boba: {item.boba}</p>
                    <div className="flex items-center mt-1">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="text-indigo-600 hover:text-indigo-800 px-2 py-1 border border-gray-300 rounded-l"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 border-t border-b border-gray-300">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="text-indigo-600 hover:text-indigo-800 px-2 py-1 border border-gray-300 rounded-r"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="text-right flex items-center">
                    <p className="font-semibold text-gray-800 mr-4">${(item.price * item.quantity).toFixed(2)}</p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium"
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Totals Section */}
          {cartItems.length > 0 && (
            <div className="cart-total border-t border-gray-200 pt-6 mb-6 space-y-2 text-right">
              <p className="text-gray-600"><strong>Subtotal:</strong> <span id="subtotal" className="font-semibold text-gray-800">${subtotal.toFixed(2)}</span></p>
              <p className="text-gray-600"><strong>Sales Tax ({(salesTaxRate * 100).toFixed(2)}%):</strong> <span id="sales-tax" className="font-semibold text-gray-800">${salesTax.toFixed(2)}</span></p>
              <p className="text-xl font-bold text-gray-900"><strong>Total:</strong> <span id="total">${total.toFixed(2)}</span></p>
            </div>
          )}

          {/* Checkout Button Container */}
          {cartItems.length > 0 && (
            <div className="checkout-button-container text-center">
              <button
                id="checkout-button"
                onClick={handleCheckout}
                className="checkout-button bg-indigo-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200 w-full md:w-auto"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </main> {/* Add the closing main tag back */}

      {/* Footer */}
      <Footer />
    </div>
  );
}
