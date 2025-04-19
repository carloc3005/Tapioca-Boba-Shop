import React, { createContext, useState, useContext } from 'react';

// Create the context
const CartContext = createContext();

// Create a custom hook to use the cart context
export const useCart = () => {
  return useContext(CartContext);
};

// Create the provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Function to add an item to the cart with customizations
  const addToCart = (itemToAdd) => {
    // Add a unique ID to distinguish items, even with same name/options
    const newItem = {
      ...itemToAdd,
      id: `${itemToAdd.name}-${itemToAdd.sugar}-${itemToAdd.boba}-${Date.now()}`, // Unique ID
      quantity: 1 // Start with quantity 1 for each new addition
    };

    // Add the new item as a distinct entry
    setCartItems(prevItems => [...prevItems, newItem]);

    console.log('Added to cart:', newItem);
    // TODO: Optionally add user feedback (e.g., toast notification)
  };

  // Function to remove an item from the cart by its unique ID
  const removeFromCart = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    console.log('Removed item:', itemId);
  };

  // Function to update the quantity of a specific item in the cart
  const updateQuantity = (itemId, amount) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId
          ? { ...item, quantity: Math.max(1, item.quantity + amount) } // Ensure quantity doesn't go below 1
          : item
      ).filter(item => item.quantity > 0) // Remove item if quantity becomes 0 or less
    );
  };

  // Function to clear the entire cart
  const clearCart = () => {
    setCartItems([]);
    console.log('Cart cleared');
  };


  // Value provided by the context
  const value = {
    cartItems,
    addToCart,
    removeFromCart, // Add new functions to context value
    updateQuantity,
    clearCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
