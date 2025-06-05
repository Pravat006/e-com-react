import React, { useEffect} from "react";
import { addItemToCart } from "@/slices/cartSlice";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
// import toast from "react-hot-toast";

const AddtocartBtn = ({productId,
  className="",
  stock
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const [isAdded, setIsAdded] = React.useState(false);

  
  

  const handleSubmit = async () => {
    if (!authStatus) {
      navigate("/login");
      setIsAdded(true);
      
      return;
    } else {
      console.log("Adding item to cart:", productId);
      dispatch(addItemToCart({productId: productId}))
    }
  };
  

  return (

    <button
      onClick={handleSubmit}
      className={`px-6 py-1 text-white duration-150 hover:shadow-2xl  rounded-3xl w-full mx-auto ${className} ${stock===0 ? "bg-red-700 cursor-not-allowed" : "bg-yellow-500 hover:bg-yellow-600"}`}
      disabled={stock===0}
    >
      {stock!==0 ? "Add to Cart": "Out of Stock"}
    </button>
  );
};

export default AddtocartBtn;
