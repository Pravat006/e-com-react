import React, { useId } from "react";

const AddressInput = ({ className = "", type = "text", label, ...props }, ref) => {

    const id = useId()
    return (
        <div>
            {label && (
                <label className="block text-sm font-medium text-gray-200 text-left" htmlFor={id}>
                    {label}
                </label>
            )}
            <input
                ref={ref}
                id={id}
                {...props}
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-transparent ${className}`}
            />
        </div>
    );
};

export default React.forwardRef(AddressInput);
