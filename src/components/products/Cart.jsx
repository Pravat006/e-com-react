import React, { useEffect, useState } from "react";

import {
  removeItemFromCart,
  fetchCart,
  updateQuantity,
  updateCartItemQuantity,
  emptyCart,
  applyCoupon,
  removeCoupon,
} from "../../slices/cartSlice.js";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  // DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import couponService from "@/services/coupon.service.js";
import { Link } from "react-router-dom";

function Cart() {
  const dispatch = useDispatch();
  const { items, cartTotal, discountedTotal, status, error, coupon } =
    useSelector((state) => state.cart);

  const [availableCoupons, setAvailableCoupons] = useState([]);
  console.log("coupons: ", availableCoupons);

  const handleRemove = (id) => {
    dispatch(removeItemFromCart(id));
  };
  const handleQuantityChange = (productId, operation) => {
    
    const item = items.find((item) => item.product._id === productId);
    if (item) {
      const newQuantity = operation === "increment" ? item.quantity + 1 : item.quantity - 1;
      if (newQuantity > 0) {
        dispatch(updateCartItemQuantity({ productId, quantity: newQuantity }));
        dispatch(updateQuantity({ productId, quantity: newQuantity }));
      }
    }
    
  };

  const handleApplyCoupon = (couponName) => {
    dispatch(applyCoupon(couponName));
    setIsApplied(true);
  };

  const handleRemoveCoupon = (couponName) => {
    dispatch(removeCoupon(couponName));
    setIsApplied(false);
  };

  const handleClearCart = () => {
    dispatch(emptyCart());
  };

  useEffect(() => {
    const fetchAllCoupons = async () => {
      const res = await couponService.availableCoupons();
      if (res) {
        setAvailableCoupons(res?.data.coupons);
        // console.log("available coupons: ", res?.data.coupons);
      }
    };
    dispatch(fetchCart());
    fetchAllCoupons();
  }, [dispatch]);

  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") {
    return <p>Error: {error}</p>;
  }
  return (
    <section>
      <div className="mx-auto max-w-screen-xl  py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
              Your Cart
            </h1>
          </div>

          <div className="mt-8">
            <ul className="space-y-4 px-4">
              {items?.length >= 0 &&
                items?.map((item) => (
                  <li
                    className="flex items-center gap-4"
                    key={item?.product?._id}
                  >
                    <img
                      src={item?.product.mainImage.url}
                      alt=""
                      className="size-16 rounded object-cover"
                    />

                    <div>
                      <h3 className="text-sm text-gray-900">
                        {item?.product.name}
                      </h3>

                      <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                        <div>
                          <dt className="inline">Price:</dt>
                          <dd className="inlinebg-green-600">
                            {item?.product.price}
                          </dd>
                        </div>

                        <div>
                          <dt className="inline">rating:</dt>
                          <dd className="inline">4/5</dd>
                        </div>
                      </dl>
                    </div>

                    <div className="flex flex-1 items-center justify-end gap-2">
                      <div className="flex items-center gap-0 bg-gray-50">
                        <button className="w-8 h-8 flex justify-center items-center  hover:bg-gray-800 hover:text-white text-gray-800 font-bold rounded "
                          onClick={() => handleQuantityChange(item?.product._id, "decrement")}
                        >
                          -
                        </button>
                        <h2 className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0  flex justify-center items-center  text-xs text-gray-600 :m-0 ">
                          {item.quantity}
                        </h2>
                        <button className="w-8 h-8 flex justify-center items-center  hover:bg-gray-800 hover:text-white text-gray-800 font-semibold rounded"
                          onClick={() => handleQuantityChange(item?.product._id, "increment")}
                        >
                          +
                        </button>
                      </div>

                      <button
                        className="text-gray-600 transition hover:text-red-600"
                        onClick={() => handleRemove(item?.product._id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </button>
                    </div>
                  </li>
                ))}
              {items.length === 0 && (
                <li>
                  <h1 className="text-xl text-gray-500">
                    your cart is empty 😪
                  </h1>
                </li>
              )}
            </ul>

            <div className="mt-8 flex justify-end border-t border-gray-100 pt-8 ">
              <div className="w-screen max-w-lg space-y-4">
                <dl className="space-y-0.5 text-sm text-gray-700">
                  <div className="flex justify-between px-1">
                    <dt>Subtotal</dt>
                    <dd className="text-yellow-700 font-bold">${cartTotal}</dd>
                  </div>

                  <div className="flex justify-between px-1">
                    <dt>Total items</dt>
                    <dd>{items.length}</dd>
                  </div>
                  <div className="flex justify-between px-1">
                    <dt>Total product quantity</dt>
                    <dd>{totalQuantity}</dd>
                  </div>

                  <div className="flex justify-between px-1">
                    <dt>Applied coupon</dt>
                    <dd className="inline-flex items-center justify-center rounded-full bg-indigo-100 px-2.5 pl-2 pr-0 text-indigo-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="-ms-1 me-1.5 size-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                        />
                      </svg>
                      <p>{coupon?.couponCode}</p>
                    </dd>
                  </div>
                  <div className="flex justify-between px-1">
                    <dt>Discount</dt>
                    <dd className="text-red-800 font-bold">
                      -${coupon?.discountValue || 0}
                    </dd>
                  </div>

                  <div className="flex justify-between !text-base font-medium px-1">
                    <dt>Total</dt>
                    <dd className="text-green-700 font-bold">
                      ${discountedTotal}
                    </dd>
                  </div>
                </dl>

                <div className="flex justify-end pr-1">
                  <Dialog>
                    <DialogTrigger>
                      <p className="whitespace-nowrap text-xs text-orange-600 font-bold bg-blue-50 px-1 py-1 ">
                        Apply Coupon
                      </p>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          Select the best offer available
                        </DialogTitle>
                      </DialogHeader>
                      <ul className="w-full">
                        {availableCoupons.map((item) => (
                          <li key={item?._id}>
                            <div className="flex justify-between items-center gap-2 border-black border-2 my-1">
                              <p className="text-bold text-orange-700 pl-2">
                                {item?.couponCode}
                              </p>
                              {coupon?.couponCode === item?.couponCode ? (
                                <button
                                  onClick={() =>
                                    handleRemoveCoupon(item?.couponCode)
                                  }
                                  className="px-2  bg-red-300 font-bold  my-1 mr-1 rounded-3xl flex justify-center items-center"
                                >
                                  remove
                                </button>
                              ) : (
                                <button
                                  onClick={() =>
                                    handleApplyCoupon(item?.couponCode)
                                  }
                                  className="px-3  bg-green-300 font-bold  my-1 mr-1 rounded-3xl flex justify-center items-center"
                                >
                                  apply
                                </button>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="flex sm:justify-end gap-1 justify-center ">
                  <Link
                    to={"/products/checkout"}
                    className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                  >
                    Checkout
                  </Link>
                  <button
                    onClick={handleClearCart}
                    className="block rounded bg-red-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-red-600"
                  >
                    clear cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cart;
