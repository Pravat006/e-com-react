import React from "react";
import AuthService from "../../services/auth.service.js";
import { login } from "../../slices/authSlice.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import Input from "../root/Input.jsx";
import Button from "../root/Button.jsx";
import logo from "../../assets/technological-advancement.png";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    setError,
    clearErrors,
    watch
  } = useForm();

  // Watch field values for success state
  const watchedFields = watch(['email', 'password']);

  // Use React Query mutation for login
  const loginMutation = useMutation({
    mutationFn: (userData) => AuthService.login(userData),
    onSuccess: (res, variables) => {
      // console.log("Login response:", res);
      
      if (res?.data) {
        dispatch(login(res.data));
        toast.success('Logged in successfully!', {
          duration: 3000,
          position: 'top-center',
        });
        
        // Navigate based on user role
        if (res?.data.user.role === "ADMIN") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      } else {
        // Handle cases where login didn't return expected data
        toast.error("Login failed. Please try again.");
      }
    },
    onError: (error) => {
      console.error("Login error:", error);
      
      // Handle different types of login errors
      if (error.response?.status === 401) {
        setError("email", {
          type: "server",
          message: "Invalid email or password."
        });
        setError("password", {
          type: "server",
          message: "Invalid email or password."
        });
        toast.error("Invalid email or password!");
      } else if (error.response?.status === 400) {
        toast.error("Please check your login details.");
      } else if (error.response?.status >= 500) {
        toast.error("Server error. Please try again in a few moments.");
      } else if (error.name === 'NetworkError' || error.message.includes('fetch')) {
        toast.error("Network error. Please check your connection.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  });

  // Function to determine if field is valid
  const isFieldValid = (fieldName, fieldValue) => {
    return !errors[fieldName] && fieldValue && fieldValue.length > 0;
  };

  const onSubmit = (data) => {
    clearErrors(); // Clear any previous server errors
    console.log("Submitting login data:", { ...data, password: "***" });
    loginMutation.mutate(data);
  };

  return (
    <div className="max-w-sm w-full text-gray-600 space-y-5 bg-white sm:mx-auto mx-3 rounded-3xl p-4">
      <div className="text-center pb-8 flex">
        <img 
          src={logo} 
          width={50} 
          height={50} 
          className="mx-auto mr-0 cursor-pointer" 
          onClick={() => navigate("/")}
          alt="Logo"
        />
        <h3 className="text-gray-800 text-2xl font-bold ml-0 mx-auto flex items-center justify-center">
          Log in to your account
        </h3>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Email input */}
        <Input
          label="Email"
          placeholder="Enter your email id"
          type="email"
          error={errors.email}
          success={isFieldValid('email', watchedFields[0]) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(watchedFields[0]) ? true : null}
          disabled={loginMutation.isPending}
          {...register('email', {
            required: "Email is required",
            validate: {
              matchPattern: (value) =>
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 
                "Please enter a valid email address",
            },
          })}
        />
        
        {/* Password input */}
        <Input
          label="Password"
          placeholder="Enter your password"
          type="password"
          error={errors.password}
          success={isFieldValid('password', watchedFields[1]) && watchedFields[1]?.length >= 6 ? true : null}
          disabled={loginMutation.isPending}
          {...register('password', {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters"
            }
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
        
        {/* Submit Button */}
        <Button
          type="submit"
          text={loginMutation.isPending ? "Logging in..." : "Log in"}
          className={`text-xl w-full ${loginMutation.isPending ? "opacity-75 cursor-not-allowed" : ""}`}
          disabled={loginMutation.isPending}
        />
      </form>

      {/* Error display for general errors */}
      {loginMutation.isError && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3">
          <p className="text-red-600 text-sm text-center">
            Login failed. Please check your credentials and try again.
          </p>
        </div>
      )}

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
