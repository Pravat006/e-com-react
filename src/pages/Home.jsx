import React from 'react'
// import { Link } from 'react-router-dom'
// import Allproducts   from './Allproducts'
// import { RandomProduct } from '@/components/carousel/RandomProduct'
// import Banner from '@/components/root/Banner'
// import TrendingProducts from '@/components/root/TrendingProducts'
// import FeaturedCategories from '@/components/root/FeaturedCategories'
// import TestBtn from '@/components/root/TestBtn'
import Header from '@/components/root/Header'
import FeaturedProducts from '@/components/Landing page/FeaturedProducts'


function Home() {

  return (
    <div className='text-center container flex flex-col items-center justify-center gap-4 mt-4 min-h-screen'>
        <Header/>
        {/* <FilterNavbar   /> */}
        {/* <Banner/> */}
        {/* <TrendingProducts/>
        <FeaturedCategories/> */}

        <FeaturedProducts />
        {/* <TestBtn/> */}
        {/* <RandomProduct/> */}
        {/* <Allproducts/> */}
    </div>
  )
}

export default Home