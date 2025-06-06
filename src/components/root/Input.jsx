import React, { forwardRef, useState } from "react";

const Input = forwardRef(function Input(
  { label, type = "text", className = "", error, success, ...props },
  ref
) {
  const [showPassword, setShowPassword] = useState(false);
  const id = `input-${Math.random().toString(36).substr(2, 9)}`;
  
  // Determine if this is a password input
  const isPasswordInput = type === "password";
  
  // Get the actual input type (toggle between password and text)
  const inputType = isPasswordInput && showPassword ? "text" : type;
  
  // Determine the styling based on error/success state
  const getInputStyles = () => {
    if (error) {
      return 'border-red-500 text-red-600 bg-red-50 placeholder-red-400 focus:ring-red-500 focus:border-red-500';
    }
    if (success) {
      return 'border-green-500 text-green-600 bg-green-50 placeholder-green-500 focus:ring-green-500 focus:border-green-500';
    }
    return 'border-gray-300 text-gray-900 bg-white placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500';
  };
  
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          type={inputType}
          className={`
            w-full px-3 py-2 border rounded-md shadow-sm bg-none 
            focus:outline-none focus:ring-2 transition-colors duration-200
            ${isPasswordInput ? 'pr-10' : ''} 
            ${getInputStyles()}
            ${className}
          `}
          ref={ref}
          {...props}
        />
        
        {/* Toggle password visibility button */}
        {isPasswordInput && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              // Eye slash icon (hide password)
              <svg
                className="w-5 h-5 text-gray-400 hover:text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                />
              </svg>
            ) : (
              // Eye icon (show password)
              <svg
                className="w-5 h-5 text-gray-400 hover:text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            )}
          </button>
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-600">
          {error.message}
        </p>
      )}
      {success && !error && (
        <p className="mt-1 text-sm text-green-600">
          {success}
        </p>
      )}
    </div>
  );
});

export default Input;
