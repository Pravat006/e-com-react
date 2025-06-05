import React from "react";
import LearnMoreBtn from "../root/LearnMoreBtn";

function ProductCard({ imageLink, name, description, price, id }) {
  return (
    <div className="h-full max-w-sm backdrop-blur-lg flex flex-col rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Image */}
      <img
        src={imageLink || "https://placehold.co/400x208/F3F4F6/9CA3AF?text=No+Image"} // Added a fallback
        alt={name || "Product Image"}
        className="object-cover w-full h-40 xs:h-44 sm:h-48 md:h-52 lg:h-56" // Responsive height, removed fixed width="400", image already rounded by parent if overflow-hidden
        onError={(e) => { 
          e.target.onerror = null; 
          e.target.src = "https://placehold.co/400x208/F3F4F6/9CA3AF?text=Image+Error"; 
        }}
      />

      {/* Text Content & Button */}
      <div className="flex-grow flex flex-col justify-between p-2 sm:p-3 md:p-4">
        <div>
          <p className="text-sm sm:text-base md:text-lg font-semibold text-black dark:text-neutral-200 mt-1 mb-1 sm:mt-2 sm:mb-1.5 line-clamp-2 leading-tight text-start">
            {name}
          </p>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 sm:line-clamp-3 mb-2 sm:mb-3 text-start">
            {description}
          </p>
        </div>

        {/* Button at Bottom */}
        <div className="mt-auto"> {/* Ensures button is at the bottom of this flex item */}
        <LearnMoreBtn price={price} productId={id} />
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
