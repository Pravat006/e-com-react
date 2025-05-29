import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Star, ArrowRight, Search } from 'lucide-react';
import BackgroundAnimation from '../Landing page/BackgroundAnimation';

// // Reusable Product Card Component (No longer used, but kept for reference if needed later)
// const ProductCard = ({ product }) => {
//   const cardRef = useRef(null);
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//           observer.unobserve(cardRef.current); // Stop observing once visible
//         }
//       },
//       { threshold: 0.1 } // Trigger when 10% of the card is visible
//     );

//     if (cardRef.current) {
//       observer.observe(cardRef.current);
//     }

//     return () => {
//       if (cardRef.current) {
//         observer.unobserve(cardRef.current);
//       }
//     };
//   }, []);

//   return (
//     <div
//       ref={cardRef}
//       className={`bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-2xl p-4 md:p-6 border border-white border-opacity-20 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl flex flex-col items-center text-center
//         ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
//         transition-opacity transition-transform duration-700 ease-out`}
//     >
//       <img
//         src={product.image}
//         alt={product.name}
//         className="rounded-xl mb-3 w-full h-32 sm:h-40 md:h-48 object-cover" /* Adjusted height for responsiveness */
//         onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/300x200/555555/FFFFFF?text=Image+Not+Found"; }}
//       />
//       <h3 className="text-xl sm:text-2xl font-semibold mb-1 text-white">{product.name}</h3> {/* Adjusted font size */}
//       <p className="text-gray-300 mb-3 text-xs sm:text-sm line-clamp-2">{product.description}</p> {/* Adjusted font size */}
//       <div className="flex items-center mb-3">
//         {[...Array(5)].map((_, i) => (
//           <Star key={i} size={16} sm:size={18} fill="gold" stroke="gold" className="mr-1" /> 
//         ))}
//         <span className="text-gray-300 text-xs sm:text-sm">({product.rating})</span> {/* Adjusted font size */}
//       </div>
//       <p className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-300 mb-3">${product.price.toFixed(2)}</p> {/* Adjusted font size */}
//       <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-2 px-6 sm:py-3 sm:px-8 rounded-full shadow-md transform transition-all duration-300 hover:scale-105 flex items-center text-sm sm:text-base"> {/* Adjusted padding and font size */}
//         Add to Cart <ArrowRight size={16} sm:size={20} className="ml-1 sm:ml-2" /> {/* Adjusted icon size */}
//       </button>
//     </div>
//   );
// };

// // Reusable Category Card Component (No longer used, but kept for reference if needed later)
// const CategoryCard = ({ category }) => {
//   const cardRef = useRef(null);
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//           observer.unobserve(cardRef.current);
//         }
//       },
//       { threshold: 0.1 }
//     );

//     if (cardRef.current) {
//       observer.observe(cardRef.current);
//     }

//     return () => {
//       if (cardRef.current) {
//         observer.unobserve(cardRef.current);
//       }
//     };
//   }, []);

//   return (
//     <div
//       ref={cardRef}
//       className={`bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-2xl p-4 md:p-6 border border-white border-opacity-20 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl flex flex-col items-center text-center cursor-pointer
//         ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
//         transition-opacity transition-transform duration-700 ease-out`}
//     >
//       <img
//         src={category.image}
//         alt={category.name}
//         className="rounded-xl mb-3 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-cover" /* Adjusted size for responsiveness */
//         onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/128x128/555555/FFFFFF?text=Category"; }}
//       />
//       <h3 className="text-xl sm:text-2xl font-semibold text-white">{category.name}</h3> {/* Adjusted font size */}
//     </div>
//   );
// };

// // Dummy Data for sections (No longer used, but kept for reference if needed later)
// const featuredProducts = [
//   { id: 1, name: "Wireless Headphones", description: "Immersive sound and sleek design.", image: "https://placehold.co/300x200/000000/FFFFFF?text=Headphones", price: 199.99, rating: 4.8 },
//   { id: 2, name: "Smartwatch Pro", description: "Track your fitness and stay connected.", image: "https://placehold.co/300x200/000000/FFFFFF?text=Smartwatch", price: 249.99, rating: 4.5 },
//   { id: 3, name: "Portable Bluetooth Speaker", description: "Powerful sound on the go.", image: "https://placehold.co/300x200/000000/FFFFFF?text=Speaker", price: 89.99, rating: 4.7 },
//   { id: 4, name: "Gaming Mouse", description: "Precision and comfort for serious gamers.", image: "https://placehold.co/300x200/000000/FFFFFF?text=Gaming+Mouse", price: 59.99, rating: 4.6 },
// ];

// const topCategories = [
//   { id: 1, name: "Electronics", image: "https://placehold.co/128x128/000000/FFFFFF?text=Electronics" },
//   { id: 2, name: "Wearables", image: "https://placehold.co/128x128/000000/FFFFFF?text=Wearables" },
//   { id: 3, name: "Audio", image: "https://placehold.co/128x128/000000/FFFFFF?text=Audio" },
//   { id: 4, name: "Gaming", image: "https://placehold.co/128x128/000000/FFFFFF?text=Gaming" },
//   { id: 5, name: "Smart Home", image: "https://placehold.co/128x128/000000/FFFFFF?text=Smart+Home" },
//   { id: 6, name: "Accessories", image: "https://placehold.co/128x128/000000/FFFFFF?text=Accessories" },
// ];

// const popularProducts = [
//   { id: 5, name: "4K Smart TV", description: "Stunning visuals and smart features.", image: "https://placehold.co/300x200/000000/FFFFFF?text=Smart+TV", price: 799.99, rating: 4.9 },
//   { id: 6, name: "Noise Cancelling Earbuds", description: "Immerse yourself in pure sound.", image: "https://placehold.co/300x200/000000/FFFFFF?text=Earbuds", price: 129.99, rating: 4.7 },
//   { id: 7, name: "Portable SSD 1TB", description: "Fast and reliable storage on the go.", image: "https://placehold.co/300x200/000000/FFFFFF?text=SSD", price: 149.99, rating: 4.8 },
//   { id: 8, name: "Robot Vacuum Cleaner", description: "Effortless cleaning for a smarter home.", image: "https://placehold.co/300x200/000000/FFFFFF?text=Robot+Vacuum", price: 349.99, rating: 4.5 },
// ];

// const latestReleases = [
//   { id: 9, name: "Foldable Smartphone", description: "Revolutionary design, limitless possibilities.", image: "https://placehold.co/300x200/000000/FFFFFF?text=Foldable+Phone", price: 1299.99, rating: 4.9 },
//   { id: 10, name: "VR Headset Pro", description: "Next-level virtual reality experience.", image: "https://placehold.co/300x200/000000/FFFFFF?text=VR+Headset", price: 699.99, rating: 4.7 },
//   { id: 11, name: "Smart Coffee Maker", description: "Brew your perfect coffee with a tap.", image: "https://placehold.co/300x200/000000/FFFFFF?text=Coffee+Maker", price: 179.99, rating: 4.6 },
//   { id: 12, name: "Drone with 8K Camera", description: "Capture breathtaking aerial footage.", image: "https://placehold.co/300x200/000000/FFFFFF?text=Drone", price: 899.99, rating: 4.8 },
// ];


// Main App component for the e-commerce landing page
function LandingPage() {
  return (
 <div className="min-h-[300vh] bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white font-inter antialiased">
      {/* Navbar Section */}
      {/* <Navbar /> */}

      {/* Hero Section */}
      <header className="relative flex flex-col items-center justify-center text-center px-4 py-20 md:py-32 overflow-hidden">
        {/* Background Animation Component */}
        <BackgroundAnimation />

        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-white">
            Discover Your Next Favorite <span className="block md:inline">Gadget</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Explore a curated collection of cutting-edge electronics, stylish accessories, and innovative tech.
            Experience the future, today.
          </p>
          <button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-4 px-10 rounded-full text-xl shadow-xl transform transition-all duration-300 hover:scale-105">
            Shop Now
          </button>
        </div>
      </header>

      {/* The rest of the page remains blank as per the requirement, ensuring 3 viewport heights */}

      {/* Custom CSS for font (Tailwind JIT handles most of it) */}
      {/* <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');
        .font-inter {
          font-family: 'Inter', sans-serif;
        }
      `}</style> */}
    </div>
  );
}

export default LandingPage;
