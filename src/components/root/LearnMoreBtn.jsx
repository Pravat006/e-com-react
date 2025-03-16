import React from "react";
import { Link } from "react-router-dom";

function LearnMoreBtn({ productId , price}) {
  return (

      <Link
       className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800"
        to={`/product/id/${productId}`}
      >
        <span>learn more</span>
        <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
            ${price}
          </span>
      </Link>
 
  );
}

export default LearnMoreBtn;
