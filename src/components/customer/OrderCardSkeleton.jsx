import React from 'react';

const OrderCardSkeleton = () => (
    <div className="w-full flex flex-col sm:flex-row items-start sm:items-center sm:justify-between p-4 border-none custom-glass-5 shadow-sm rounded-lg min-h-[140px] sm:min-h-[120px] animate-pulse">
        {/* Left Section: Image + Product Info */}
        <div className="flex flex-row items-center w-full sm:w-auto mb-4 sm:mb-0">
            {/* Image Placeholder */}
            <div className="flex-shrink-0 w-24 h-24 mr-4 bg-gray-300 dark:bg-gray-700 rounded-md"></div>

            {/* Product Info Placeholder */}
            <div className="flex-grow min-w-0 sm:min-w-[200px]">
                <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div> {/* Product Name */}
                <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div> {/* Placeholder for color/short desc */}
            </div>
        </div>

        {/* Right Section: Status and Action Placeholder */}
        <div className="flex flex-col w-full sm:w-72 ml-0 sm:ml-4 flex-shrink-0 gap-y-2">
            {/* Price Placeholder */}
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-20 mb-2"></div>

            {/* Status Message Placeholder */}
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-40 mb-2"></div>

            {/* Action Button / Cancellation Reason Placeholder */}
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-48"></div>
        </div>
    </div>
);

export default OrderCardSkeleton;