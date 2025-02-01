import React, { useEffect} from "react";
import { addItemToCart } from "@/slices/cartSlice";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

const AddtocartBtn = (productId) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  
  

  const handleSubmit = async () => {
    if (!authStatus) {
      navigate("/login");
      return;
    } else {
      dispatch(addItemToCart(productId));
    }
  };
  // useEffect(()=>{
  //   handleSubmit()
  // },[dispatch])


  return (
    <button
      onClick={()=>handleSubmit()}
      className="px-6 py-1 text-white bg-[#0295DB] duration-150 hover:shadow-2xl  rounded-3xl w-full mx-auto"
    >
      Add to cart
    </button>
  );
};

export default AddtocartBtn;
