import React from 'react'
import FProductCard from './FProductCard'
import FProductCardSkeleton from './FProductCardSkeleton';
import productService from '@/services/product.service';
import { useQuery } from '@tanstack/react-query';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function FeaturedProducts() {

 const fetchProducts = async () => {
    try {
      const res = await productService.getAllProducts();
      return res?.success ? res?.data?.products : [];
    } catch (error) {
      console.log("failed to fetch data");
      return error?.message;
    }
  };

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: () => fetchProducts(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

// console.log("featured products data : ", data);
  return (
    <div className="py-8 sm:py-16 bg-transparent  h-full w-full border-y-2 rounded-lg mb-6">  
      <div className="container mx-auto px-2 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-6 sm:mb-12">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-400 ">
            Featured Products
          </h2>
          <p className="mt-2 sm:mt-4 text-base sm:text-lg text-slate-300  max-w-2xl mx-auto">
            Check out our handpicked selection of top-rated and bestselling items.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-4 sm:gap-x-4 sm:gap-y-8">
          {isLoading
            ? Array.from({ length: 8 }).map((_, idx) => <FProductCardSkeleton key={idx} />)
            : Array.isArray(data) && data.map((product) => (
                <FProductCard key={product?._id} product={product} />
              ))
          }
        </div>
        <div className="mt-8 sm:mt-16 text-center">
            <Link
              to={"/all-products"}
              className="inline-flex items-center justify-center px-6 py-2 border border-transparent text-sm sm:text-base font-medium rounded-xl text-white bg-slate-700 hover:bg-slate-800 dark:bg-slate-600 dark:hover:bg-slate-500 shadow-lg transform transition-all duration-300 hover:scale-105"
            >
              View All Products
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
        </div>
      </div>
    </div>
  )
}

export default FeaturedProducts


