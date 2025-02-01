import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import productService from "@/services/product.service";
import ProductCard from "./ProductCard";

function SearchedProduct() {
  const [searchParam] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const searchQuery = searchParam.get("search");

  useEffect(() => {
    const fetchData = async () => {
     try {
       const res = await productService.getSearchedProducts(searchQuery);
       if(res){
         setProducts(res?.data);
        //  console.log(res?.data)
       }
       if(res?.data.length === 0){
         setError("No products found");
       }
     } catch (error) {     
        return error?.message
     }
    };
    fetchData()
  }, [searchQuery]);

  // console.log("search text: ", searchQuery);
  return (
    <div >
      {
        error && <h1 className="text-2xl text-center mt-4">No products found</h1>
      }
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 p-4" >

    {
      products && 
      products.map((product) => (
        <ProductCard 
        // data={product}
        id={product?._id}
        key={product?._id}
        imageLink={product?.mainImage.url}
        name={product?.name}
        description={product?.description}
        price={product?.price}
        />
      ))
    }

    </div>
    </div>
  )
}

export default SearchedProduct;
