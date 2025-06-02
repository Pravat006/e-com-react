// const StarRating = ({ rating, reviews }) => {
//   const fullStars = Math.floor(rating);
//   const halfStar = rating % 1 !== 0;
//   const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AddtocartBtn from "../root/AddtocartBtn";

//   return (
//     <div className="flex items-center">
//       {[...Array(fullStars)].map((_, i) => (
//         <Star key={`full-${i}`} className="h-4 w-4 text-yellow-400 fill-current" />
//       ))}
//       {halfStar && <Star key="half" className="h-4 w-4 text-yellow-400 fill-current" style={{ clipPath: 'inset(0 50% 0 0)' }} />}
//       {[...Array(emptyStars)].map((_, i) => (
//         <Star key={`empty-${i}`} className="h-4 w-4 text-gray-300 fill-current" />
//       ))}
//       {reviews && <span className="ml-2 text-xs text-gray-400">({reviews} reviews)</span>}
//     </div>
//   );
// };

const FProductCard = ({ product }) => {
  const navigate = useNavigate();
  // Handler for card click
  const handleCardClick = () => {
    navigate(`/product/id/${product?._id}`);
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl custom-glass-5 backdrop-blur-lg shadow hover:shadow-lg transition-all duration-300 min-w-0 w-full h-full p-2 sm:p-3 lg:p-4">
      {/* Make this wrapper clickable */}
      <div onClick={handleCardClick} className="flex flex-col flex-1 cursor-pointer">
        <div className="dark:bg-slate-700/50 group-hover:opacity-80 transition-opacity w-full aspect-[1/1] max-h-28 sm:max-h-40 lg:max-h-56 flex items-center justify-center">
          <img
            src={product?.mainImage?.url || "https://placehold.co/600x600/F3F4F6/9CA3AF?text=No+Image"}
            alt={product?.name}
            className="lg:h-full lg:w-full object-cover object-center"
            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x600/F3F4F6/9CA3AF?text=Image+Error"; }}
          />
        </div>
        <div className="flex flex-1 flex-col space-y-1 p-2 sm:p-3 lg:p-4">
          <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-slate-200 truncate">
            <Link to={`/product/id/${product?._id}`} className="hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 relative" onClick={e => e.stopPropagation()}>
              <span aria-hidden="true" className="absolute inset-0" />
              {product?.name}
            </Link>
          </h3>
          <p className="text-xs sm:text-sm lg:text-base text-slate-500 dark:text-slate-400 line-clamp-1">{product?.category?.name}</p>
          <div className="flex items-center justify-between">
            <p className="text-base sm:text-lg lg:text-xl font-bold text-slate-900 dark:text-white">{product?.price}</p>
          </div>
        </div>
      </div>
      {/* Add to cart button - stop propagation */}
      <div className="p-2 pt-0 mt-auto">
        {/* <button
          type="button"
          className="w-full rounded bg-blue-600 px-2 py-1 sm:px-3 sm:py-2 lg:px-4 lg:py-2 text-xs sm:text-sm lg:text-base font-medium text-white"
          onClick={e => {
            e.stopPropagation();
            // Add your add-to-cart logic here
          }}
        >
          Add to cart
        </button> */}
        <AddtocartBtn
          productId={product?._id}
          className="w-full rounded bg-blue-600 px-2 py-1 sm:px-3 sm:py-2 lg:px-4 lg:py-2 text-xs sm:text-sm lg:text-base font-medium text-white"
        
        />
      </div>
    </div>
  );
};

export default FProductCard;