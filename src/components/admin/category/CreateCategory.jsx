import Input from '@/components/root/Input'
import adminService from '@/services/admin.service'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

function CreateCategory() {

    const [input, setInput]= useState("")


const handleSubmit = async (e)=>{
 
  e.preventDefault()
  try {
    const res= await adminService.createCategory({ 
      "name": input.toString()
    })
    if(res?.success){
      console.log(res)
      toast.success(res?.message)
    }
  } catch (error) {
    toast.error(error?.response?.data?.message)
    console.log(error)
    return error
    
  }
  
}

  return (
    <div className='flex justify-center  items-center my-40 mx-auto'>
                       <form onSubmit={handleSubmit}
                       className='w-auto flex flex-col'
                       >
                      
       
      <div className='flex flex-row justify-center items-center py-3'>
        <Input 
          label="Category Name"
          className="font-bold"
          placeholder="Enter Category Name"
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          />
          </div>
         
       
      <input className='bg-blue-600 px-2 py-2 font-bold text-white rounded-2xl' type="submit" />
    </form>
      
    </div>
  )
}

export default CreateCategory