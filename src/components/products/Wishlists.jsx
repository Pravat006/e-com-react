import { fetchWistlists, removeFromWishlists } from "@/slices/wishListSlice.js";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Wishlists() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchWistlists());
  }, [dispatch]);
  const wishlists = useSelector((state) => state.wishlist.wishlists);

  const handleRemove = (ProductId) => {
    dispatch(removeFromWishlists(ProductId));
  };

  return (
    <section>
      <div className="mx-auto max-w-screen-xl  py-8 sm:px-6 sm:py-12 lg:px-8 bg-white bg-opacity-5 backdrop-blur rounded-2xl my-4">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <h1 className="text-xl font-bold  sm:text-3xl">Your wishlists</h1>
          </div>

          <div className="mt-8">
            <ul className="space-y-4 px-4">
              {wishlists?.length >= 0 &&
                wishlists?.map((item) => (
                  <li key={item?._id}>
                    <Link
                      to={`/product/id/${item?.product._id}`}
                      className="flex items-center gap-4"
                    >
                      <img
                        src={item?.product.mainImage?.url}
                        alt=""
                        className="size-16 rounded object-cover"
                      />

                      <div>
                        <h3 className="text-sm ">{item?.product.name}</h3>

                        <dl className="mt-0.5 space-y-px text-[10px] ">
                          <div className="flex">
                            <dt className="inline">Price: </dt>
                            <dd className="inline text-green-600">
                              ₹{item?.product.price}
                            </dd>
                          </div>

                          <div>
                            <dt className="inline">rating:</dt>
                            <dd className="inline">4/5</dd>
                          </div>
                        </dl>
                      </div>

                      <div className="flex flex-1 items-center justify-end gap-2">
                        <button
                          className="text-gray-600 transition hover:text-red-600 ml-16"
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
                    </Link>
                  </li>
                ))}
              {wishlists.length === 0 && (
                <li>
                  <h1 className="text-xl text-gray-500">
                    your wishlists is empty 😪
                  </h1>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Wishlists;
