import React from 'react'

const Button=({
    text,
    type="button",
    bgColor="bg-indigo-600",
    className="",
    textColor="text-white",
    ...props
})=>{
    return (
        <button
        className={`${bgColor} ${textColor} ${className} w-full px-4 py-2  font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150  `} {...props}
        >
            {text}
        </button>
    )           
}



export default Button