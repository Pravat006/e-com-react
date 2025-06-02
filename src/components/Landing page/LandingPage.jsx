import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Search, ChevronRight, Star, Facebook, Twitter, Instagram } from 'lucide-react';

// Placeholder product data
const placeholderProducts = [
  {
    id: 1,
    name: 'Aura Wireless Headphones',
    price: '$199.99',
    originalPrice: '$249.99',
    imageUrl: 'https://placehold.co/600x600/DBEAFE/3B82F6?text=Headphones',
    rating: 4.5,
    reviews: 120,
    category: 'Electronics',
    colors: ['#3B82F6', '#10B981', '#F59E0B'],
  },
  {
    id: 2,
    name: 'Nova Smartwatch Series 7',
    price: '$299.50',
    imageUrl: 'https://placehold.co/600x600/D1FAE5/10B981?text=Smartwatch',
    rating: 4.8,
    reviews: 230,
    category: 'Wearables',
    colors: ['#4B5563', '#EC4899', '#8B5CF6'],
  },
  {
    id: 3,
    name: 'ErgoComfort Office Chair',
    price: '$349.00',
    originalPrice: '$399.00',
    imageUrl: 'https://placehold.co/600x600/FEF3C7/F59E0B?text=Chair',
    rating: 4.2,
    reviews: 85,
    category: 'Furniture',
    colors: ['#1F2937', '#9CA3AF'],
  },
  {
    id: 4,
    name: 'EcoBlend Pro Blender',
    price: '$129.99',
    imageUrl: 'https://placehold.co/600x600/FEE2E2/EF4444?text=Blender',
    rating: 4.6,
    reviews: 150,
    category: 'Appliances',
    colors: ['#6EE7B7', '#A78BFA'],
  },
];

// StarRating Component
// const StarRating = ({ rating, reviews }) => {
//   const fullStars = Math.floor(rating);
//   const halfStar = rating % 1 !== 0;
//   const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

//   return (
//     <div className="flex items-center">
//       {[...Array(fullStars)].map((_, i) => (
//         <Star key={`full-${i}`} className="h-4 w-4 text-yellow-400 fill-current" />
//       ))}
//       {halfStar && <Star key="half" className="h-4 w-4 text-yellow-400 fill-current" style={{ clipPath: 'inset(0 50% 0 0)' }} />}
//       {[...Array(emptyStars)].map((_, i) => (
//         <Star key={`empty-${i}`} className="h-4 w-4 text-gray-300 fill-current" />
//       ))}
//       {reviews && <span className="ml-2 text-xs text-gray-400">({reviews} reviews)</span>}
//     </div>
//   );
// };


// Navbar Component
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-20 backdrop-blur-lg bg-white/70 dark:bg-slate-900/70 border-b border-slate-900/10 dark:border-slate-50/[0.07] rounded-b-xl shadow-md transition-all duration-300">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#" className="text-2xl font-bold text-slate-800 dark:text-white">
              GlassCart
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            {['Home', 'Shop', 'New Arrivals', 'About Us'].map((item) => (
              <a
                key={item}
                href="#"
                className="px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Right side icons & Mobile menu button */}
          <div className="flex items-center">
            <button className="p-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400">
              <Search className="h-6 w-6" />
            </button>
            <button className="ml-2 p-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 relative">
              <ShoppingBag className="h-6 w-6" />
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
                3
              </span>
            </button>
            <div className="sm:hidden ml-2">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
                aria-controls="mobile-menu"
                aria-expanded={isMobileMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden absolute top-full left-0 right-0 mx-2 mt-1 backdrop-blur-lg bg-white/90 dark:bg-slate-900/90 border border-slate-900/10 dark:border-slate-50/[0.07] rounded-xl shadow-lg overflow-hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {['Home', 'Shop', 'New Arrivals', 'About Us', 'Contact'].map((item) => (
              <a
                key={item}
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

// Hero Section Component
const HeroSection = () => {
  return (
    <section className="pt-20 relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background shapes */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-400 rounded-full opacity-30 animate-pulse mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-sky-400 rounded-full opacity-30 animate-pulse delay-2000 mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-400 rounded-full opacity-20 animate-pulse delay-4000 mix-blend-multiply filter blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="max-w-3xl mx-auto p-8 md:p-12 bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl border border-white/30 dark:border-slate-700/30 rounded-3xl shadow-2xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Discover <span className="text-blue-600 dark:text-blue-400">Next-Gen</span> Tech
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Experience the future with our curated collection of innovative gadgets and electronics. Quality, style, and cutting-edge technology, all in one place.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 shadow-lg transform transition-all duration-300 hover:scale-105"
            >
              Shop Collection
              <ChevronRight className="ml-2 h-5 w-5" />
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center px-8 py-3 border border-slate-300 dark:border-slate-600 text-base font-medium rounded-xl text-slate-700 dark:text-slate-200 bg-white/70 dark:bg-slate-700/70 backdrop-blur-md hover:bg-slate-100 dark:hover:bg-slate-600 shadow-lg transform transition-all duration-300 hover:scale-105"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
      {/* You can add a large background product image here if desired */}
      {/* <img src="https://placehold.co/1920x1080/cccccc/969696?text=Hero+Background" alt="Hero background" className="absolute inset-0 w-full h-full object-cover -z-20 opacity-30" /> */}
    </section>
  );
};

// Product Card Component
const ProductCard = ({ product }) => {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200/50 dark:border-slate-700/50 bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg shadow hover:shadow-lg transition-all duration-300 min-w-0 w-full h-full p-2">
      <div className="bg-slate-100 dark:bg-slate-700/50 group-hover:opacity-80 transition-opacity w-full aspect-[1/1] max-h-28 sm:max-h-40 flex items-center justify-center">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-24 w-24 object-cover object-center"
          onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x600/F3F4F6/9CA3AF?text=Image+Error"; }}
        />
      </div>
      <div className="flex flex-1 flex-col space-y-1 p-2">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white truncate">
          <a href="#">
            <span aria-hidden="true" className="absolute inset-0" />
            {product.name}
          </a>
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{product.category}</p>
        <div className="flex items-center justify-between">
            <p className="text-base font-bold text-slate-900 dark:text-white">{product.price}</p>
            {product.originalPrice && (
              <p className="text-xs text-slate-400 dark:text-slate-500 line-through">{product.originalPrice}</p>
            )}
        </div>
        {/* <StarRating rating={product.rating} reviews={product.reviews} /> */}
        {/* Colors */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center space-x-1 pt-1">
            <span className="text-xs text-slate-500 dark:text-slate-400">Colors:</span>
            {product.colors.map(color => (
              <span key={color} className="h-3 w-3 rounded-full border border-slate-300 dark:border-slate-600" style={{ backgroundColor: color }}></span>
            ))}
          </div>
        )}
      </div>
      <div className="p-2 pt-0 mt-auto">
        <button
          type="button"
          className="w-full rounded bg-blue-600 px-2 py-1 text-xs font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800 transition-colors duration-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

// Featured Products Section
const FeaturedProducts = () => {
  return (
    <section className="py-8 sm:py-16 bg-slate-50 dark:bg-slate-900/50">
      <div className="container mx-auto px-2 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-12">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Featured Products
          </h2>
          <p className="mt-2 sm:mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Check out our handpicked selection of top-rated and bestselling items.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-4 sm:gap-x-4 sm:gap-y-8">
          {placeholderProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-8 sm:mt-16 text-center">
            <a
              href="#"
              className="inline-flex items-center justify-center px-6 py-2 border border-transparent text-sm sm:text-base font-medium rounded-xl text-white bg-slate-700 hover:bg-slate-800 dark:bg-slate-600 dark:hover:bg-slate-500 shadow-lg transform transition-all duration-300 hover:scale-105"
            >
              View All Products
              <ChevronRight className="ml-2 h-5 w-5" />
            </a>
        </div>
      </div>
    </section>
  );
};

// Call to Action Section
const CallToActionSection = () => {
  return (
    <section className="relative py-16 sm:py-24 overflow-hidden">
       {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-1/3 left-1/4 w-96 h-96 bg-emerald-400/30 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/3 right-1/4 w-96 h-96 bg-indigo-400/30 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-3xl mx-auto text-center p-8 md:p-12 bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/30 dark:border-slate-700/30 rounded-3xl shadow-2xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Join Our Tech Community!
          </h2>
          <p className="mt-6 text-lg text-slate-600 dark:text-slate-300">
            Subscribe to our newsletter for the latest product updates, exclusive deals, and tech insights delivered straight to your inbox.
          </p>
          <form className="mt-10 max-w-md mx-auto sm:flex sm:gap-4">
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full px-5 py-3 placeholder-slate-400 dark:placeholder-slate-500 focus:ring-blue-500 focus:border-blue-500 border-slate-300 dark:border-slate-600 rounded-lg bg-white/80 dark:bg-slate-700/80 text-slate-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-50 dark:focus:ring-offset-slate-900"
              placeholder="Enter your email"
            />
            <button
              type="submit"
              className="mt-3 w-full sm:mt-0 sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-900 transform transition-all duration-300 hover:scale-105"
            >
              Subscribe
            </button>
          </form>
          <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};


// Footer Component
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">GlassCart</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Cutting-edge tech, delivered with style.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-300 tracking-wider uppercase mb-4">Shop</h3>
            <ul className="space-y-3">
              {['New Arrivals', 'Best Sellers', 'Electronics', 'Accessories'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-300 tracking-wider uppercase mb-4">Support</h3>
            <ul className="space-y-3">
              {['Contact Us', 'FAQs', 'Shipping', 'Returns'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-300 tracking-wider uppercase mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-slate-200 dark:border-slate-700 pt-8 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            &copy; {currentYear} GlassCart Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
export default function LandingPage() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check for saved dark mode preference or system preference
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setDarkMode(false);
    }
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    }
    setDarkMode(!darkMode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-sky-100 dark:from-slate-900 dark:via-slate-800 dark:to-sky-900 text-slate-800 dark:text-slate-200 font-sans antialiased transition-colors duration-300">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedProducts />
        <CallToActionSection />
      </main>
      <Footer />
      
      {/* Dark Mode Toggle Button - for demonstration */}
      <button
        onClick={toggleDarkMode}
        className="fixed bottom-5 right-5 p-3 rounded-full bg-slate-700 dark:bg-slate-200 text-white dark:text-slate-800 shadow-lg z-50"
        aria-label="Toggle dark mode"
      >
        {darkMode ? '☀️' : '🌙'}
      </button>
    </div>
  );
}
