import { useEffect, useState } from "react";
import {  toggleWishlists } from "../../slices/wishListSlice.js";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ToggleWishlist = ({ itemId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const wishlist = useSelector((state) => state.wishlist.wishlists || []);
  const authStatus = useSelector((state) => state.auth.status);
  const isLoading = useSelector((state) => state.wishlist.loading);

  // Check if the item is wishlisted
  const isWishlisted = wishlist.some((item) => item?.product?._id === itemId);
  const [isChecked, setIsChecked] = useState(isWishlisted);

  useEffect(() => {
    // Sync UI state when wishlist updates
    setIsChecked(isWishlisted);
  }, [wishlist, isWishlisted]);

  const handleToggle = async () => {
    if (!authStatus) {
      toast.error("Please log in to use wishlist");
      return navigate("/login");
    }

    setIsChecked((prev) => !prev);
    try {
      await dispatch(toggleWishlists(itemId)).unwrap();
      toast.success(isChecked ? "Removed from wishlist" : "Added to wishlist");
    } catch (error) {
      toast.error(error || "Something went wrong");
      setIsChecked(isWishlisted); // Revert if API fails
    }
  };

  return (
    <label
      className="container flex items-center justify-center gap-2"
      htmlFor="favorite"
    >
      <input
        type="checkbox"
        id="favorite"
        name="favorite-checkbox"
        checked={isChecked}
        onChange={handleToggle}
        disabled={isLoading}
        style={{ display: "none" }}
      />
      <svg
        className="feather feather-heart"
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeWidth="2"
        stroke="currentColor"
        fill={isChecked ? "hsl(0deg 100% 50%)" : "none"}
        viewBox="0 0 24 24"
        height="24"
        width="24"
        style={{
          transition: "fill 0.3s, transform 1s",
          transform: isChecked ? "scale(1.3)" : "scale(1)",
          opacity: isLoading ? 0.5 : 1, // Show loading state
        }}
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
      <div className="action text-center">
        {!isChecked ? (
          <span
            className="option-1"
            style={{
              transform: isChecked ? "translateY(-100%)" : "translateY(0)",
              opacity: isChecked ? 0 : 1,
              transition: "all 0.5s",
            }}
          >
            Add to Wishlists
          </span>
        ) : (
          <span
            className="option-2"
            style={{
              transform: isChecked ? "translateY(0)" : "translateY(100%)",
              opacity: isChecked ? 1 : 0,
              transition: "all 0.5s",
            }}
          >
            Added to Wishlists
          </span>
        )}
      </div>
    </label>
  );
};

export default ToggleWishlist;
