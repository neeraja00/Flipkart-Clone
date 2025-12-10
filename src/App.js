// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AppProvider, useAppContext } from './contexts/AppContext';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import ProductList from './components/ProductList/ProductList';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Cart from './components/Cart/Cart';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import PrivateRoute from './components/Common/PrivateRoute';
import Notification from './components/Common/Notification';
import './App.css';

// Component to handle session check
const SessionCheck = ({ children }) => {
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  // List of public routes that don't require authentication
  const publicRoutes = ['/login', '/register'];

  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem('user');
      const isPublicRoute = publicRoutes.includes(location.pathname);
      
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser);
          // Only update if user is not already in state
          if (!state.user) {
            dispatch({ type: 'LOGIN', payload: user });
          }
        } catch (error) {
          console.error('Error parsing user data:', error);
          localStorage.removeItem('user');
          if (!isPublicRoute) navigate('/login');
        }
      } else if (!isPublicRoute) {
        // Redirect to login if not on a public route and no user is logged in
        navigate('/login');
      }
    };

    checkAuth();
  }, [dispatch, navigate, location.pathname, state.user]);

  return children;
};

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <SessionCheck>
            <Header />
            <Notification />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/cart"
                  element={
                    <PrivateRoute>
                      <Cart />
                    </PrivateRoute>
                  }
                />
                <Route path="*" element={<div>404 - Page Not Found</div>} />
              </Routes>
            </main>
            <footer className="bg-gray-800 text-white p-4 mt-8">
              <div className="container mx-auto text-center">
                <p>© 2023 Flipkart Clone. All rights reserved.</p>
              </div>
            </footer>
          </SessionCheck>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;