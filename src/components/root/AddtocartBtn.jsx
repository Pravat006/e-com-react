import React, { useEffect} from "react";
import { addItemToCart } from "@/slices/cartSlice";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
// import toast from "react-hot-toast";

const AddtocartBtn = (productId) => {
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
      dispatch(addItemToCart(productId));
    }
  };
  

  return (

    <button
      onClick={handleSubmit}
      className="px-6 py-1 text-white bg-[#0295DB] duration-150 hover:shadow-2xl  rounded-3xl w-full mx-auto"
    >
      Add to cart
    </button>
  );
};

export default AddtocartBtn;
