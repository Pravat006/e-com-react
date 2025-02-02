import React from "react";
import Input from "../root/Input";
import Button from "../root/Button";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AuthService from "../../services/auth.service.js"

function Signup() {
  const { register, handleSubmit } = useForm({
    defaultValues:{       
        role:"USER"
    }
  });
  const navigate = useNavigate()
  const onSubmit = async (data)=>{
    try {
      console.log(data)
          const res= await AuthService.register(data)
          console.log(res)
          if(res?.success){
              toast.success("account create successful")
              navigate("/")
          }else{
              toast.error(res?.message)
          }
      
    } catch (error) {
      console.log(error)
      toast.error("something went wrong")
      
    }
  }

  return (
    <div className="max-w-sm w-full text-gray-600 space-y-5 bg-white mx-auto rounded-md p-2 ">
      <div className="bg-white shadow  sm:p-6 sm:rounded-lg">
        <div className="mt-5  ">
          <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl pl-4 pb-3">
            Create an account
          </h3>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* username input */}
          <Input
            label="Username"
            placeholder="Enter your username"
            {...register("username", {
              required: true,
            })}
          />
          {/* email input */}
          <Input
            label="Email"
            placeholder="Enter your email id"
            {...register("email", {
              required: true,
              validate: {
                matchPattern: (value) =>
                  /^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/gm.test(
                    value
                  ) || "Email addresss must be a valid address",
              },
            })}
          />
          {/* password input */}
          <Input
            label="Password"
            placeholder="Enter your password"
            {...register("password", {
              required: true,
              minLength: 8,
              maxLength: 20,
            })}
          />
          <Button text="Create account" type="submit" />
        </form>
        <div className="text-center">
          <div className="mt-5 space-y-2">
            <p className="">
              Already have an account?{" "}
              <Link
                to={"/login"}
                className="font-medium text-indigo-600 hover:text-indigo-500"
                             >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
