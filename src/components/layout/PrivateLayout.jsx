import React from 'react'
import { useSelector } from 'react-redux';
import { Outlet ,Link} from 'react-router-dom';


function PrivateLayout() {
    const authStatus = useSelector((state) => state.auth.status);

    if(!authStatus) return (  <div>
    <div>
      <Link to={"/login"} className="text-blue-600 text-xl">
        Login
      </Link>
      <span> to access your information </span>
    </div>
  </div>
    )
  return (
    authStatus &&
         <Outlet/>  
    
    
  )
}

export default PrivateLayout