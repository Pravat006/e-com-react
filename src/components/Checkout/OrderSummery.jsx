import React, { useState } from 'react';
import img from '../../assets/pngwing.com.png';

const initialProducts = [
  {
    id: 1,
    name: 'Wireless Headphones',
    description: 'Noise-canceling over-ear headphones with 30-hour battery life.',
    image: img,
    quantity: 1,
    price: 99.99,
  },
  {
    id: 2,
    name: 'Smart Watch',
    description: 'Waterproof smartwatch with fitness tracking features.',
    image: img,
    quantity: 2,
    price: 59.99,
  },
  {
    id: 3,
    name: 'Bluetooth Speaker',
    description: 'Portable speaker with deep bass and 12-hour playtime.',
    image: img,
    quantity: 1,
    price: 39.99,
  },
];

export default function OrderSummary() {
  const [products] = useState(initialProducts);

  const subtotal = products.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 7.5;
  const total = subtotal + shipping;

  return (
    <div className="h-full  flex items-center justify-center  font-sans mx-2   max-w-5xl">
      <div className=" shadow-lg rounded-xl p-6 md:p-8 w-full   mx-auto border border-gray-200">
        <h2 className="text-3xl font-extrabold  mb-6 text-center">Order Summary</h2>

        {/* Product List */}
        <div className="border-b border-gray-200 pb-4 space-y-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col sm:flex-row items-center justify-between  py-4 border-b last:border-b-0"
            >
              <div className="flex items-center space-x-4 flex-1">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 sm:w-28 sm:h-28 object-cover rounded border "
                />
                <div className="text-left max-w-md">
                  <h3 className="text-lg font-semibold ">{product.name}</h3>
                  <p className="text-sm ">{product.description}</p>
                </div>
              <div className="text-right">
                <p className="text-lg font-semibold ">${(product.price * product.quantity).toFixed(2)}</p>
                <p className="text-sm ">Qty: {product.quantity}</p>
              </div>
              </div>
            </div>
          ))}
        </div>

        {/* Price Details */}
      
        {/* Checkout */}
        <button className="mt-8 w-full bg-indigo-600 hover:bg-indigo-700 hite font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}