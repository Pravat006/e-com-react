import React, {useId} from 'react'
import './input.css'

function StyledUnput({ className = "", type = "text", label, ...props }, ref) {
    const id= useId()
  return (
    <div className="inputGroup">
      
    {/* <input type="text" required="" autocomplete="off"
                className={` w-full ${className}`}
            ref={ref}
            id={id}
            {...props}
    /> */}
    {/* <label for="name">Name</label> */}
  
            {/* <label className="inline-block mb-1 pl-1 font-medium" htmlFor={id}>
                {label}
            </label> */}
            <input type="text" required="" autocomplete="off"/>
            <label for="name">Name</label>
          

    
   </div>
  )
}

export default React.forwardRef(StyledUnput)