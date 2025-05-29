import React from 'react'
import { useNavigate } from 'react-router-dom'
function TestBtn() {
    const navigate= useNavigate()
  return (
    <div className='flex h-20 w-full justify-center items-center'>
        <button onClick={()=>navigate("/test-page")} className='text-center bg-blue-500 text-white font-bold text-2xl py-3 px-5 rounded-lg' >Test page button</button>
    </div>
  )
}

export default TestBtn