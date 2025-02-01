import React from 'react'
// import { Link } from 'react-router-dom'
import Allproducts from './Allproducts'
// import { RandomProduct } from '@/components/carousel/RandomProduct'
import Banner from '@/components/root/Banner'


function Home() {
    // const navigate= useNavigate()
  return (

    <div className='text-center'>
        <Banner/>
        {/* <RandomProduct/> */}
        <Allproducts/>


       
    
    </div>
  )
}

export default Home