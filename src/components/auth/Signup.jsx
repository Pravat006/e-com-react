import React, { useState } from "react";
import Input from "../root/Input";
import Button from "../root/Button";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import AuthService from "../../services/auth.service.js";

function Signup() {
  const [successFields, setSuccessFields] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    watch
  } = useForm({
    defaultValues: {
      role: "USER"
    }
  });

  const navigate = useNavigate();

  // Watch field values to determine success states
  const watchedFields = watch(['username', 'email', 'password']);

  // Use React Query mutation for signup
  const signupMutation = useMutation({
    mutationFn: (userData) => AuthService.register(userData),
    onSuccess: (res, variables) => {
      if (res?.success === true) {
        toast.success(
          "User registered successfully and verification email has been sent to your email.",
          {
            duration: 3000,
            position: 'top-center',
          }
        );
        setTimeout(() => {
          navigate("/", { 
            state: { 
              message: "Please check your email to verify your account before logging in.",
              newUser: true 
            }
          });
        }, 1000);
      } else {
        handleValidationErrors(res);
      }
    },
    onError: (error) => {
      console.error("Registration error:", error);
      // Handle network errors or other thrown errors
      toast.error("Something went wrong. Please try again.");
    }
  });

  // Function to handle validation errors
  const handleValidationErrors = (res) => {
    const errorMessage = res?.message?.toLowerCase() || "";
    const statusCode = res?.statusCode;

    setSuccessFields({});

    if (statusCode === 409) {
      if (errorMessage.includes('email') || errorMessage.includes('username')) {
        setError("email", {
          type: "server",
          message: "This email already exists."
        });
        setError("username", {
          type: "server",
          message: "This username already exists."
        });
        toast.error("Email or username already exists!");
      } else {
        toast.error("User already exists. Please try with different credentials.");
      }
      return;
    }

    // Handle specific field errors if backend provides them
    if (errorMessage.includes('email') && errorMessage.includes('exist')) {
      setError("email", {
        type: "server",
        message: "This email already exists. Please use a different email."
      });
      toast.error("Email already exists!");
      return;
    }

    if (errorMessage.includes('username') && errorMessage.includes('exist')) {
      setError("username", {
        type: "server",
        message: "This username already exists. Please choose a different username."
      });
      toast.error("Username already exists!");
      return;
    }

    // Handle validation errors (400)
    if (statusCode === 400) {
      toast.error("Please check your information and try again.");
      return;
    }

    // Generic error fallback
    toast.error(res?.message || "Registration failed. Please try again.");
  };

  // Function to determine if field is valid (no errors and has value)
  const isFieldValid = (fieldName, fieldValue) => {
    return !errors[fieldName] && fieldValue && fieldValue.length > 0;
  };

  const onSubmit = (data) => {
    clearErrors(); // Clear any previous server errors
    setSuccessFields({}); // Clear success states
    console.log("Submitting registration data:", { ...data, password: "***" });
    signupMutation.mutate(data);
  };

  return (
    <div className="max-w-sm w-full text-gray-600 space-y-5 bg-white mx-3 rounded-3xl p-2 ">
      <div className="bg-white shadow sm:p-6 sm:rounded-lg">
        <div className="mt-5">
          <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl pl-4 pb-3">
            Create an account
          </h3>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Username input */}
          <Input
            label="Username"
            placeholder="Enter your username"
            error={errors.username}
            success={isFieldValid('username', watchedFields[0]) ? "Username looks good!" : null}
            disabled={signupMutation.isPending}
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters"
              }
            })}
          />

          {/* Email input */}
          <Input
            label="Email"
            placeholder="Enter your email id"
            type="email"
            error={errors.email}
            success={isFieldValid('email', watchedFields[1]) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(watchedFields[1]) ? "Email looks good!" : null}
            disabled={signupMutation.isPending}
            {...register("email", {
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
            success={isFieldValid('password', watchedFields[2]) && watchedFields[2]?.length >= 8 ? "Password looks good!" : null}
            disabled={signupMutation.isPending}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters"
              },
              maxLength: {
                value: 20,
                message: "Password must be less than 20 characters"
              }
            })}
          />

          <Button
            text={signupMutation.isPending ? "Creating Account..." : "Create Account"}
            type="submit"
            disabled={signupMutation.isPending}
          />
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
