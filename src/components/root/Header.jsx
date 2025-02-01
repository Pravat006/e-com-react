import React, { useState } from "react";
import Searchbar from "./Searchbar";
import { IoIosCart } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import {  useSelector } from "react-redux";
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

function Header() {
  const navigate = useNavigate();
  // const [userData, setUserData] = React.useState();
  // const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);
  const authData = useSelector((state) => state.auth.userData);
  // const [state, setState] = useState(false);
  // console.log("auth status : ", authStatus);
  // console.log("auth data : ", authData);

  

  return (
    <header className="text-base lg:text-sm bg-gray-50 shadow-md">
     

      {/* ************************************************************** */}
      <div className=" items-center  px-4 max-w-screen-xl mx-auto flex lg:px-8 static justify-between p-4 py-3">
        <div className="flex justify-center items-center">

        <img src={logo} width={50} height={50} alt="tech-cart"  />
        <span className="sm:text-2xl  font-serif sm:font-bold hidden sm:block">Tech Cart</span>
        </div>
 
        <div className="search-bar">
          <Searchbar />
        </div>
        <div className="flex items-center space-x-4 ">
          {!authStatus && (
            <Link
              to="/login"
              className="  text-gray-900  bg-gray-400 flex items-center justify-center px-3 py-2 text-xl  rounded-[50px]  "
            >
              <RxAvatar />
            </Link>
          )}
        </div>
         
            {authStatus && (
        <div className="cartLogo-and-profile flex justify-between items-center mr-4 ">
       
            <div className="items-center space-x-4 hidden sm:flex px-5">
              <Link to="/user/cart">
                <IoIosCart className="text-4xl   text-gray-800 hover:text-gray-900" />
              </Link>
            </div>
                <div>

               
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage src={ authData?.user.avatar.url || "https://static.vecteezy.com/system/resources/previews/005/544/718/large_2x/profile-icon-design-free-vector.jpg"} />
                    <AvatarFallback src={authData?.user.name} />
                  </Avatar>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link to="/user/profile">Your Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/user/orders">Your Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/user/cart">Your Cart</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/user/wishlists">Wishlists</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <LogoutBtn/>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              </div>
                  
       
          </div>
            )}
            
      </div>
    </header>
  );
}
export default Header;
