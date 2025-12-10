import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaSearch, FaChevronDown, FaBars, FaTimes } from 'react-icons/fa';
import { useAppContext } from '../../contexts/AppContext';

const Header = () => {
  const { state, logout, setSearchQuery } = useAppContext();
  const { user, cart } = state;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Close search results when clicking outside
    const handleClickOutside = (event) => {
      if (!event.target.closest('.search-container')) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (localSearchQuery.trim()) {
      setSearchQuery(localSearchQuery);
      navigate(`/search?q=${encodeURIComponent(localSearchQuery)}`);
      setShowSearchResults(false);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setLocalSearchQuery(query);
    setSearchQuery(query);
    setShowSearchResults(query.length > 0);
  };

  const handleSearchResultClick = () => {
    setShowSearchResults(false);
    setLocalSearchQuery('');
  };

  const cartItemCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);

  return (
    <div className="sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-blue-700 text-white text-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-end items-center h-10">
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <FaUser className="mr-1" />
                    <span className="font-medium">{user?.name || 'My Account'}</span>
                  </div>
                  <button
                    onClick={logout}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm whitespace-nowrap"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex space-x-4">
                  <Link to="/login" className="hover:text-gray-200">
                    Login
                  </Link>
                  <Link to="/register" className="hover:text-gray-200">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white text-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between py-3">
            {/* Logo and Mobile Menu Toggle */}
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center">
                <span className="text-2xl font-bold text-blue-600">Flipkart</span>
              </Link>
              <button 
                className="md:hidden text-gray-600"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>

            {/* Search Bar */}
            <div className="mt-3 md:mt-0 md:flex-1 md:px-6 search-container">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search for products, brands and more"
                  className="w-full py-2 px-4 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={localSearchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => localSearchQuery && setShowSearchResults(true)}
                />
                <button 
                  type="submit"
                  className="absolute right-0 top-0 h-full px-4 bg-blue-500 text-white rounded-r-sm hover:bg-blue-600 transition-colors"
                >
                  <FaSearch />
                </button>
                
                {/* Search Results Dropdown */}
                {showSearchResults && state.filteredProducts && state.filteredProducts.length > 0 && (
                  <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-96 overflow-y-auto">
                    {state.filteredProducts.map((product) => (
                      <Link
                        key={product.id}
                        to={`/products/${product.id}`}
                        className="flex items-center p-3 hover:bg-gray-100 border-b border-gray-100"
                        onClick={handleSearchResultClick}
                      >
                        <img 
                          src={product.image} 
                          alt={product.title} 
                          className="w-10 h-10 object-contain mr-3"
                        />
                        <div>
                          <div className="font-medium text-gray-800">{product.title}</div>
                          <div className="text-sm text-gray-500">₹{product.price.toLocaleString()}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
                
                {showSearchResults && state.filteredProducts && state.filteredProducts.length === 0 && (
                  <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg p-4 text-gray-500">
                    No products found. Try different keywords.
                  </div>
                )}
              </form>
            </div>

            {/* Navigation Links - Desktop */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/" className="font-medium hover:text-blue-600 px-2 py-1">Home</Link>
              <Link to="/products" className="font-medium hover:text-blue-600 px-2 py-1">Products</Link>
              
              {/* Cart */}
              <div className="relative">
                <Link to="/cart" className="flex items-center hover:text-blue-600 px-2 py-1">
                  <FaShoppingCart className="text-xl" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                  <span className="ml-1">Cart</span>
                </Link>
              </div>
              
              {/* Login Button */}
              {!user && (
                <Link 
                  to="/login" 
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-1.5 px-4 rounded-md text-sm flex items-center justify-center transition-colors"
                >
                  Login
                </Link>
              )}
            </nav>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-white py-2 border-t">
              <div className="flex flex-col space-y-3 px-4">
                <Link to="/" className="py-2 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Home</Link>
                <Link to="/products" className="py-2 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Products</Link>
                <Link to="/cart" className="py-2 hover:text-blue-600 flex items-center" onClick={() => setIsMenuOpen(false)}>
                  <FaShoppingCart className="mr-2" /> Cart {cartItemCount > 0 && `(${cartItemCount})`}
                </Link>
                {!user && (
                  <Link 
                    to="/login" 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md text-sm text-center mt-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;