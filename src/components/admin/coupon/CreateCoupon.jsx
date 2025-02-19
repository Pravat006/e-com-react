import Input from '@/components/root/Input'
import React from 'react'
import { useForm } from 'react-hook-form'

function CreateCoupon() {

const {handleSubmit, register }= useForm() 


const onSubmit = async (data) => {
    console.log(data)   
}
    
  return (
    <div className='flex justify-center  items-center my-40 mx-auto'>   

        <form onSubmit={handleSubmit} >

            <Input />
            <Input />
            <Input />
            <Input />
            <Input />
            <Input />


        </form>


    </div>
  )
}

export default CreateCoupon