import React ,{ useId } from "react";

const Input = ({ className = "", type = "text", label, ...props }, ref) => {

  const id= useId()
  return (
    <div>
      {label && (
        <label className="inline-block  pl-1 font-medium" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        {...props}
        className={`w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg  ${className}`}
      />
    </div>
  );
};

export default React.forwardRef(Input);
