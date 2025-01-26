import React from 'react'
import {  Outlet,  } from 'react-router-dom'
import Header from '../root/Header'
import Footer from '../root/Footer'

function UserLayout() {


    return (
      <div className='min-h-screen flex flex-col bg-white rounded-md'>
      <Header />
      <div className='flex-grow text-center flex justify-center items-center'>
        <Outlet />
      </div>
      <Footer />
    </div>
    )
  
}

export default UserLayout