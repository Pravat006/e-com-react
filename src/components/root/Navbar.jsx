import React from "react";
import Searchbar from "./Searchbar";
import { IoIosCart } from "react-icons/io";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../../assets/technological-advancement.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RxAvatar } from "react-icons/rx";
import LogoutBtn from "../auth/LogoutBtn";
import ThemeButton from "./ThemeButton";

function Navbar() {
  const authStatus = useSelector((state) => state.auth.status);
  const authData = useSelector((state) => state.auth.userData);
  return (
    <header className="text-base lg:text-sm shadow-md backdrop-blur-md sticky top-0 z-50 bg-transparent">
      <div className="items-center px-4 max-w-screen-xl mx-auto flex lg:px-8 justify-between p-4 py-3">
        <div className="flex justify-center items-center">
          <img src={logo} width={50} height={50} alt="tech-cart" />
          <span className="sm:text-2xl text-gray-800 dark:text-gray-100 font-serif sm:font-bold hidden sm:block">
            Gear Mart
          </span>
        </div>
        <div className="search-bar">
          <Searchbar />
        </div>
        <div className="flex items-center space-x-4 justify-between">
          {authStatus && <ThemeButton className="hidden sm:flex" />}
          {!authStatus && <ThemeButton />}
          <div className="flex items-center space-x-4">
            {!authStatus && (
              <Link
                to="/login"
                className="text-gray-900 dark:text-gray-100 bg-gray-400 flex items-center justify-center px-3 py-2 text-xl rounded-[50px]"
              >
                <RxAvatar />
              </Link>
            )}
          </div>
          {authStatus && (
            <div className="cartLogo-and-profile flex justify-between items-center mr-4">
              <div className="items-center space-x-4 hidden sm:flex px-5">
                <Link to="/user/cart">
                  <IoIosCart className="text-4xl text-[var(--text-bg)] dark:text-gray-100" />
                </Link>
              </div>
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar>
                      <AvatarImage
                        src={
                          authData?.user.avatar.url ||
                          "https://static.vecteezy.com/system/resources/previews/005/544/718/large_2x/profile-icon-design-free-vector.jpg"
                        }
                      />
                      <AvatarFallback src={authData?.user.name} />
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="flex items-center justify-center dark:text-gray-100">
                      <Link to="/user/profile">Your Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center justify-center dark:text-gray-100">
                      <Link to="/user/orders">Your Orders</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center justify-center dark:text-gray-100">
                      <Link to="/user/cart">Your Cart</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center justify-center dark:text-gray-100">
                      <Link to="/user/wishlists">Wishlists</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="sm:hidden flex items-center justify-center p-0">
                      <ThemeButton className="h-full w-full" />
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center justify-center dark:text-gray-100">
                      <LogoutBtn />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
export default Navbar;
