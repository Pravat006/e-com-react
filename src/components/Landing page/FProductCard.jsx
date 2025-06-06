import { Link, useNavigate } from "react-router-dom";
import AddtocartBtn from "../root/AddtocartBtn";
import { Star } from "lucide-react";
import { useInView } from 'react-intersection-observer';

const StarRating = ({ rating, reviews }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400 fill-current" />
      ))}
      {halfStar && <Star key="half" className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400 fill-current" style={{ clipPath: 'inset(0 50% 0 0)' }} />}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="h-3 w-3 sm:h-4 sm:w-4 text-gray-300 fill-current" />
      ))}
      {reviews && <span className="ml-1 sm:ml-2 text-xs text-gray-400">({reviews})</span>}
    </div>
  );
};

const FProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  // Handler for card click
  const handleCardClick = () => {
    navigate(`/product/id/${product?._id}`);
  };

  // Fallback image URL
  return (
    <div ref={ref} className="group relative flex flex-col overflow-hidden rounded-xl bg-white dark:bg-gray-900 shadow hover:shadow-lg transition-shadow duration-200 min-w-0 w-full h-full">
      {/* Make this wrapper clickable */}
      <div onClick={handleCardClick} className="flex flex-col cursor-pointer h-full">
        {/* Image Container with increased height for mobile */}
        <div className="dark:bg-slate-700/50 group-hover:opacity-80 transition-opacity w-full h-32 sm:h-36 md:h-44 lg:h-52 xl:h-60 flex items-center justify-center shrink-0 p-1">
          {inView ? (
            <img
              src={product?.mainImage?.url || "https://placehold.co/600x600/F3F4F6/9CA3AF?text=No+Image"}
              alt={product?.name}
              className="h-full w-full object-cover object-center rounded"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x600/F3F4F6/9CA3AF?text=Image+Error"; }}
              loading="lazy"
            />
          ) : (
            <div style={{ height: 200 }} />
          )}
        </div>
        
        {/* Content Container with mobile-optimized layout */}
        <div className="flex flex-1 flex-col justify-between p-2 sm:p-3 lg:p-4 min-h-0">
          <div className="space-y-1 sm:space-y-2">
            <h3 className="text-xs sm:text-sm lg:text-base xl:text-lg font-semibold text-slate-200 line-clamp-2 leading-tight">
              <Link to={`/product/id/${product?._id}`} className="hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 relative" onClick={e => e.stopPropagation()}>
                <span aria-hidden="true" className="absolute inset-0" />
                {product?.name}
              </Link>
            </h3>
            {/* Mobile: flex-row layout, Desktop: flex-col layout */}
            <div className="flex flex-row sm:flex-col justify-between sm:space-y-1">
              <p className="text-xs sm:text-sm text-slate-500 truncate">{product?.category?.name}</p>
              <p className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold text-slate-200 ">₹{product?.price}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add to cart button section */}
      <div className="p-2 sm:p-3 lg:p-4 pt-0 mt-auto space-y-1 sm:space-y-2 shrink-0">
        <StarRating rating={"5"} reviews={"good"} />
        <AddtocartBtn
          stock={product?.stock}
          productId={product?._id}
          className="w-full rounded bg-blue-600 px-2 py-1.5 sm:px-3 sm:py-2 lg:px-4 lg:py-2 text-xs sm:text-sm lg:text-base font-medium text-white hover:bg-red-950  transition-colors duration-200"
        />
      </div>
    </div>
  );
};

export default FProductCard;