import React from "react";
import AddtocartBtn from "../root/AddtocartBtn";
import LearnMoreBtn from "../root/LearnMoreBtn";

function ProductCard({ imageLink, name, description, price, id }) {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ">
      <img src={imageLink} alt={name} className="w-full h-48 object-cover" />

      <div className="px-4 py-2">
        <h2 className="text-lg font-bold text-gray-800">{name}</h2>

        <p className="text-sm text-gray-600 my-auto">{description}</p>

        <p className="text-lg font-semibold  my-auto">
          Price :<span className="text-green-600">{price}</span>
        </p>

        <div className="my-auto flex flex-col gap-1">
          <LearnMoreBtn productId={id} />
          <AddtocartBtn
            productId={id}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
