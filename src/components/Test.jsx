import React, { useState } from "react";

const Test = () => {
  const [isAdding, setIsAdding] = useState(false); // Tracks if the user clicked "Add to Cart"
  const [quantity, setQuantity] = useState(1); // Quantity state

  const handleAddToCartClick = () => {
    setIsAdding(true); // Show quantity controls
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 1) {
      setQuantity(value);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-white border border-gray-300 rounded-lg shadow-md">
      {!isAdding ? (
        <button
          onClick={handleAddToCartClick}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded shadow"
        >
          Add to Cart
        </button>
      ) : (
        <div className="flex items-center gap-0 bg-yellow-500">
          <button
            onClick={decreaseQuantity}
            className="w-8 h-8 flex justify-center items-center  hover:bg-orange-600 text-gray-700 font-semibold rounded"
          >
            -
          </button>
          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            className="w-12 text-center  border-gray-300 rounded h-8 bg-yellow-500 text-white font-semibold"
          />
          <button
            onClick={increaseQuantity}
            className="w-8 h-8 flex justify-center items-center  hover:bg-green-500 text-gray-700 font-semibold rounded"
          >
            +
          </button>
        </div>
      )}
    </div>
  );
};
export default Test;
