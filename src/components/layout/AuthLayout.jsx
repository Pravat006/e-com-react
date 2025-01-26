import React from "react";
import { Outlet } from "react-router-dom";
// import { Toaster } from "react-hot-toast";

function AuthLayout() {
  return (
    <div
      className="h-screen bg-cover flex items-center justify-center m-0 "
      style={{
        background:
          "linear-gradient(143deg, rgba(80,116,145,1) 0%, rgba(10,33,64,1) 63%)",
      }}
    >
     

      <Outlet />
    </div>
  );
}

export default AuthLayout;
