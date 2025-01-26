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
          <Route path="/admin/dashboard" element={<WorkingonIt/>} />
          <Route path="/user/cart" element={<Cart/>} />
        </Route>
         
       

      </Routes>
    </BrowserRouter>
  );
}

export default App;
