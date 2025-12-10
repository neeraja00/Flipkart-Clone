// src/components/Cart/Cart.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../contexts/AppContext';
import { FaTrash, FaArrowLeft, FaRupeeSign, FaMinus, FaPlus } from 'react-icons/fa';

const Cart = () => {
  const { state, updateCartItemQuantity, removeFromCart, clearCart } = useAppContext();
  const { cart } = state;

  const handleQuantityChange = (product, newQuantity) => {
    if (newQuantity < 1) return;
    updateCartItemQuantity({ ...product, quantity: newQuantity });
  };

  const handleRemoveFromCart = (product) => {
    if (window.confirm('Are you sure you want to remove this item from your cart?')) {
      removeFromCart(product);
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      return total + (item.price * (item.quantity || 1));
    }, 0);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
          <Link
            to="/products"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            <FaArrowLeft className="mr-2" />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Your Shopping Cart</h1>
      
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Cart Items ({cart.reduce((total, item) => total + (item.quantity || 1), 0)})
          </h3>
        </div>
        
        <div className="border-t border-gray-200">
          {cart.map((item) => (
            <div key={`${item.id}-${item.size || ''}`} className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row">
                <div className="flex-shrink-0">
                  <img
                    className="h-32 w-32 object-cover rounded"
                    src={item.image}
                    alt={item.title}
                  />
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-6 flex-1">
                  <h4 className="text-lg font-medium text-gray-900">{item.title}</h4>
                  {item.description && (
                    <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                  )}
                  <div className="mt-2 flex items-center">
                    <span className="text-gray-900 font-medium flex items-center">
                      <FaRupeeSign className="mr-1" />
                      {item.price.toLocaleString()}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center">
                    <div className="flex items-center border border-gray-300 rounded">
                      <button
                        onClick={() => handleQuantityChange(item, (item.quantity || 1) - 1)}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                      >
                        <FaMinus className="h-3 w-3" />
                      </button>
                      <span className="px-3 py-1 text-sm">
                        {item.quantity || 1}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item, (item.quantity || 1) + 1)}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                      >
                        <FaPlus className="h-3 w-3" />
                      </button>
                    </div>
                    <button
                      onClick={() => handleRemoveFromCart(item)}
                      className="ml-4 text-red-600 hover:text-red-800 flex items-center text-sm"
                    >
                      <FaTrash className="mr-1" />
                      Remove
                    </button>
                  </div>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-6">
                  <p className="text-lg font-medium text-gray-900 flex items-center justify-end">
                    <FaRupeeSign className="mr-1" />
                    {(item.price * (item.quantity || 1)).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="px-4 py-5 sm:px-6 bg-gray-50">
          <div className="flex justify-between items-center">
            <div>
              <button
                onClick={clearCart}
                className="text-red-600 hover:text-red-800 text-sm font-medium"
              >
                Clear Cart
              </button>
            </div>
            <div className="text-right">
              <p className="text-gray-500 text-sm">Total ({cart.reduce((total, item) => total + (item.quantity || 1), 0)} items)</p>
              <p className="text-2xl font-bold text-gray-900 flex items-center justify-end">
                <FaRupeeSign className="mr-1" />
                {calculateTotal().toLocaleString()}
              </p>
              <p className="mt-2 text-sm text-gray-500">Inclusive of all taxes</p>
              <button
                className="mt-4 w-full sm:w-auto bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-2 px-6 rounded-md shadow-sm"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <Link
          to="/products"
          className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium"
        >
          <FaArrowLeft className="mr-1" />
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default Cart;