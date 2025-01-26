import React from "react";
import AddtocartBtn from "../root/AddtocartBtn";
import { Link } from "react-router-dom";

function RandomProductCard({
  image,
  name,
  price,
  product,
  id

}) {
  return (
    <div className="p-1">
      <Link
        to={`/product/${id}`}
        
      >
      <div className="product-image-container border-black border-2 rounded-md p-4">
        <div className="flex justify-center items-center">
          <img
            src={image}
            alt={name}
            className="main-image w-96 h-72 object-cover rounded-md "
            />
        </div>
        <h2 className="product-name text-xl font-bold text-center mt-4 ">
          t{ name}
        </h2>
        <p className="product-price text-lg font-semibold text-green-600 mt-4">
          {price}
        </p>
        <AddtocartBtn
          product={product}
          productId={id}
          />
      </div>
          </Link>
    </div>
  );
}

export default RandomProductCard;
