import ProductCard from "@/components/products/ProductCard";
import ProductCardSkeleton from "@/components/products/ProductCardSkeleton";
import React from "react";
import ProductService from "../services/product.service.js";
import { useQuery } from "@tanstack/react-query";
import Pagination from "@/components/root/Pagination";
import { useParams, useNavigate, useLocation } from "react-router-dom";

function Allproducts() {
  const { pageNumber } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // If pageNumber is undefined, we're on /all-products (page 1)
  const page = pageNumber ? parseInt(pageNumber, 10) : 1;

  const fetchProducts = async () => {
    try {
      const res = await ProductService.getAllProducts(page);
      if (res?.success && res.data) {
        return res.data;
      }
      throw new Error(res?.message || "Failed to fetch products structure");
    } catch (error) {
      console.error("Failed to fetch data:", error);
      throw new Error(error?.message || "Failed to fetch products");
    }
  };

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["products", page],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000,
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

  const handlePageChange = (newPage) => {
    if (newPage === 1) {
      // Go to /all-products for page 1
      if (location.pathname !== "/all-products") {
        navigate("/all-products");
      }
    } else {
      // Go to /all-products/page/2, /3, etc.
      navigate(`/all-products/page/${newPage}`);
    }
  };

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
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}

export default Allproducts;
