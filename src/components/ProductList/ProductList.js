import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FaShoppingCart, FaRupeeSign } from 'react-icons/fa';
import { useAppContext } from '../../contexts/AppContext';

const ProductList = () => {
  const { state, addToCart } = useAppContext();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [addedToCart, setAddedToCart] = useState(null);

  useEffect(() => {
    if (category) {
      const filtered = state.products.filter(product => 
        product.category?.toLowerCase() === category.toLowerCase()
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(state.products);
    }
  }, [category, state.products]);

  // Scroll to top when category changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [category]);

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      ...product,
      id: product.id.toString()
    });
    
    setAddedToCart(product.id);
    setTimeout(() => {
      setAddedToCart(null);
    }, 2000);
  };

  return (
    <div className="bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Products` : 'All Products'}
        </h2>
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found in this category.</p>
            <Link
              to="/products"
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              View All Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group relative bg-white border border-blue-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full hover:border-blue-200"
              >
                <Link to={`/products/${product.id}`} className="flex-1 flex flex-col">
                  <div className="h-56 overflow-hidden flex items-center justify-center p-4 border-b border-gray-100">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="text-lg font-medium text-gray-900 line-clamp-2 mb-1">
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                      {product.description}
                    </p>
                  </div>
                </Link>
                <div className="p-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-medium text-gray-900 flex items-center">
                      <FaRupeeSign className="mr-1" />
                      {product.price.toLocaleString()}
                    </p>
                    <button
                      onClick={(e) => handleAddToCart(e, product)}
                      className={`px-3 py-1.5 text-white text-sm rounded-md transition-colors flex items-center ${
                        addedToCart === product.id 
                          ? 'bg-green-600 hover:bg-green-700' 
                          : 'bg-blue-600 hover:bg-blue-700'
                      }`}
                    >
                      <FaShoppingCart className="mr-1" />
                      {addedToCart === product.id ? 'Added!' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;