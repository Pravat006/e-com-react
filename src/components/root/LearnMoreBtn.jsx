import React from "react";
import { Link } from "react-router-dom";

function LearnMoreBtn({ productId }) {
  return (

      <Link
        className="bg-[#9D9DA1]  px-6 py-1 text-white  duration-150 hover:shadow-2xl  rounded-3xl w-full "
        to={`/product/id/${productId}`}
      >
        Learn more
      </Link>
 
  );
}

export default LearnMoreBtn;
