import React from 'react'
// import { Link } from 'react-router-dom'
// import Allproducts   from './Allproducts'
// import { RandomProduct } from '@/components/carousel/RandomProduct'
import Banner from '@/components/root/Banner'
import TrendingProducts from '@/components/root/TrendingProducts'
import FeaturedCategories from '@/components/root/FeaturedCategories'
import TestBtn from '@/components/root/TestBtn'
import Header from '@/components/root/Header'


function Home() {
    // const navigate= useNavigate()
  return (
    <div className='text-center max-w-screen-[1440px] flex flex-col items-center justify-center gap-6 mt-4 h-screen'>
        <Header/>
        {/* <Banner/> */}
        {/* <TrendingProducts/>
        <FeaturedCategories/> */}
        <TestBtn/>
        {/* <RandomProduct/> */}
        {/* <Allproducts/> */}
    </div>
  )
}

export default Home