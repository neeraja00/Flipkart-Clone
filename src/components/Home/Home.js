import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Custom arrow components
const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', background: 'rgba(0,0,0,0.3)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1, right: '10px' }}
      onClick={onClick}
    >
      <FaChevronRight className="text-white" />
    </div>
  );
};

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', background: 'rgba(0,0,0,0.3)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1, left: '10px' }}
      onClick={onClick}
    >
      <FaChevronLeft className="text-white" />
    </div>
  );
};

const Home = () => {
  // Banner slider settings
  const bannerSettings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    fade: true,
    cssEase: 'cubic-bezier(0.4, 0, 0.2, 1)',
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: false,
          dots: true
        }
      }
    ]
  };

  // Font import for the banner and categories (Poppins and Montserrat)
  useEffect(() => {
    const poppinsLink = document.createElement('link');
    poppinsLink.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap';
    poppinsLink.rel = 'stylesheet';
    
    const montserratLink = document.createElement('link');
    montserratLink.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700&display=swap';
    montserratLink.rel = 'stylesheet';
    
    document.head.appendChild(poppinsLink);
    document.head.appendChild(montserratLink);
    
    return () => {
      document.head.removeChild(poppinsLink);
      document.head.removeChild(montserratLink);
    };
  }, []);

  // Banner data
  const banners = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?fm=jpg&q=60&w=1600&h=400&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2xvdGhpbmd8ZW58MHx8MHx8fDA%3D',
      alt: 'Fashion Collection',
      link: '/products?category=fashion',
      title: 'Summer Collection',
      description: 'Up to 50% off on all fashion items'
    },
    {
      id: 2,
      image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?cs=srgb&dl=pexels-pixabay-356056.jpg&fm=jpg',
      alt: 'Electronics',
      link: '/products?category=electronics',
      title: 'Latest Gadgets',
      description: 'New arrivals in electronics'
    },
    {
      id: 3,
      image: 'https://c.ndtvimg.com/2021-09/hf2ce3o_decor_625x300_06_September_21.jpg',
      alt: 'Home Decor',
      link: '/products?category=home',
      title: 'Home & Living',
      description: 'Redecorate your space'
    },
    {
      id: 4,
      image: 'https://bsmedia.business-standard.com/_media/bs/img/article/2024-08/17/full/20240817100814.jpg',
      alt: 'Beauty Products',
      link: '/products?category=beauty',
      title: 'Beauty Essentials',
      description: 'Look your best every day'
    }
  ];
  return (
    <div className="bg-white">
      {/* Banner Slider */}
      <div className="w-full mt-4 mb-8">
        <Slider {...bannerSettings} className="banner-slider">
          {banners.map((banner) => (
            <div key={banner.id} className="relative h-72 md:h-[32rem] lg:h-[36rem] overflow-hidden">
              <Link to={banner.link} className="block h-full group">
                <div className="relative w-full h-full">
                  {/* Blurred Background */}
                  <div 
                    className="absolute inset-0 w-full h-full bg-cover bg-center transform scale-110 group-hover:scale-100 transition-transform duration-1000"
                    style={{
                      backgroundImage: `url(${banner.image})`,
                      filter: 'blur(8px) brightness(0.7)'
                    }}
                  ></div>
                  
                  {/* Main Image */}
                  <div className="relative h-full flex items-center justify-center p-8">
                    <div className="relative z-10 text-center max-w-4xl mx-auto">
                      <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 text-white font-['Poppins'] tracking-wide">
                        {banner.title}
                      </h3>
                      <p className="text-xl md:text-2xl text-gray-200 mb-8 font-['Poppins'] max-w-2xl mx-auto">
                        {banner.description}
                      </p>
                      <button className="mt-4 px-8 py-3 bg-white text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition-colors duration-300 transform hover:scale-105">
                        Shop Now
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      </div>

      {/* Spacer */}
      <div className="h-8 md:h-12"></div>
      
      {/* Hero Section */}
      <div className="relative bg-blue-600 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-blue-600 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                  <span className="block">Welcome to</span>
                  <span className="block text-yellow-300">Flipkart Clone</span>
                </h1>
                <p className="mt-3 text-base text-blue-100 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Shop the latest electronics, fashion, and more. Enjoy great deals and fast delivery on all your favorite products.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      to="/products"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-yellow-400 hover:bg-yellow-500 md:py-4 md:text-lg md:px-10"
                    >
                      <FaShoppingCart className="mr-2" />
                      Shop Now
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link
                      to="/products"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-200 bg-blue-700 hover:bg-blue-800 md:py-4 md:text-lg md:px-10"
                    >
                      <FaSearch className="mr-2" />
                      Browse Products
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            alt="Online shopping"
          />
        </div>
      </div>

      {/* Featured Categories */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Shop by Category
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Discover products in our most popular categories
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
              {[
                {
                  name: 'Electronics',
                  href: '/products?category=electronics',
                  imageSrc: 'https://t3.ftcdn.net/jpg/02/37/11/96/360_F_237119664_mTl1rXqLQ0V3b1UgAX5vewsT0ezEQXs2.jpg',
                },
                {
                  name: 'Fashion',
                  href: '/products?category=fashion',
                  imageSrc: 'https://watermark.lovepik.com/photo/20211118/large/lovepik-shopping-bags-in-shopping-malls-picture_500134468.jpg',
                },
                {
                  name: 'Home & Furniture',
                  href: '/products?category=home',
                  imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfd0UJs_Q0VswlRwcPy8z0TbQZjQlv-fLMTQ&s',
                },
                {
                  name: 'Beauty & Personal Care',
                  href: '/products?category=beauty',
                  imageSrc: 'https://media.istockphoto.com/id/143920428/photo/young-beautiful-woman-having-various-facial-treatment.jpg?s=612x612&w=0&k=20&c=vr_1cfNwvKO7qBSiaR9IoGHrH0onFjMuKVjJYS3NsTE=',
                },
              ].map((category) => (
                <div key={category.name} className="group relative bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <div className="w-full min-h-80 bg-gray-100 aspect-w-1 aspect-h-1 rounded-t-lg overflow-hidden lg:h-80 lg:aspect-none">
                    <Link to={category.href} className="block w-full h-full">
                      <img
                        src={category.imageSrc}
                        alt={category.name}
                        className="w-full h-full object-center object-cover lg:w-full lg:h-full transition-transform duration-300 group-hover:scale-105"
                      />
                    </Link>
                  </div>
                  <div className="p-4 flex justify-center bg-white rounded-b-lg">
                    <div className="w-full text-center">
                      <h3 className="text-lg md:text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 font-['Montserrat']">
                        <Link to={category.href} className="flex flex-col items-center">
                          <span className="relative z-10">
                            {category.name}
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                          </span>
                          <span className="text-sm text-gray-500 mt-1 font-normal">Shop Now</span>
                        </Link>
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
