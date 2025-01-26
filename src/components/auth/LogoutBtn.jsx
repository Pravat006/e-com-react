import React, { useEffect } from 'react'
import { logout } from '@/slices/authSlice'
import AuthService from "../../services/auth.service.js"
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function LogoutBtn() {

    const dispatch= useDispatch()
    const navigate= useNavigate()
  
        const handleLogout = () => {
          try {
            AuthService.logout().then(() => {
              navigate("/");
              dispatch(logout());
              toast.success("Logged out successfully");
            });
            return null;
          } catch (error) {
            error.message;
          }
        }
 
      

   

  return (
    <button 
        onClick={()=>handleLogout()}
    >
        Logout
    </button>
  )
}

export default LogoutBtn