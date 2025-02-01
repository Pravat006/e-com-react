import React from "react";
import LogoutBtn from "../auth/LogoutBtn";
import { NavLink } from "react-router-dom";

function AdminDash() {
  return (
    <div>
      <div className="flex h-screen bg-gray-400 flex-col">
        {/* *********************** */}
        <div className="bg-blue-950 ">

        <h1 className="text-center p-4 text-white text-2xl ">Admin Dashboard</h1>
        </div>
        {/* *********************** **************************/}
        <div className="flex h-full">
        {/* *********************** **************************/}
          <div className="bg-blue-200 w-1/5 flex justify-between flex-col">
                {/* navBar */}
                {/* upper part */}
               <div className="h-3/5 bg-gray-400">
               </div>
               
               <div className="h-1/5 bg-gray-700">lower</div>
          </div>
        {/* *********************** **************************/}
          <div className="bg-green-400 flex-1"> 
                
          </div>
        </div>
      </div>
        {/* *********************** **************************/}

      <div className="text-red-600 text-2xl">
        <LogoutBtn />
      </div>
    </div>
  );
}

export default AdminDash;
