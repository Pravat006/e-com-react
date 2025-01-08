import React from "react";
import Searchbar from "./Searchbar";
import { IoIosCart } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/file.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AuthService from "@/services/auth.service.js";
import { logout } from "@/slices/authSlice";

function Header() {
  const navigate = useNavigate();
  const [userData, setUserData] = React.useState();
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);
  try {
    AuthService.currentUser().then((response) => {
      setUserData(response.data);
    });
  } catch (error) {
    error.response?.message;
  }

  const handleLogout = () => {
    try {
      AuthService.logout().then(() => {
        navigate("/");
        dispatch(logout());
      });
    } catch (error) {
      error.message;
    }
  };

  return (
    // <div className="flex justify-between items-center">
    //   <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
    //     {/* logo */}
    //     <div>
    //       <img src={logo}
    //         alt="tech-cart"
    //         width={50}
    //         height={50}
    //         className="cursor-pointer"
    //         onClick={() => navigate("/")}
    //       />
    //     </div>
    //     <Searchbar />
    //     {
    //       !authStatus &&
    //       <div className="flex items-center space-x-4">
    //         <Link to="/login" className="text-gray-800 hover:text-gray-900">Login</Link>
    //       </div>
    //     }
    //     {
    //       authStatus &&

    //       <DropdownMenu>
    //         <DropdownMenuTrigger>
    //           <Avatar>
    //             <AvatarImage src={userData?.avatar.url} />
    //             <AvatarFallback>{userData?.username}</AvatarFallback>
    //           </Avatar>
    //         </DropdownMenuTrigger>
    //         <DropdownMenuContent>

    //           <DropdownMenuSeparator />
    //           <DropdownMenuItem>Profile</DropdownMenuItem>
    //           <DropdownMenuItem>
    //             {/* logout btn */}
    //           </DropdownMenuItem>

    //         </DropdownMenuContent>
    //       </DropdownMenu>

    //     }

    //   </div>
    // </div>

    <header className="text-base lg:text-sm">
      <div
        className={`bg-white items-center gap-x-14 px-4 max-w-screen-xl mx-auto lg:flex lg:px-8 lg:static ${
          state ? "h-full fixed inset-x-0" : ""
        }`}
      >
        <div className="flex items-center justify-between py-3 lg:py-5 lg:block">
          <Link to="/" className="cursor-pointer">
            <img src={logo} width={50} height={50} alt="tech-cart" />
          </Link>
          <div className="lg:hidden">
            <button
              className="text-gray-500 hover:text-gray-800"
              onClick={() => setState(!state)}
            >
              {state ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm8.25 5.25a.75.75 0 01.75-.75h8.25a.75.75 0 010 1.5H12a.75.75 0 01-.75-.75z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        <Searchbar />
        {authStatus && (
          <div className="flex items-center space-x-4">
            <Link to="/user/cart">
              <IoIosCart className="text-2xl text-gray-800 hover:text-gray-900" />
            </Link>
          </div>
        )}
        {authStatus ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src={userData?.avatr.url} />
                <AvatarFallback>{userData?.username}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to="/update-profile">Update Profile</Link>
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
                <button
                  onClick={handleLogout}
                  variant="destructive"
                  className="w-full space-x-2 bg-red-700 text-white hover:bg-red-800"
                >
                  Logout
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center space-x-4">
            <Link to="/login" className="text-gray-800 hover:text-gray-900">
              Login
            </Link>
          </div>
        )}
      </div>
    </header>


          
    
    

  );
}
export default Header;
