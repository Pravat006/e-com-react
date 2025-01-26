import React from 'react'
import { Link } from 'react-router-dom'

function WorkingonIt() {
  return (

    <div className='text-center flex flex-col justify-center'>
        <div className=' text-2xl text-white'>Working on it 😥</div>
        <h3>Go back to <Link className='text-white' to={"/"}>Home</Link> page</h3>
    </div>
  )
}

export default WorkingonIt