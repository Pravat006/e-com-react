import { useState } from "react";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const products = [
  {
    id: 1,
    name: "Wireless Gaming Headphones",
    price: "$79.99",
    oldPrice: "$99.99",
    rating: 4.0,
    badge: "20%",
    badgeColor: "bg-red-500",
    icon: "🎧",
  },
  {
    id: 2,
    name: "Mechanical Gaming Keyboard",
    price: "$129.99",
    rating: 5.0,
    badge: "New",
    badgeColor: "bg-green-500",
    icon: "⌨️",
  },
  {
    id: 3,
    name: "Wireless Gaming Mouse ",
    price: "$59.99",
    rating: 4.2,
    badgeColor: "bg-green-500",
    icon: "🖱️",
    badge: "New",
  },
  {
    id: 4,
    name: "Gaming SSD 1TB",
    price: "$149.99",
    rating: 4.5,
    badge: "Hot",
    badgeColor: "bg-orange-500",
    icon: "💾",
  },
 
];

export default function TrendingProducts() {

  return (

    <div className="w-full px-6 md:px-16 py-10 rounded-3xl bg-[var(--section-bg)] shadow-xl  trending-products-container "
        
    >
      <h2 className="text-3xl font-bold text-center mb-6">Trending Products</h2>

      <div className="relative flex items-center justify-center">
     
        <div className="flex gap-6 overflow-hidden flex-wrap justify-center items-center py-4 h-full ">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`w-72 shadow-lg rounded-lg overflow-hidden p-4 transform transition-all `}
              style={{
                backgroundColor: "var(--comp-bg)",
              }}
            >
              {/* Badge */}
              {product.badge && (
                <span
                  className={`absolute top-2 left-2 text-white text-xs px-2 py-1 rounded-full ${product.badgeColor}`}
                >
                  {product.badge}
                </span>
              )}

              {/* Favorite Icon */}
              <button className="absolute top-2 right-2 text-gray-500 hover:text-red-500">
                <FaHeart />
              </button>

              {/* Product Icon */}
              <div className="text-6xl text-gray-400 flex justify-center my-6">
                {product.icon}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 text-yellow-500">
                {"⭐".repeat(Math.floor(product.rating))}
                <span className="text-sm text-gray-500">({product.rating})</span>
              </div>

              {/* Product Name */}
              <h3 className="text-lg font-semibold mt-2 min-h-[56px] ">{product.name}</h3>

              {/* Price */}
              <div className="flex items-center gap-2 mt-1">
                <span className="text-blue-600 font-bold">{product.price}</span>
                {product.oldPrice && (
                  <span className="text-gray-400 line-through">
                    {product.oldPrice}
                  </span>
                )}
              </div>

              {/* Cart Button */}
              <button className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-full shadow-md hover:bg-blue-700">
                <FaShoppingCart />
              </button>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        {/* <button
          className="absolute right-0 p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition shadow-md"
          onClick={nextSlide}
        >
          <FiChevronRight className="text-xl" />
        </button> */}
      </div>

      {/* View All Products Button */}
      <div className="flex justify-center mt-8">
        <button className="px-6 py-3 border border-blue-600 text-blue-600 font-semibold rounded-full hover:bg-blue-600 hover:text-white transition-all">
          View All Products →
        </button>
      </div>
    </div>
  );
}
