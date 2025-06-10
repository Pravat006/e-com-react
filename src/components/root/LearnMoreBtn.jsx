import React from "react";
import { Link } from "react-router-dom";

function LearnMoreBtn({ productId, price }) {
  return (

    <Link
      className="rounded px-2 py-1 text-white flex items-center space-x-1 bg-slate-600 mt-4 text-xs font-bold justify-between"
      to={`/product/id/${productId}`}
    >
      <span>learn more</span>
      <span className=" font-bold  text-[0.8rem] px-2 py-0 text-white">
        ${price}
      </span>
    </Link>

  );
}

export default LearnMoreBtn;
