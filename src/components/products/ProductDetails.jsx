import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductService from "../../services/product.service.js";
import AddtocartBtn from "../root/AddtocartBtn.jsx";

import ToggleWishlist from "../root/ToggleWishlist.jsx";
import { set } from "react-hook-form";
function ProductDetails() {
  const { productId } = useParams();
  const [productdata, setProductData] = useState();

  const [mainImage, setMainImage] = useState("");
  const [imageLinks, setImageLinks] = useState([]);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ProductService.getProductById(productId);
        setProductData(response?.data);

        const subImages = Array.isArray(response?.data?.subImages)
          ? response.data.subImages
          : [];
        const images = [
          response?.data?.mainImage?.url,
          ...subImages.map((subImage) => subImage.url),
        ].filter(Boolean); // Filter out any undefined values
        
        setImageLinks(images); // Update imageLinks state here
        setMainImage(images[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [productId]);

  const swapWithFirst = (targetIndex) => {
    if (targetIndex <= 0 || targetIndex >= imageLinks.length) return;
    
    // Create a copy of the array and swap elements
    const updatedImages = [...imageLinks];
    [updatedImages[0], updatedImages[targetIndex]] = [
      updatedImages[targetIndex],
      updatedImages[0],
    ];
    
    setImageLinks(updatedImages);
    setMainImage(updatedImages[0]); // Update main image too
  };

  return (
    <div
      className="sm:w-[80%] w-full  h-[90vh] mx-2 sm:mx-auto mb-10 mt-3  rounded-2xl shadow-md box-border flex lg:flex-row flex-col p-4 gap-2 bg-white bg-opacity-5 backdrop-blur"
     
    >
      <div className="lg:w-3/5 lg:h-full  flex flex-col gap-2 sm:w-full h-[50%]">
        <div className="h-[80%] ">
          <img
            src={imageLinks[0]}
            alt="image"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="h-[20%] flex overflow-hidden gap-1">
          {imageLinks.slice(1, 5).map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Sub ${index + 1}`}
              className="h-full w-1/4 object-cover cursor-pointer"
              onClick={() => swapWithFirst(index + 1)}
              onMouseOver={() => setMainImage(image)}
              onMouseLeave={() => setMainImage(imageLinks[0])}
              onMouseOut={() => setMainImage(imageLinks[0])}
              onMouseEnter={() => setMainImage(image)}
              style={{
                border: mainImage === image ? "2px solid blue" : "none",
              }}
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
          <p className="text-lg font-semibold">
            Category: {productdata?.category.name}{" "}
          </p>
          <p className="text-lg font-semibold ">
            Available Stock:{" "}
            <span className="text-purple-600">{productdata?.stock}</span>
          </p>
          <p className="text-lg font-semibold text-gray-500">
            {productdata?.description}
          </p>
          <div className="p-2 gap-2 flex flex-col">
            <AddtocartBtn productId={productdata?._id} />
            <ToggleWishlist itemId={productId} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
