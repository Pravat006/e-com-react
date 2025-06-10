import React, { memo } from "react";
import LearnMoreBtn from "../root/LearnMoreBtn";
import { useInView } from "react-intersection-observer";

function ProductCard({ imageLink, name, description, price, id }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "50px", // Start loading earlier
  });

  return (
    <div
      ref={ref}
      className="h-full max-w-sm bg-white/10 flex flex-col rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
      // Removed: backdrop-blur-lg (expensive), reduced transition duration
    >
      {/* Image */}
      {inView ? (
        <img
          src={
            imageLink ||
            "https://placehold.co/400x208/F3F4F6/9CA3AF?text=No+Image"
          }
          alt={name || "Product Image"}
          className="object-cover w-full h-40 xs:h-44 sm:h-48 md:h-52 lg:h-56"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://placehold.co/400x208/F3F4F6/9CA3AF?text=Image+Error";
          }}
          loading="lazy" // Good for images that do get rendered
        />
      ) : (
        <div className="w-full h-40 xs:h-44 sm:h-48 md:h-52 lg:h-56 bg-gray-200 dark:bg-gray-700" /> // Placeholder
      )}

      {/* Text Content & Button - only render if inView */}
      {inView && (
        <div className="flex-grow flex flex-col justify-between p-2 sm:p-3 md:p-4">
          <div>
            <p className="text-sm sm:text-base md:text-lg font-semibold  dark:text-gray-200 mt-1 mb-1 sm:mt-2 sm:mb-1.5 line-clamp-2 leading-tight">
              {name}
            </p>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 line-clamp-2 sm:line-clamp-3 mb-2 sm:mb-3">
              {description}
            </p>
          </div>
          <div className="mt-auto">
            <LearnMoreBtn price={price} productId={id} />
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(ProductCard); // Wrap ProductCard with memo
