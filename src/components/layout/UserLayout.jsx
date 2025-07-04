import React, { useEffect } from 'react'
import { Outlet, } from 'react-router-dom'

import Footer from '../root/Footer'
import { useState } from 'react'
import StarryBackground from '../root/StarryBackground'
import Navbar from '../root/Navbar'

function UserLayout() {

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])


  return (




    <div className="min-h-screen flex flex-col rounded-md bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-white font-inter antialiased">
      {/* <StarryBackground/> */}
      <Navbar />
      <div className="flex-grow text-center flex justify-center items-center w-full">
        <Outlet />
      </div>
      <Footer />
    </div>


  )

}

export default UserLayout