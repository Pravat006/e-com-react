import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "./components/layout/AuthLayout";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import WorkingonIt from "./components/root/WorkingonIt";
import UserLayout from "./components/layout/UserLayout";
import Home from "./pages/Home";
import Cart from "./components/products/Cart";
import ProductDetails from "./components/products/ProductDetails";
import Profile from "./components/root/Profile";
import PrivateLayout from "./components/layout/PrivateLayout";
import AdminLayout from "./components/layout/AdminLayout";
// import AdminDash from "./components/admin/AdminDash";
import ProductTable from "./components/admin/product/ProductTable";
import AdminProfile from "./components/admin/AdminProfile";
import SearchedProduct from "./components/products/SearchedProduct";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout/>} >
          <Route path="/login" element={<Login/>} />
          <Route path="/sign-up" element={<Signup/>} />
          <Route path="/user/forgot-password" element={<WorkingonIt/>} />     
        </Route>
        <Route element={<UserLayout/>} >            
          <Route path="/" element={<Home/>} />
          <Route path='/product/id/:productId' element={<ProductDetails/>} />
          <Route path='/products/c' element={<SearchedProduct/>} />
          <Route>
            <Route element={<PrivateLayout/>}>
              <Route path="/user/cart" element={<Cart/>} />
              <Route path="/user/profile" element={<Profile/>} />
            </Route>
          </Route>
           
        </Route>
          <Route  path="/admin/dashboard" element={<AdminLayout/>} >
            <Route path="/admin/dashboard/" element={<AdminProfile/>} />
            <Route path="/admin/dashboard/all-product" element={<ProductTable/>} />
          </Route>
         
       

      </Routes>
    </BrowserRouter>
  );
}

export default App;
