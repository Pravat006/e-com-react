import React, { useEffect } from 'react'
import {  Outlet,  } from 'react-router-dom'
import Header from '../root/Header'
import Footer from '../root/Footer'
import { useState } from 'react'

function UserLayout() {

  const [loading , setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  },[])


    return (
      

     
          
      <div className='min-h-screen flex flex-col rounded-md'
      style={{
        backgroundColor: "var(--card-bg)",
      }}
      > 

      <Header />
      
      <div className='flex-grow text-center flex justify-center items-center w-full '>
        <Outlet />
      </div>
      <Footer />
    </div>
     
     
    )
  
}

export default UserLayout