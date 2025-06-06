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
import ProductTable from "./components/admin/product/ProductTable";
import AdminProfile from "./components/admin/AdminProfile";
import SearchedProduct from "./components/products/SearchedProduct";
import CreateProduct from "./components/admin/product/CreateProduct";
import CategoryTable from "./components/admin/category/CategoryTable";
import CreateCategory from "./components/admin/category/CreateCategory";
import YourOrder from "./components/customer/YourOrder";
import Allproducts from "./pages/Allproducts";
import ShopByFetaturedCategory from "./components/products/ShopByFetaturedCategory";
import Wishlists from "./components/products/Wishlists";
import CheckouT from "./components/Checkout/CheckouT";
import NotFound from "./components/loader/NotFound";
import LandingPage from "./components/Landing page/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/user/forgot-password" element={<WorkingonIt />} />
        </Route>
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/product/id/:productId" element={<ProductDetails />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/products/c" element={<SearchedProduct />} />
          <Route path="/products/c" element={<ShopByFetaturedCategory />} />
          <Route path="/all-products" element={<Allproducts />} />
          <Route path="/all-products/page/:pageNumber" element={<Allproducts />} />
          <Route path="/test-page" element={<LandingPage />} />

          <Route>
            <Route element={<PrivateLayout />}>
              <Route path="/user/cart" element={<Cart />} />
              <Route path="/user/profile" element={<Profile />} />
              <Route path="/products/checkout" element={<CheckouT />} />
              <Route path="/user/orders" element={<YourOrder />} />
              <Route path="/user/wishlists" element={<Wishlists />} />
            </Route>
          </Route>
        </Route>
        <Route path="/admin/dashboard" element={<AdminLayout />}>
          <Route path="/admin/dashboard/" element={<AdminProfile />} />
          <Route
            path="/admin/dashboard/all-product"
            element={<ProductTable />}
          />
          <Route
            path="/admin/dashboard/create-product"
            element={<CreateProduct />}
          />

          <Route
            path="/admin/dashboard/all-category"
            element={<CategoryTable />}
          />
          <Route
            path="/admin/dashboard/create-category"
            element={<CreateCategory />}
          />
          {/* <NotFound  */}

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
