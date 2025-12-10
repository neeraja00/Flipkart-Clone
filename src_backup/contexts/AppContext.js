import React, { createContext, useContext, useReducer } from 'react';

const AppContext = createContext();

const initialState = {
  user: null,
  cart: [],
  products: [
    {
      id: 1,
      title: 'iPhone 13',
      price: 69999,
      image: 'https://m.media-amazon.com/images/I/71xb2xNAL5L._SL1500_.jpg',
      description: 'Latest iPhone with A15 Bionic chip',
    },
    {
      id: 2,
      title: 'Samsung Galaxy S21',
      price: 64999,
      image: 'https://m.media-amazon.com/images/I/61IwYkFaS4L._SL1500_.jpg',
      description: 'Powerful Android smartphone',
    },
    {
      id: 3,
      title: 'MacBook Pro',
      price: 129999,
      image: 'https://m.media-amazon.com/images/I/61aUBxqc5PL._SL1500_.jpg',
      description: 'Powerful laptop for professionals',
    },
  ],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    case 'ADD_TO_CART':
      return { ...state, cart: [...state.cart, action.payload] };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
