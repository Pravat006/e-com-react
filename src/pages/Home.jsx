import React from 'react'
// import { Link } from 'react-router-dom'
// import Allproducts   from './Allproducts'
// import { RandomProduct } from '@/components/carousel/RandomProduct'
import Banner from '@/components/root/Banner'
import TrendingProducts from '@/components/root/TrendingProducts'
import FeaturedCategories from '@/components/root/FeaturedCategories'


function Home() {
    // const navigate= useNavigate()
  return (

    <div className='text-center max-w-screen-[1440px] flex flex-col items-center justify-center gap-6 mt-4'>
        <Banner/>
        <TrendingProducts/>
        <FeaturedCategories/>
        {/* <RandomProduct/> */}
        {/* <Allproducts/> */}


       
    
    </div>
  )
}

export default Home