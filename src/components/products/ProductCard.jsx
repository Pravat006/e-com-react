
import React from "react";

import LearnMoreBtn from "../root/LearnMoreBtn";

function ProductCard({ imageLink, name, description, price, id }) {

  
  return (
    
    <div className="h-full max-w-sm  backdrop-blur-lg">
  {/* <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-8 bg-white dark:bg-zinc-900 h-full flex flex-col"> */}
    
    {/* Image */}
    <img 
      src={imageLink} 
      alt={name} 
      width="400" 
      className="object-cover h-52 w-full rounded-lg"
    />

    {/* Text Content */}
    <div className="flex-grow flex flex-col justify-between">
      <div>
        <p className="text-base text-start sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200 min-h-[48px] flex items-center">
          {name}
        </p>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 h-[40px] overflow-hidden text-start ">
          {description}
        </p>
      </div>

      {/* Button at Bottom */}
      <LearnMoreBtn price={price} productId={id} />
    </div>

  {/* </BackgroundGradient> */}
</div>

  );
}

export default ProductCard;
