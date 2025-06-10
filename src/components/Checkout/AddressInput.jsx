import React, { useId, useState } from "react";

const AddressInput = (
    { className = "", type = "text", label, error = "", requiredType = "string", value, onChange, ...props }, 
    ref
) => {
    const id = useId();
    const [localError, setLocalError] = useState("");

    const handleChange = (e) => {
        const val = e.target.value;
        let err = "";

        if (requiredType === "number" && val && isNaN(Number(val))) {
            err = "Please enter a valid number.";
        }
        if (requiredType === "string" && val && typeof val !== "string") {
            err = "Please enter a valid string.";
        }
        setLocalError(err);

        if (onChange) onChange(e);
    };

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
                type={type}
                value={value}
                onChange={handleChange}
                {...props}
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-transparent ${className} ${error || localError ? "border-red-500" : ""}`}
            />
            {(error || localError) && (
                <p className="mt-1 text-xs text-red-500">{error || localError}</p>
            )}
        </div>
    );
};

export default React.forwardRef(AddressInput);
