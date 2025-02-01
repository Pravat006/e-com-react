import ProductCard from "@/components/products/ProductCard";
import React, { useEffect, useState } from "react";
import ProductService from "../services/product.service.js";
import { Skeleton } from "@/components/ui/skeleton.jsx";

function Allproducts() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ProductService.getAllProducts();
        
          setData(res?.data.products);
          setLoading(false)
       
        
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 p-4">
        {loading ? Array.from({length: data.length}).map((index)=>(

          <div className="flex flex-col space-y-3" key={index}>
            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
          )
        ) :
        data?.map((product) => (
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
    </div>
  );
}

export default Allproducts;
