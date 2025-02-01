import React from "react";
import AuthService from "../../services/auth.service.js";
import { login } from "../../slices/authSlice.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "../root/Input.jsx";
import Button from "../root/Button.jsx";
import logo from "../../assets/technological-advancement.png";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [error, setError] = React.useState(null);
  const { register, handleSubmit } = useForm();
  const onSubmit =  async (data) => {
    try { 
      const res = await AuthService.login(data);
      // console.log(data)
      if (res?.data) {
        dispatch(login(res.data));
        toast.success('logged in successful')
        
        // console.log(data)
        if (res?.data.user.role === "ADMIN") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
          
        }
      }
    } catch (error) {
      setError(error?.message);
      console.log(error)
      toast.error('Something went wrong !')
    }
  };

  return (
    <div className="max-w-sm w-full text-gray-600 space-y-5 bg-white mx-auto rounded-md p-4">
      <div className="text-center pb-8 flex">
        <img src={logo} width={50} height={50} className="mx-auto" 
              onClick={()=> navigate("/")}
        />

        <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl text- ">
          Log in to your account
        </h3>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        {/* email input */}
        <Input
          label="Email"
          placeholder="Enter your email id"
          // autoComplete="off"
          {...register('email', {
            required: true,
            validate: {
              matchPattern: (value) =>
                /^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/gm.test(
                  value
                ) || "Email addresss must be a valid address",
            },
          })}
        />
        {/* PASSWORD input */}
        <Input
          label="Password"
          // autoComplete="off"
          placeholder="Enter your password"
          {...register('password', {
            required: true,
            
          })}
        />
        <div className="flex items-center justify-between text-sm">
          <Link
            to={"/user/forgot-password"}
            className="text-center text-indigo-600 hover:text-indigo-500"
          >
            Forgot password?
          </Link>
        </div>
        {/* BUTTON */}
        <Button
          type="submit"
          label="Log in"
          text="log in"
          className="text-xl"
        />
      </form>
      {error && <p className="text-red-600 mt-8">{error}</p>}

      <p className="text-center">
        Don't have an account?{" "}
        <Link
          to={"/sign-up"}
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}

export default Login;
