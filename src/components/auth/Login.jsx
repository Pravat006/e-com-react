import React from "react";
import AuthService from "../../services/auth.service.js";
import { login } from "../../slices/authSlice.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "../root/Input.jsx";
import Button from "../root/Button.jsx";
import logo from "../../assets/file.png";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = React.useState(null);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data) => {
    try {
      const res = await AuthService.login(data);
      if (res.success) {
        dispatch(login(res.data));
        toast.success('logged in successful')
        if (res?.data.role === "ADMIN") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      setError(error?.message);
      toast.error('Something went wrong !')
    }
  };

  return (
    <div className="max-w-sm w-full text-gray-600 space-y-5 bg-white mx-auto rounded-md p-4">
      <div className="text-center pb-8 flex">
        <img src={logo} width={50} height={50} className="mx-auto" />

        <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl text- ">
          Log in to your account
        </h3>
      </div>
      <form
        onSubmit={() => handleSubmit(onSubmit)}
        className="space-y-5"
      >
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
        {/* PASSWORD input */}
        <Input
          label="Password"
          placeholder="Enter your password"
          {...register("password", {
            required: true,
            
          })}
        />
        <div className="flex items-center justify-between text-sm">
          <a
            href="javascript:void(0)"
            className="text-center text-indigo-600 hover:text-indigo-500"
          >
            Forgot password?
          </a>
        </div>
        {/* BUTTON */}
        <Button
          type="submit"
          label="Log in"
          text="sign in"
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
