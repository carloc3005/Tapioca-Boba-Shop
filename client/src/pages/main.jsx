// src/pages/Main.jsx
import React, { useState } from 'react'; // Import useState
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Import useCart

// Import images
import classic_milk_tea from '../assets/Drinks/Classic-Milk-Tea.png';
import thai_milk_tea from '../assets/Drinks/thai-milk-tea.png';
import matcha_milk_tea from '../assets/Drinks/matcha-milk-tea.png';
import oolong_milk_tea from '../assets/Drinks/oolong-milk-tea.png';
import earl_grey_milk_tea from '../assets/Drinks/earl-grey-milk-tea.png';
import strawberry_milk_tea from '../assets/Drinks/strawberry-milk-tea.png';
import burst_my_boba from '../assets/Drinks/burst-my-boba.png';
import oh_my_boba from '../assets/Drinks/oh-my-boba.png';
import bubble_trouble from '../assets/Drinks/bubble-trouble.png';
import sippin_on_pearls from '../assets/Drinks/sippin-on-pearls.png';
import the_final_sip from '../assets/Drinks/the-final-sip.png';
import bean_there_boba_that from '../assets/Drinks/bean-there-boba-that.png';
import shake_it_up_tea from '../assets/Drinks/shake-it-up-tea.png';
import black_tea from '../assets/Drinks/black-tea.png';
import passion_fruit_green_tea from '../assets/Drinks/passion-fruit-green-tea.png';
import peach_green_tea from '../assets/Drinks/peach-green-tea.png';
import mango_green_tea from '../assets/Drinks/mango-green-tea.png';
import lemon_green_tea from '../assets/Drinks/lemon-green-tea.png';
import strawberry_smoothie from '../assets/Drinks/strawberry-smoothie.png';
import coconut_smoothie from '../assets/Drinks/coconut-smoothie.png';

import logo_bubble_tea from '../assets/logo/bubble-tea.png';
import logo_facebook from '../assets/logo/facebook.png';
import logo_instagram from '../assets/logo/instagram.png';
import logo_twitter from '../assets/logo/twitter.png';

// Menu Item Component (Helper)
const MenuItem = ({ imgSrc, name, description, price }) => {
  const { addToCart } = useCart(); // Get addToCart function
  const [showOptions, setShowOptions] = useState(false); // State to show/hide options
  const [selectedSugar, setSelectedSugar] = useState('100%'); // Default sugar
  const [addBoba, setAddBoba] = useState(true); // Default boba option

  const sugarLevels = ['No Sugar', '25%', '50%', '75%', '100%'];
  const bobaCost = 0.50;

  const handleAddToCartWithOptions = () => {
    const numericPrice = parseFloat(price.replace(/[^\d.]/g, ''));
    const finalPrice = addBoba ? numericPrice + bobaCost : numericPrice;

    addToCart({
      name,
      price: finalPrice, // Use price potentially adjusted for boba
      imgSrc,
      sugar: selectedSugar,
      boba: addBoba ? 'Yes' : 'No'
    });
    setShowOptions(false); // Hide options after adding
  };

  return (
    <div className="menu-item bg-white rounded-lg shadow-md p-4 flex flex-col items-center text-center relative"> {/* Added relative positioning */}
      <img src={imgSrc} alt={name} className="w-32 h-32 object-contain mb-4" />
      <h3 className="text-lg font-semibold mb-1">{name}</h3>
      <p className="text-sm text-gray-600 mb-2 flex-grow">{description}</p>
      {/* Display base price and conditional boba cost */}
      <p className="text-lg font-bold text-indigo-600 mb-3">
        {price}
        {addBoba && <span className="text-sm font-normal text-gray-500"> + ${bobaCost.toFixed(2)} Boba</span>}
      </p>

      {/* Toggle Options Button */}
      <button
        onClick={() => setShowOptions(!showOptions)}
        className={`bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition-colors duration-200 w-full mb-2 ${showOptions ? 'bg-gray-400 hover:bg-gray-500' : ''}`}
      >
        {showOptions ? 'Cancel' : 'Customize & Add'}
      </button>

      {/* Customization Options - Conditionally Rendered */}
      {showOptions && (
        <div className="options-overlay absolute bottom-0 left-0 right-0 bg-white bg-opacity-95 p-4 rounded-b-lg shadow-inner border-t border-gray-200 z-10">
          {/* Sugar Level */}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Sugar Level:</label>
            <select
              value={selectedSugar}
              onChange={(e) => setSelectedSugar(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded text-sm"
            >
              {sugarLevels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>

          {/* Boba Option */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Add Boba?</label>
            <div className="flex justify-center space-x-4">
               <button
                 onClick={() => setAddBoba(true)}
                 className={`px-3 py-1 rounded border text-sm ${addBoba ? 'bg-indigo-500 text-white border-indigo-500' : 'bg-white text-gray-700 border-gray-300'}`}
               >
                 Yes (+${bobaCost.toFixed(2)})
               </button>
               <button
                 onClick={() => setAddBoba(false)}
                 className={`px-3 py-1 rounded border text-sm ${!addBoba ? 'bg-indigo-500 text-white border-indigo-500' : 'bg-white text-gray-700 border-gray-300'}`}
               >
                 No
               </button>
             </div>
          </div>

          {/* Confirm Add Button */}
          <button
            onClick={handleAddToCartWithOptions}
            className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors duration-200"
          >
            Add to Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default function Main() {
  const { cartItems } = useCart(); // Get cartItems for count
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0); // Calculate total quantity

  // TODO: Implement actual navigation if needed, these are placeholders
  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="logo flex items-center">
            <button onClick={() => handleScrollTo('home')} className="home-button mr-2">
              <img src={logo_bubble_tea} alt="Boba Icon" className="h-10 w-10" />
            </button>
            <span className="text-xl font-bold text-gray-800">Tapioca Express</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <button onClick={() => handleScrollTo('home')} className="text-gray-600 hover:text-indigo-600">Home</button>
            <button onClick={() => handleScrollTo('menu')} className="text-gray-600 hover:text-indigo-600">Menu</button>
            {/* <button onClick={() => handleScrollTo('order')} className="text-gray-600 hover:text-indigo-600">Order Online</button> */}
            {/* <button onClick={() => handleScrollTo('locations')} className="text-gray-600 hover:text-indigo-600">Locations</button> */}
          </nav>
          <div className="cart-container flex items-center space-x-4">
            {/* <button className="cta bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition-colors duration-200 hidden sm:block">Order Now</button> */}
            <Link to="/cart" className="view-cart-button bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 transition-colors duration-200">
              View Cart
            </Link>
            <div className="cart relative">
              <span className="cart-icon text-2xl">🛒</span>
              {/* Update cart count display */}
              {cartCount > 0 && (
                <span className="cart-count absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </div>
          </div>
          {/* TODO: Add mobile menu button */}
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white text-center py-20 px-4" id="home">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Sip Happiness, One Bubble at a Time!</h1>
        <p className="text-lg md:text-xl mb-8">Freshly brewed tea and premium ingredients just for you.</p>
        <div className="cta-buttons space-x-4">
          {/* <a href="#order" className="bg-white text-indigo-600 py-2 px-6 rounded font-semibold hover:bg-gray-100 transition-colors duration-200">Order Now</a> */}
          <button onClick={() => handleScrollTo('menu')} className="bg-transparent border-2 border-white text-white py-2 px-6 rounded font-semibold hover:bg-white hover:text-indigo-600 transition-colors duration-200">
            View Menu
          </button>
        </div>
      </section>

      {/* Menu Section Container */}
      <main className="container mx-auto px-4 py-12" id="menu">

        {/* Milk Teas Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">Milk Teas</h2>
          <p className="text-center text-gray-600 mb-8">Explore our delicious milk teas made with love!</p>
          <div className="menu-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <MenuItem imgSrc={classic_milk_tea} name="Classic Milk Tea" description="Sweet, creamy, and utterly delicious." price="$5.00" />
            <MenuItem imgSrc={thai_milk_tea} name="Thai Milk Tea" description="Rich, earthy flavors with a smooth texture." price="$5.50" />
            <MenuItem imgSrc={matcha_milk_tea} name="Matcha Milk Tea" description="Refreshing and vibrant with a hint of sweetness." price="$5.50" />
            <MenuItem imgSrc={oolong_milk_tea} name="Oolong Milk Tea" description="Oolong milk tea is a creamy and refreshing beverage" price="$6.00" />
            <MenuItem imgSrc={earl_grey_milk_tea} name="Earl Grey Milk Tea" description="Earl Grey milk tea is a fragrant blend of bold black tea" price="$5.00" />
            <MenuItem imgSrc={strawberry_milk_tea} name="Strawberry Milk Tea" description="Strawberry milk tea is a sweet and fruity beverage" price="$6.50" />
            <MenuItem imgSrc={burst_my_boba} name="Burst My Boba" description="Burst My Boba is a fragrant and soothing beverage" price="$6.50" />
            <MenuItem imgSrc={oh_my_boba} name="Oh My Boba" description="Oh My Boba is a sweet and creamy beverage made from taro root" price="$6.00" />
            <MenuItem imgSrc={bubble_trouble} name="Bubble Trouble" description="Bubble Trouble is a calming and aromatic beverage" price="$6.50" />
            <MenuItem imgSrc={sippin_on_pearls} name="Sippin On Pearl" description="Sippin On Pearl is a rich and creamy beverage known for its sweet" price="$4.50" />
            <MenuItem imgSrc={the_final_sip} name="The Final Sip" description="The Final Sip is a sweet and refreshing beverage" price="$5.00" />
            <MenuItem imgSrc={bean_there_boba_that} name="Bean There Boba That" description="Bean There Boba That is a rich and indulgent beverage" price="$5.00" />
          </div>
        </section>

        {/* Teas Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">Teas</h2>
          <p className="text-center text-gray-600 mb-8">Explore our rich tasty teas</p>
          <div className="menu-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <MenuItem imgSrc={shake_it_up_tea} name="Shake It Up Tea" description="Shake It Up Tea is a refreshing and invigorating beverage" price="$5.00" />
            <MenuItem imgSrc={black_tea} name="Black Tea" description="Black tea is a robust and full-bodied beverage" price="$5.00" />
            <MenuItem imgSrc={passion_fruit_green_tea} name="Passion Fruit Green Tea" description="Passion fruit green tea is a vibrant and refreshing drink" price="$5.50" />
            <MenuItem imgSrc={peach_green_tea} name="Peach Green Tea" description="Peach green tea is a refreshing and fruity beverage" price="$5.75" />
            <MenuItem imgSrc={mango_green_tea} name="Mango Green Tea" description="Mango green tea is a refreshing and tropical beverage" price="$6.00" />
            <MenuItem imgSrc={lemon_green_tea} name="Lemon Green Tea" description="Lemon green tea is a zesty and refreshing beverage" price="$5.75" />
          </div>
        </section>

        {/* Smoothies Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">Smoothies</h2>
          <p className="text-center text-gray-600 mb-8">Try Our delicious Smoothies</p>
          <div className="menu-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <MenuItem imgSrc={strawberry_smoothie} name="Strawberry Smoothie" description="A strawberry smoothie is a delicious and refreshing" price="$6.50" />
            <MenuItem imgSrc={coconut_smoothie} name="Coconut Smoothie" description="A coconut smoothie is a creamy and tropical beverage" price="$6.50" />
          </div>
        </section>

      </main>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-gray-300 py-12 px-4">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="footer-section">
            <h3 className="text-xl font-semibold text-white mb-3">Tapioca Express</h3>
            <p>Your one-stop destination for delightful boba teas.</p>
          </div>
          <div className="footer-section">
            <h3 className="text-xl font-semibold text-white mb-3">Quick Links</h3>
            <ul>
              <li><button onClick={() => handleScrollTo('home')} className="hover:text-white">Home</button></li>
              <li><button onClick={() => handleScrollTo('menu')} className="hover:text-white">Menu</button></li>
              {/* <li><a href="#order" className="hover:text-white">Order Online</a></li> */}
              {/* <li><a href="#locations" className="hover:text-white">Locations</a></li> */}
            </ul>
          </div>
          <div className="footer-section">
            <h3 className="text-xl font-semibold text-white mb-3">Contact Us</h3>
            <p>Email: contact@tapiocaexpressboba.com</p>
            <p>Phone: (657) 278-2011 </p>
            <p className="mt-2">Follow us:</p>
            <div className="social-icons flex space-x-4 mt-2">
              <a href="#" aria-label="Facebook"><img src={logo_facebook} alt="Facebook" className="h-6 w-6"/></a>
              <a href="#" aria-label="Instagram"><img src={logo_instagram} alt="Instagram" className="h-6 w-6"/></a>
              <a href="#" aria-label="Twitter"><img src={logo_twitter} alt="Twitter" className="h-6 w-6"/></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom border-t border-gray-700 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} Tapioca Express. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
