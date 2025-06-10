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

// import Carousel from '@/components/root/Carousel'


function Home() {
  //  const slides = [
  //   {
  //     image: 'https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
  //     alt: 'A beautiful landscape with mountains and a lake.',
  //   },
  //   {
  //     image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
  //     alt: 'A serene forest with a path leading through the trees.',
  //   },
  //   {
  //     image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
  //     alt: 'A vibrant city skyline at night.',
  //   },
  // ];
    // const navigate= useNavigate()
  return (
    <div className='text-center container flex flex-col items-center justify-center gap-4 mt-4 min-h-screen'>
        <Header/>
        {/* <FilterNavbar   /> */}
        {/* <Banner/> */}
        {/* <TrendingProducts/>
        <FeaturedCategories/> */}
        {/* <Carousel slides={slides} /> */}
        <FeaturedProducts />
        {/* <TestBtn/> */}
        {/* <RandomProduct/> */}
        {/* <Allproducts/> */}
    </div>
  )
}

export default Home