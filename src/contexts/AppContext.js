import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AppContext = createContext();

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  cart: JSON.parse(localStorage.getItem('cart')) || [],
  notification: null,
  searchQuery: '',
  products: [
    // Electronics (11 items)
    {
      id: 1,
      title: 'iPhone 13',
      price: 69999,
      image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSk5e9ARAUJkb7vc9aWFsb6Y8XeXjzDOco4-JrLYOOR7U7yR4mDWreedy39qgsf5hX5XjYwzeTZLCl9vOUrecVp5dovWfZpikoYELBpWsgQVue_l8UmUxDfAw',
      description: 'Latest iPhone with A15 Bionic chip',
      category: 'electronics'
    },
    {
      id: 2,
      title: 'Samsung Galaxy S21',
      price: 64999,
      image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&auto=format&fit=crop&q=60',
      description: 'Powerful Android smartphone',
      category: 'electronics'
    },
    {
      id: 3,
      title: 'MacBook Pro',
      price: 129999,
      image: 'https://m.media-amazon.com/images/I/61aUBxqc5PL._SL1500_.jpg',
      description: 'Powerful laptop for professionals',
      category: 'electronics'
    },
    {
      id: 4,
      title: 'Sony WH-1000XM4',
      price: 28990,
      image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500&auto=format&fit=crop&q=60',
      description: 'Wireless Noise Cancelling Headphones',
      category: 'electronics'
    },
    {
      id: 5,
      title: 'Air Conditioner',
      price: 41999,
      image: 'https://cdn.pixabay.com/photo/2021/09/08/07/20/air-conditioner-6605973_1280.jpg',
      description: 'Feel the breeze, forget the heat.',
      category: 'electronics'
    },
    {
      id: 6,
      title: 'Samsung 55" QLED TV',
      price: 74999,
      image: 'https://rukminim2.flixcart.com/image/480/640/kqse07k0/television/a/5/y/qa55q60aaklxl-samsung-original-imag4qf5rwh46ed2.jpeg?q=90',
      description: '4K UHD Smart QLED TV',
      category: 'electronics'
    },
    {
      id: 7,
      title: 'Dyson V11 Torque Drive',
      price: 49900,
      image: 'https://id.misumi-ec.com/linked/material/fs/KAR1/PHOTO/223005613338_001.jpg',
      description: 'Cordless Vacuum Cleaner',
      category: 'electronics'
    },
    {
      id: 8,
      title: 'Bose SoundLink Revolve+',
      price: 28900,
      image: 'https://media3.bsh-group.com/Product_Shots/5120x/21433238_WG34A20PIN_PGA4_def.webp',
      description: 'Portable Bluetooth Speaker',
      category: 'electronics'
    },
    {
      id: 9,
      title: 'Canon EOS 1500D',
      price: 42990,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZOiL866wlm5xLZ_fhoXW1d3p3kUAPxkkFxw&s',
      description: '24.1MP Digital SLR Camera',
      category: 'electronics'
    },
    {
      id: 10,
      title: 'Amazon Echo Dot (4th Gen)',
      price: 4499,
      image: 'https://i0.wp.com/gotit.org.in/wp-content/uploads/2024/04/2-276.jpeg?fit=600%2C595&ssl=1',
      description: 'Smart speaker with Alexa',
      category: 'electronics'
    },
    {
      id: 11,
      title: 'OnePlus 10 Pro',
      price: 66999,
      image: 'https://5.imimg.com/data5/SELLER/Default/2023/6/313994824/AQ/QT/DD/114330705/4.png',
      description: 'Flagship smartphone with Hasselblad Camera',
      category: 'electronics'
    },

    // Fashion (11 items)
    {
      id: 12,
      title: 'Women\'s Lehanga',
      price: 999,
      image: 'https://urban-trend.co.in/cdn/shop/files/230-QRC_12_1445x.jpg?v=1714560961',
      description: 'Comfortable cotton shirt',
      category: 'fashion'
    },
    {
      id: 13,
      title: 'Men\'s Pattu Pancha',
      price: 1299,
      image: 'https://groom2b.in/cdn/shop/files/2_5f37e310-6a65-4e16-98a7-525a3a6c0e54.png?v=1762865441&width=533',
      description: 'Indian traditional wear for men',
      category: 'fashion'
    },
    {
      id: 14,
      title: 'Men\'s Slim Fit Jeans',
      price: 1499,
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&auto=format&fit=crop&q=60',
      description: 'Classic blue denim jeans',
      category: 'fashion'
    },
    {
      id: 15,
      title: 'Men\'s Running Shoes',
      price: 2299,
      image: 'https://rukminim2.flixcart.com/image/368/490/xif0q/shoe/p/b/a/6-rng-854-beige-6-bruton-beige-original-imahbgyzxr6ygvye.jpeg?q=90&crop=false',
      description: 'Lightweight running shoes',
      category: 'fashion'
    },
    {
      id: 16,
      title: 'Men\'s Formal Blazer set',
      price: 3499,
      image: 'https://5.imimg.com/data5/SELLER/Default/2025/9/541638622/IF/CU/HW/1412197/men-s-formal-suiting-blazers-500x500.jpeg',
      description: 'Slim fit formal blazer set',
      category: 'fashion'
    },
    {
      id: 17,
      title: 'Women\'s Handbag',
      price: 1799,
      image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500&auto=format&fit=crop&q=60',
      description: 'Stylish leather handbag',
      category: 'fashion'
    },
    {
      id: 18,
      title: 'Men\'s Sports T-Shirt',
      price: 499,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop&q=60',
      description: 'Quick dry sports t-shirt',
      category: 'fashion'
    },
    {
      id: 19,
      title: 'Women\'s Denim Jacket',
      price: 1999,
      image: 'https://cdn-images.farfetch-contents.com/24/50/80/50/24508050_54930144_600.jpg',
      description: 'Classic denim jacket',
      category: 'fashion'
    },
    {
      id: 20,
      title: 'Women\'s party wear',
      price: 699,
      image: 'https://snazzyhunt.com/cdn/shop/files/SH-NP-D-S24-RD-A.webp?v=1762519824',
      description: 'Red one piece party wear for women',
      category: 'fashion'
    },
    {
      id: 21,
      title: 'Women\'s Sunglasses',
      price: 899,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVNJH-rPVnkMnJBtIFN4agvDolMJsJcfA4YA&s',
      description: 'UV protected sunglasses',
      category: 'fashion'
    },
    {
      id: 22,
      title: 'Women\'s Winter Boots',
      price: 1599,
      image: 'https://images-static.nykaa.com/media/catalog/product/3/a/3a4cbd0DBBLG-BT-Fur-Black_1.jpg?tr=w-500',
      description: 'Comfortable winter boots for women',
      category: 'fashion'
    },

    // Home (11 items)
    {
      id: 23,
      title: 'Wooden Chair',
      price: 4999,
      image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500&auto=format&fit=crop&q=60',
      description: 'Modern wooden chair for home',
      category: 'home'
    },
    {
      id: 24,
      title: 'King Size Bed',
      price: 24999,
      image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&auto=format&fit=crop&q=60',
      description: 'Queen size wooden bed with storage',
      category: 'home'
    },
    {
      id: 25,
      title: 'Study Table',
      price: 5999,
      image: 'https://ikiru.in/cdn/shop/products/buy-study-table-wooden-side-study-table-with-drawer-or-work-desk-for-living-room-by-the-home-dekor-on-ikiru-online-store-1.jpg?v=1739197530',
      description: 'Wooden study table with drawer',
      category: 'home'
    },
    {
      id: 26,
      title: 'Sofa Set',
      price: 34999,
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&auto=format&fit=crop&q=60',
      description: '3+1+1 seater sofa set',
      category: 'home'
    },
    {
      id: 27,
      title: 'Dining Table Set',
      price: 18999,
      image: 'https://images-cdn.ubuy.co.in/6825967f86f38c769500eb75-montary-7-piece-dining-room-set-modern.jpg',
      description: '6 seater dining table with chairs',
      category: 'home'
    },
    {
      id: 28,
      title: 'Bookshelf',
      price: 6999,
      image: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=500&auto=format&fit=crop&q=60',
      description: '5-tier wooden bookshelf',
      category: 'home'
    },
    {
      id: 29,
      title: 'TV Stand',
      price: 8999,
      image: 'https://images-cdn.ubuy.co.in/65b3afac632ab74dfb14a15a-modern-tv-stand-for-tvs-up-to-70-with.jpg',
      description: 'Modern TV cabinet with storage',
      category: 'home'
    },
    {
      id: 30,
      title: 'Wardrobe',
      price: 19999,
      image: 'https://cdn.shopify.com/s/files/1/0044/1208/0217/files/JOYCE4DRLS.webp?v=1753183706',
      description: '2-door wooden wardrobe',
      category: 'home'
    },
    {
      id: 31,
      title: 'Coffee Table',
      price: 7499,
      image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=500&auto=format&fit=crop&q=60',
      description: 'Modern center table for living room',
      category: 'home'
    },
    {
      id: 32,
      title: 'Shoe Rack',
      price: 3999,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLssC6W_YHWgQCD_bxSSyq0TQ5d1_pzSEq8g&s',
      description: '6-tier shoe organizer',
      category: 'home'
    },
    {
      id: 33,
      title: 'Study Lamp',
      price: 999,
      image: 'https://images-cdn.ubuy.co.in/633fef07e86e4a227552cfdf-dllt-swing-arm-desk-lamp-wood.jpg',
      description: 'LED table lamp with adjustable brightness',
      category: 'home'
    },
    // Beauty (11 items)
    {
      id: 34,
      title: 'Face Wash',
      price: 299,
      image: 'https://images.mamaearth.in/catalog/product/a/l/aloevera-face-wash.jpg?format=auto&height=600&width=600',
      description: 'Natural face wash for all skin types',
      category: 'beauty'
    },
    {
      id: 35,
      title: 'Sunscreen Lotion',
      price: 499,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpRmMttXfSl8_ozcN8sWASPwhhCBCXvaNECQ&s',
      description: 'SPF 50+ PA+++ sunscreen',
      category: 'beauty'
    },
    {
      id: 36,
      title: 'Shampoo',
      price: 399,
      image: 'https://freshmills.in/cdn/shop/files/rice-water-shampoo-deyga-freshmills-344571.png?v=1725260673&width=1214',
      description: 'Natural ingredients shampoo',
      category: 'beauty'
    },
    {
      id: 37,
      title: 'eyeliner',
      price: 599,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCZ-nLyfP9DHaL9YS15f8mAkOSrLNjOAjofA&s',
      description: '24h hydration cream',
      category: 'beauty'
    },
    {
      id: 38,
      title: 'Lipstick Set',
      price: 899,
      image: 'https://cdn.shopify.com/s/files/1/0867/7880/6573/files/MRS-Combo-052.jpg?v=1735813023',
      description: 'Matte finish lipstick - set of 6',
      category: 'beauty'
    },
    {
      id: 39,
      title: 'Perfume',
      price: 1299,
      image: 'https://rukminim2.flixcart.com/image/480/640/xif0q/perfume-bottle/q/u/n/wh-pf-03-wild-hook-100-original-imagtkkhudhhtszt.jpeg?q=90',
      description: 'Eau de parfum 100ml',
      category: 'beauty'
    },
    {
      id: 40,
      title: 'Makeup Brush Set',
      price: 799,
      image: 'https://www.reneecosmetics.in/cdn/shop/files/Allin1MakeupBrushSet_02.jpg?v=1742483897&width=1946',
      description: '12-piece professional brush set',
      category: 'beauty'
    },
    {
      id: 41,
      title: 'Face serum',
      price: 1499,
      image: 'https://plumgoodness.com/cdn/shop/files/001_9013bf85-0761-4afd-80a3-878cf4665ce5.jpg?v=1735905481&width=1214',
      description: '2000W ionic hair dryer',
      category: 'beauty'
    },
    {
      id: 42,
      title: 'Face Mask',
      price: 199,
      image: 'https://images.herzindagi.info/her-zindagi-english/images/2024/10/04/article/image/3-DIY-Face-Sheet-Masks-For-Glowing-And-Hydrated-Skin-1728054556480.webp',
      description: 'Clay face mask - pack of 5',
      category: 'beauty'
    },
    {
      id: 43,
      title: 'Nail Polish Set',
      price: 699,
      image: 'https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/21798580/2023/10/6/122111e6-2c85-48b9-8a95-43ba976461d81696566333981MIFASHIONSetof3HighShineLong-LastingNailLacquer12mlEach-Shim3.jpg',
      description: '6-piece nail polish set',
      category: 'beauty'
    },
    {
      id: 44,
      title: 'Electric Shaver',
      price: 2499,
      image: 'https://images-cdn.ubuy.co.in/6856fa567408ec6a94062fd2-pritech-electric-razor-for-men.jpg',
      description: 'Men\'s electric shaver',
      category: 'beauty'
    }
  ]
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('user', JSON.stringify(action.payload));
      return { 
        ...state, 
        user: action.payload,
        notification: { message: 'Login successful!', type: 'success' }
      };
      
    case 'LOGOUT':
      localStorage.removeItem('user');
      localStorage.removeItem('cart');
      return { 
        ...state, 
        user: null, 
        cart: [],
        notification: { message: 'Logged out successfully', type: 'info' }
      };
      
    case 'ADD_TO_CART': {
      if (!state.user) {
        return {
          ...state,
          notification: { 
            message: 'Please login to add items to cart', 
            type: 'error' 
          }
        };
      }

      const existingItem = state.cart.find(item => item.id === action.payload.id);
      let newCart;
      
      if (existingItem) {
        newCart = state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      } else {
        newCart = [...state.cart, { 
          ...action.payload, 
          quantity: 1
        }];
      }

      return {
        ...state,
        cart: newCart,
        notification: { 
          message: 'Item added to cart!', 
          type: 'success' 
        }
      };
    }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
        notification: { 
          message: 'Item removed from cart', 
          type: 'info' 
        }
      };

    case 'UPDATE_CART_ITEM_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item => 
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(1, action.payload.quantity) }
            : item
        )
      };

    case 'CLEAR_CART':
      return {
        ...state,
        cart: []
      };

    case 'SET_NOTIFICATION':
      return {
        ...state,
        notification: action.payload
      };

    case 'CLEAR_NOTIFICATION':
      return {
        ...state,
        notification: null
      };

    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        searchQuery: action.payload
      };

    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  // Auto-clear notifications after 3 seconds
  useEffect(() => {
    if (state.notification) {
      const timer = setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [state.notification]);

  // Filter products based on search query
  const filteredProducts = state.products.filter(product => 
    product.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(state.searchQuery.toLowerCase())
  );

  const value = {
    state: {
      ...state,
      filteredProducts: state.searchQuery ? filteredProducts : state.products
    },
    dispatch,
    addToCart: (product) => dispatch({ type: 'ADD_TO_CART', payload: product }),
    removeFromCart: (product) => dispatch({ type: 'REMOVE_FROM_CART', payload: product }),
    updateCartItemQuantity: (product, quantity) => 
      dispatch({ 
        type: 'UPDATE_CART_ITEM_QUANTITY', 
        payload: { ...product, quantity } 
      }),
    clearCart: () => dispatch({ type: 'CLEAR_CART' }),
    login: (userData) => dispatch({ type: 'LOGIN', payload: userData }),
    logout: () => dispatch({ type: 'LOGOUT' }),
    setSearchQuery: (query) => dispatch({ type: 'SET_SEARCH_QUERY', payload: query })
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};