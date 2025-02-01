import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import SideBar from "../admin/SideBar";

function AdminLayout() {
  const authStatus = useSelector((state) => state.auth.status);
  return (
    authStatus && (
      <div className="flex h-screen flex-col bg-white">
          <div className="bg-gray-800 text-white p-4">
            <h1 className="text-center"> Admin Dashboard</h1>
          </div>
          <div className="flex h-full">
            <SideBar /> 
            <div className="flex-1">
            <Outlet />
            </div>
          </div>

      </div>
    )
  );
}

export default AdminLayout;
