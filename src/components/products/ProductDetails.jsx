import React from "react";
import { Link, useParams } from "react-router-dom";
import ProductService from "../../services/product.service.js";
import AddtocartBtn from "../root/AddtocartBtn.jsx";
import ToggleWishlist from "../root/ToggleWishlist.jsx";
import { useQuery } from "@tanstack/react-query";

function ProductDetails() {
  const { productId } = useParams();

  // Fetch product data using React Query
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      const response = await ProductService.getProductById(productId);
      if (!response?.data) throw new Error("No product data found");
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });

  // Prepare images and main image
  const subImages = Array.isArray(data?.subImages) ? data.subImages : [];
  const imageLinks = [
    data?.mainImage?.url,
    ...subImages.map((subImage) => subImage.url),
  ].filter(Boolean);

  const [mainImage, setMainImage] = React.useState(imageLinks[0] || "");

  // Update mainImage when imageLinks change (e.g., after fetch)
  React.useEffect(() => {
    if (imageLinks.length > 0) setMainImage(imageLinks[0]);
  }, [imageLinks[0]]);

  // Swap logic
  const swapWithFirst = (targetIndexInOriginalArray) => {
    if (
      targetIndexInOriginalArray <= 0 ||
      targetIndexInOriginalArray >= imageLinks.length
    )
      return;
    const updatedImages = [...imageLinks];
    [updatedImages[0], updatedImages[targetIndexInOriginalArray]] = [
      updatedImages[targetIndexInOriginalArray],
      updatedImages[0],
    ];
    setMainImage(updatedImages[0]);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="text-lg">Loading product...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="text-red-500">
          {error?.message || "Failed to load product."}
        </span>
      </div>
    );
  }

  return (
    <div className="sm:w-[80%] w-full min-h-[90vh] h-auto mx-2 sm:mx-auto mb-10 mt-3 rounded-2xl shadow-md box-border flex lg:flex-row flex-col p-4 gap-4 bg-white bg-opacity-5 backdrop-blur">
      {/* Responsive Image Gallery Section */}
      <div className="lg:w-3/5 w-full flex flex-col gap-3">
        {/* Main Image Display */}
        <div className="w-full aspect-[4/3] rounded-lg overflow-hidden shadow-sm bg-gray-200 dark:bg-gray-700">
          {imageLinks.length > 0 ? (
            <img
              src={mainImage || imageLinks[0]}
              alt="Main product"
              className="h-full w-full object-cover transition-opacity duration-300"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-gray-500">
              No Image Available
            </div>
          )}
        </div>

        {/* Thumbnails Display - Max 4, no scrollbar, contained within main image width */}
        {imageLinks.length > 1 && (
          <div className="grid grid-cols-4 gap-2 w-full">
            {imageLinks.slice(1, 5).map((image, index) => {
              const originalIndex = index + 1;
              return (
                <div
                  key={image + "-" + originalIndex}
                  className={`aspect-[4/3] min-w-0 rounded-md overflow-hidden cursor-pointer border-2 transition-all duration-150 hover:opacity-80
                    ${mainImage === image
                      ? "border-blue-500 shadow-md"
                      : "border-transparent hover:border-gray-400"
                    }`}
                  onClick={() => swapWithFirst(originalIndex)}
                  onMouseEnter={() => setMainImage(image)}
                  onMouseLeave={() => setMainImage(imageLinks[0])}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${originalIndex}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Product Details Section (right side) */}
      <div className="lg:w-2/5 w-full flex flex-col justify-center gap-3 lg:gap-4 p-2">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">
          {data?.name || "Product Name"}
        </h1>
        <p className="text-xl md:text-2xl font-semibold text-gray-700 dark:text-gray-300">
          Price:{" "}
          <span className="text-green-500 dark:text-green-400">
            ₹{data?.price || "0.00"}
          </span>
        </p>
        <p className="text-md md:text-lg text-gray-600 dark:text-gray-400">
          Category: {data?.category?.name || "N/A"}
        </p>
        <p className="text-md md:text-lg text-gray-600 dark:text-gray-400">
          Available Stock:{" "}
          <span className="text-purple-500 dark:text-purple-400 font-medium">
            {data?.stock || 0}
          </span>
        </p>
        <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 leading-relaxed mt-2">
          {data?.description || "No description available."}
        </p>
        <div className="mt-4 flex flex-col gap-3">
          <div className="w-full lg:w-fit lg:self-center lg:min-w-[300px]">
            <AddtocartBtn productId={data?._id} stock={data?.stock} />
          </div>
          <ToggleWishlist itemId={data?._id} />
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
