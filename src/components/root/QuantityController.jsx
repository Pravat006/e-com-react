import React, { useState } from "react";

const QuantityController = ({quantity, onIncrease, onDecrease, onQuantityChange}) => {
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
      
        <div className="flex items-center gap-0 bg-yellow-500">
          <button
            onClick={decreaseQuantity}
            className="w-8 h-8 flex justify-center items-center  hover:bg-orange-600 text-gray-700 font-semibold rounded"
          >
            -
          </button>
          <input
           className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            
          />
          <button
            onClick={increaseQuantity}
            className="w-8 h-8 flex justify-center items-center  hover:bg-green-500 text-gray-700 font-semibold rounded"
          >
            +
          </button>
        </div>
      
    </div>
  );
};
export default QuantityController;
