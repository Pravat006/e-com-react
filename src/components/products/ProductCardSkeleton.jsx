import React from "react";

function ProductCardSkeleton() {
    return (
        <div className="h-full max-w-sm backdrop-blur-lg flex flex-col rounded-xl shadow-md overflow-hidden animate-pulse">
            {/* Image Placeholder */}
            <div className="bg-gray-300 dark:bg-gray-700 w-full h-40 xs:h-44 sm:h-48 md:h-52 lg:h-56"></div>

            {/* Text Content & Button Placeholder */}
            <div className="flex-grow flex flex-col justify-between p-2 sm:p-3 md:p-4">
                <div>
                    {/* Name Placeholder */}
                    <div className="bg-gray-300 dark:bg-gray-700 h-5 sm:h-6 md:h-7 w-3/4 mt-1 mb-1 sm:mt-2 sm:mb-1.5 rounded"></div>
                    {/* Description Placeholder */}
                    <div className="bg-gray-300 dark:bg-gray-700 h-3 sm:h-4 w-full mb-1 rounded"></div>
                    <div className="bg-gray-300 dark:bg-gray-700 h-3 sm:h-4 w-5/6 mb-2 sm:mb-3 rounded"></div>
                </div>

                {/* Button Placeholder */}
                <div className="mt-auto">
                    <div className="bg-gray-300 dark:bg-gray-700 h-9 sm:h-10 w-full rounded-lg"></div>
                </div>
            </div>
        </div>
    );
}

export default ProductCardSkeleton;