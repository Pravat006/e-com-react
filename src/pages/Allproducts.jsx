import ProductCard from "@/components/products/ProductCard";
import React, { useState } from "react";
import ProductService from "../services/product.service.js";
import { Skeleton } from "@/components/ui/skeleton.jsx";
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
      return error?.message;
    }
  };

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["products", pageNumber],
    queryFn: () => fetchProducts(),
  });

  if (isLoading)
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 p-12">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="flex flex-col space-y-3 h-[372px] w-[267px] transition-shadow duration-300">
            <Skeleton className="h-48  w-full rounded-xl" />
            <div className="space-y-2 px-4 py-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />

              <Skeleton className="h-6 w-full rounded-lg" />
              <Skeleton className="h-6 w-full" />
            </div>
          </div>
        ))}
      </div>
    );
  if (isError) return <p> .......{error}.......</p>;

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 p-4 lg:p-12">
        {data?.map((product) => (
          <ProductCard
            data={product}
            id={product?._id}
            key={product?._id}
            imageLink={product?.mainImage.url}
            name={product?.name}
            description={product?.description}
            price={product?.price}
          />
        ))}
      </div>
      <div className="text-center items-center justify-center flex w-full p-4 ">
        <div className="flex justify-between items-center  mx-auto">
          <button
            onClick={() => setPageNumber((next) => next - 1)}
            disabled={pageNumber === 1 && true}
            className="bg-gray-300 text-black font-bold px-4 py-2"
          >
            Previus
          </button>
          <h1 className="px-4 font-bold   border-black outline-[1px] outline  mx-1">
            {pageNumber}
          </h1>
          <button
            onClick={() => setPageNumber((prev) => prev + 1)}
            disabled={pageNumber >= totalPages && true}
            className="bg-gray-300 text-black font-bold px-8 py-2"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Allproducts;
