import ProductCard from "@/components/products/ProductCard";
import React, { useEffect } from "react";
import ProductService from "../services/product.service.js";

function Allproducts() {
  const [data, setData] = React.useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ProductService.getAllProducts();
        setData(res?.data.products);
        
        
      } catch (error) {
        console.log(error);
      }
    };
    fetchData()
  }, []);
   
  return (
    <div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 p-4">
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
    </div>
  );
}

export default Allproducts;
