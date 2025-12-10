import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../contexts/AppContext';
import { FaShoppingCart, FaArrowLeft, FaRupeeSign, FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const ProductDetail = () => {
  const { id } = useParams();
  const { state, dispatch } = useAppContext();
  const { products } = state;
  const navigate = useNavigate();

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');

  const product = products.find((p) => p.id === parseInt(id));

  // Mock product variants - in a real app, this would come from the backend
  const productVariants = {
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'White', 'Blue', 'Red', 'Green'],
    images: [product?.image || 'https://via.placeholder.com/500x500?text=Product+Image']
  };

  useEffect(() => {
    // Set default selections
    if (productVariants.sizes.length > 0) {
      setSelectedSize(productVariants.sizes[0]);
    }
    if (productVariants.colors.length > 0) {
      setSelectedColor(productVariants.colors[0]);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="text-center py-12">
        <p className="text-lg">Product not found</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          <FaArrowLeft className="mr-2" />
          Back to Products
        </button>
      </div>
    );
  }

  const addToCart = () => {
    if (!selectedSize) {
      setError('Please select a size');
      return;
    }
    
    dispatch({ 
      type: 'ADD_TO_CART', 
      payload: { 
        ...product, 
        size: selectedSize,
        color: selectedColor,
        quantity: quantity
      } 
    });
    
    // Show success message
    setError('');
    alert('Item added to cart!');
  };

  const increaseQuantity = () => {
    setQuantity(prev => Math.min(prev + 1, 10));
  };

  const decreaseQuantity = () => {
    setQuantity(prev => Math.max(prev - 1, 1));
  };

  const renderRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }
    
    return stars;
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <FaArrowLeft className="mr-2" />
          Back to Products
        </button>

        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          {/* Product Images */}
          <div className="mb-8 lg:mb-0">
            <div className="bg-gray-100 rounded-lg overflow-hidden mb-4">
              <img
                src={productVariants.images[0]}
                alt={product.title}
                className="w-full h-96 object-contain cursor-zoom-in"
              />
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
            
            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {renderRating(4.5)}
              </div>
              <span className="ml-2 text-sm text-gray-600">
                {Math.floor(Math.random() * 1000) + 100} ratings & {Math.floor(Math.random() * 100) + 10} reviews
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <p className="text-3xl font-bold text-gray-900 flex items-center">
                <FaRupeeSign className="mr-1 text-lg" />
                {product.price.toLocaleString('en-IN')}
                {product.originalPrice && (
                  <span className="ml-3 text-lg text-gray-500 line-through flex items-center">
                    <FaRupeeSign className="mr-1" />
                    {product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </p>
              {product.originalPrice && (
                <div className="mt-1">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {Math.round(
                      ((product.originalPrice - product.price) / product.originalPrice) * 100
                    )}%
                    &nbsp;off
                  </span>
                  <span className="ml-2 text-sm text-green-600">
                    Special price
                  </span>
                </div>
              )}
              <p className="text-sm text-green-700 mt-1">
                {product.price > 1000 ? 'Free' : '₹40'} delivery by {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { weekday: 'long', month: 'short', day: 'numeric' })}
              </p>
            </div>

            {/* Color Selection */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Color</h3>
              <div className="flex flex-wrap gap-2">
                {productVariants.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                      selectedColor === color
                        ? 'bg-blue-100 text-blue-800 border-2 border-blue-500'
                        : 'bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-900">Size</h3>
                <button className="text-xs text-blue-600 hover:text-blue-800">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {productVariants.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-10 flex items-center justify-center rounded-md text-sm font-medium ${
                      selectedSize === size
                        ? 'bg-blue-100 text-blue-800 border-2 border-blue-500'
                        : 'bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Quantity</h3>
              <div className="flex items-center">
                <button
                  onClick={decreaseQuantity}
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-l-md bg-gray-100 hover:bg-gray-200"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <div className="w-16 h-10 flex items-center justify-center border-t border-b border-gray-300 bg-white">
                  {quantity}
                </div>
                <button
                  onClick={increaseQuantity}
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-r-md bg-gray-100 hover:bg-gray-200"
                  disabled={quantity >= 10}
                >
                  +
                </button>
                <span className="ml-2 text-sm text-gray-500">({quantity * 100}g)</span>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-md">
                {error}
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={addToCart}
                className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors duration-200"
              >
                <FaShoppingCart className="mr-2" />
                Add to Cart
              </button>
              <button className="w-full flex justify-center items-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
                Buy Now
              </button>
            </div>

            {/* Delivery Info */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Free Delivery</span> on orders over ₹499. 
                    <button type="button" className="text-blue-600 hover:text-blue-800 bg-transparent border-none p-0 cursor-pointer">
                      Enter your pincode
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
