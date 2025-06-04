import ProductCard from "@/components/products/ProductCard";
import ProductCardSkeleton from "@/components/products/ProductCardSkeleton";
import React, { useState } from "react"; 
import ProductService from "../services/product.service.js";
import { useQuery } from "@tanstack/react-query";

function Allproducts() {
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
const [page, setPage] = useState(1);
  const totalPage = 12;
  const itemsPerPage = 10;
  const totalItems = 115;

  const fetchProducts = async () => {
    try {
      const res = await ProductService.getAllProducts(pageNumber);
      if (res?.success && res.data) {
        setTotalPages(res.data.totalPages || 1);
        return res.data.products || [];
      }
      throw new Error(res?.message || "Failed to fetch products structure");
    } catch (error) {
      console.error("Failed to fetch data:", error);
      throw new Error(error?.message || "Failed to fetch products");
    }
  };

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["products", pageNumber],
    queryFn: fetchProducts,
  });

  const displaySkeleton = isLoading; 
  if (isError) {
    return (
      <p className="text-red-500 text-center p-4">
        .......{error?.message || "An error occurred while fetching products."}
        .......
      </p>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-4 sm:gap-x-4 sm:gap-y-8 p-4 lg:p-12 w-full">
        {displaySkeleton
          ? Array.from({ length: 8 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))
          : data && data.length > 0
            ? data.map((product) => (
                <ProductCard
                  id={product?._id}
                  key={product?._id}
                  imageLink={product?.mainImage?.url}
                  name={product?.name}
                  description={product?.description}
                  price={product?.price}
                />
              ))
            : null 
        }
      </div>

      {/* Message for no products */}
      {!displaySkeleton && (!data || data.length === 0) && (
        <p className="text-center p-4">No products found.</p>
      )}

      {/* Pagination controls - only show if not displaying skeleton and there's data */}
      {!displaySkeleton && data && data.length > 0 && (
        <div className="text-center items-center justify-center flex w-full p-4 ">
          <div className="flex justify-between items-center mx-auto">
            <button
              onClick={() => setPageNumber((prev) => Math.max(1, prev - 1))}
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
              disabled={pageNumber >= totalPages || data.length === 0}
              className="bg-gray-300 text-black font-bold px-8 py-2 rounded hover:bg-gray-400 disabled:opacity-50 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            >
              Next
            </button>
          </div>
        </div>
      )}
      
    </div>
  );
}

export default Allproducts;
