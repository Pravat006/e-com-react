import ProductCard from "@/components/products/ProductCard";
import ProductCardSkeleton from "@/components/products/ProductCardSkeleton";
import React, { useState } from "react"; 
import ProductService from "../services/product.service.js";
import { useQuery } from "@tanstack/react-query";
import Pagination from "@/components/root/Pagination";

function Allproducts() {
  const [pageNumber, setPageNumber] = useState(1);
  const fetchProducts = async () => {
    try {
      const res = await ProductService.getAllProducts(pageNumber);
      if (res?.success && res.data) {
        return res.data
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
          : data?.products && data?.products.length > 0
            ? data?.products.map((product) => (
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
      {!displaySkeleton && data && data.products && data.products.length > 0 && (
        <Pagination
          page={data.page}
          totalPages={data.totalPages}
          hasPrevPage={data.hasPrevPage}
          hasNextPage={data.hasNextPage}
          prevPage={data.prevPage}
          nextPage={data.nextPage}
          onPageChange={setPageNumber}
        />
      )}
    </div>
  );
}

export default Allproducts;
