import React from "react";
// import { NavLink } from "react-router-dom";
import LogoutBtn from "../auth/LogoutBtn";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  // SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

function SideBar() {
  const navigate = useNavigate();

  const navItems=[
    {
      selectValue: "Product",
      options: [
        {
          value: "/admin/dashboard/all-product",
          label: "All Products",
        },
        {
          value: "/admin/dashboard/create-product",
          label: "Create product",
        },
        {
          value: "/admin/dashboard/delete-product",
          label: "Delete product",
        },
        {
          value: "/admin/dashboard/update-product",
          label: "Update product",
        },
        {
          value: "/admin/dashboard/remove-subImahe",
          label: "Remove SubImage",
        },
      ]
    },
    {
      selectValue: "Coupon",
     options: [
        {
          value: "/admin/dashboard/all-coupon",
          label: "All Coupon",
        },
        {
          value: "/admin/dashboard/create-coupon",
          label: "Create coupon",
        },
        {
          value: "/admin/dashboard/update-coupon",
          label: "Update coupon",
        },
        {
          value: "/admin/dashboard/delete-coupon",
          label: "Delete coupon",
        },
        {
          value: "/admin/dashboard/toggle-coupon-status",
          label: "Toggle coupon status",
        },
      ]
    },
    {
      selectValue: "Category",
      options: [
        {
          value: "/admin/dashboard/all-category",
          label: "All Category",
        },
        {
          value: "/admin/dashboard/create-category",
          label: "Create category",
        },
        {
          value: "/admin/dashboard/update-category",
          label: "Update category",
        },
      ]
    },
    {
      selectValue: "Order",
      options: [
        {
          value: "/admin/dashboard/order-list",
          label: "Order List",
        },
        {
          value: "/admin/dashboard/update-order-status",
          label: "Update Order Status",
        },
      ]
    },
  ];
  
    const handleValueChange = (value) => {
      navigate(value);
    };

  return (
    <div className="w-1/6 flex justify-between flex-col container">
      <div className=" bg-gray-700 h-full">
        {/* navbar */}
        <div className="flex flex-col gap-2  text-white justify-between"> 
          {
            navItems.map((item, index) => (
              <Select key={index} value={item.selectValue} onValueChange={handleValueChange} >
                <SelectTrigger className="w-[99%] mx-auto mt-1">
                  <SelectValue>{item.selectValue} </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {
                      item.options.map((option, index) => (
                        <SelectItem key={index} value={option.value}>
                          {option.label}
                        </SelectItem> 
                      ))  
                    }
                  </SelectGroup>
                </SelectContent>
              </Select>
            ))
          }
        
          {/* <NavLink to="/admin/dashboard/all-product" className="p-4 ">
            All products
          </NavLink>
          <NavLink to="/admin/dashboard/product" className="p-4">
            Product
          </NavLink>
          <NavLink to="/admin/dashboard/all-coupon" className="p-4 ">
            All coupon
          </NavLink>
          <NavLink to="/admin/dashboard/coupon" className="p-4 ">
            Coupon
          </NavLink>
          <NavLink to="/admin/dashboard/all-category" className="p-4 ">
            All category
          </NavLink>
          <NavLink to="/admin/dashboard/category" className="p-4 ">
            Category
          </NavLink>
          <NavLink to="/admin/dashboard/order-list" className="p-4 ">
            Order list
          </NavLink> */}
        </div>
      </div>
      <div className="h-1/5 bg-gray-200">
        <LogoutBtn />
      </div>
    </div>
  );
}

export default SideBar;
