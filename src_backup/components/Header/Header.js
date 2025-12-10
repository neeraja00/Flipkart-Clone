import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { useAppContext } from '../../contexts/AppContext';

const Header = () => {
  const { state, dispatch } = useAppContext();
  const { user, cart } = state;
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  };

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Flipkart Clone
        </Link>
        
        <div className="flex items-center space-x-4">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          
          <div className="relative">
            <Link to="/cart" className="flex items-center">
              <FaShoppingCart className="text-xl" />
              {cart.length > 0 && (
                <span className="bg-yellow-500 text-black rounded-full w-5 h-5 flex items-center justify-center text-xs absolute -top-2 -right-2">
                  {cart.length}
                </span>
              )}
            </Link>
          </div>
          
          {user ? (
            <div className="flex items-center space-x-2">
              <span className="flex items-center">
                <FaUser className="mr-1" /> {user.name}
              </span>
              <button 
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex space-x-2">
              <Link 
                to="/login" 
                className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
