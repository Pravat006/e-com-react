import ProductCard from "@/components/products/ProductCard";
import React, { useState } from "react";
import ProductService from "../services/product.service.js";
import { useQuery } from "@tanstack/react-query";

function Allproducts() {
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState();

  const fetchProducts = async () => {
    try {
      const res = await ProductService.getAllProducts(pageNumber);

      setTotalPages(res?.data?.totalPages);
      return res?.success ? res?.data?.products : [];
    } catch (error) {
      console.log("failed to fetch data");
      throw new Error(error?.message || "Failed to fetch products");
    }
  };

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["products", pageNumber],
    queryFn: fetchProducts,
  });

  if (isLoading)
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 p-4 lg:p-12">
        {Array.from({ length: 12 }).map((_, index) => (
          <div
            key={index}
            className="h-full max-w-sm backdrop-blur-lg p-0 animate-pulse"
          >
            <div className="h-full max-w-sm">
              <div className="bg-gray-300 dark:bg-gray-700 h-52 w-full rounded-lg"></div>

              <div className="flex-grow flex flex-col justify-between mt-4 px-1">
                <div>
                  <div className="bg-gray-300 dark:bg-gray-700 h-6 w-3/4 mt-4 mb-2 rounded"></div>
                  <div className="bg-gray-300 dark:bg-gray-700 h-4 w-full mb-1 rounded"></div>
                  <div className="bg-gray-300 dark:bg-gray-700 h-4 w-5/6 mb-2 rounded"></div>
                </div>

                <div className="flex justify-between items-center p-2 mt-2">
                  <div className="bg-gray-300 dark:bg-gray-700 h-8 w-1/3 rounded-full"></div>
                  <div className="bg-gray-300 dark:bg-gray-700 h-8 w-1/2 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  if (isError)
    return (
      <p className="text-red-500 text-center p-4">
        .......{error?.message || "An error occurred while fetching products."}
        .......
      </p>
    );

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 p-4 lg:p-12">
        {data?.map((product) => (
          <ProductCard
            data={product}
            id={product?._id}
            key={product?._id}
            imageLink={product?.mainImage?.url}
            name={product?.name}
            description={product?.description}
            price={product?.price}
          />
        ))}
      </div>
      <div className="text-center items-center justify-center flex w-full p-4 ">
        <div className="flex justify-between items-center  mx-auto">
          <button
            onClick={() => setPageNumber((next) => Math.max(1, next - 1))}
            disabled={pageNumber === 1}
            className="bg-gray-300 text-black font-bold px-4 py-2 rounded hover:bg-gray-400 disabled:opacity-50 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            Previous
          </button>
          <h1 className="px-4 font-bold border-black outline-[1px] outline mx-1 rounded dark:border-gray-600 dark:text-gray-200">
            {pageNumber}
          </h1>
          <button
            onClick={() => setPageNumber((prev) => prev + 1)}
            disabled={!data || data.length === 0 || pageNumber >= totalPages}
            className="bg-gray-300 text-black font-bold px-8 py-2 rounded hover:bg-gray-400 disabled:opacity-50 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Allproducts;
