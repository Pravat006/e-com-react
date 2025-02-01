import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ProductService from "../../services/product.service.js";
import AddtocartBtn from "../root/AddtocartBtn.jsx";
import { FaArrowRightLong } from "react-icons/fa6";
function ProductDetails() {
  const { productId } = useParams();
  const [productdata, setProductData] = useState();
 
  const [mainImage, setMainImage] = useState('');

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ProductService.getProductById(productId);
        setProductData(response?.data);
        console.log("product data: ", response?.data);
        console.log(" category id: ", response?.data?.category.name);
        
        const subImages = Array.isArray(response?.data?.subImages) ? response.data.subImages : [];
        const imageLinks = [response?.data?.mainImage?.url, ...subImages.map(subImage => subImage.url)];
        setMainImage(imageLinks[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [productId]);
  const subImages = Array.isArray(productdata?.subImages) ? productdata.subImages : [];
  const imageLinks = [productdata?.mainImage.url, ...subImages.map((image) => image.url)];
 
  
  
  return (
    <div className="sm:w-[80%] w-full  h-[90vh] mx-2 sm:mx-auto mb-10 mt-3 bg-white rounded-md shadow-md box-border flex lg:flex-row flex-col p-4 gap-2">
      <div className="lg:w-3/5 lg:h-full  flex flex-col gap-2 sm:w-full h-[50%]">
        <div className="h-[80%] ">
          <img
            src={mainImage}
            alt="image"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="h-[20%] flex overflow-hidden gap-1">
          {imageLinks.slice(1,5).map((image, index) => (
            <img  
            key={index}
            src={image}
            alt={`Sub ${index + 1}`}
              className="h-full w-1/4 object-cover cursor-pointer"
              onClick={() =>  setMainImage(image)}
            />
          ))}
        </div>
      </div>
      <div className="lg:w-2/5 w-full h-[50%] lg:h-full flex justify-center items-center  ">
      <div className="flex flex-col gap-2">

        <h1 className="text-2xl font-semibold">{productdata?.name}</h1>
        <p className="text-lg font-semibold ">
          Price: <span className="text-green-600">{productdata?.price}$</span>
        </p>
        <p className="text-lg font-semibold">Category: {productdata?.category.name} </p>
        <p className="text-lg font-semibold ">
          Available Stock:{" "}
          <span className="text-purple-600">{productdata?.stock}</span>
        </p>
        <p className="text-lg font-semibold text-gray-500">
          {productdata?.description}
        </p>
        <div className="flex gap-1 p-2">
        <AddtocartBtn 
        productId={productdata?._id}
        />
          <button className="px-6 py-1  bg-[#e7cb2b] duration-150 hover:shadow-2xl  rounded-3xl w-full mx-auto flex justify-center items-center">
            <span className="pb-1">Buy now</span>
            <FaArrowRightLong />
          </button>
        </div>
      </div>
      </div>
    </div>
  );
}

export default ProductDetails;
