import React from "react";
import pc from "../../assets/pngwing.com.png"

function Banner() {

 

  return (
      <div className="bg-gray-900">
          
          <section className="mt-0 my-4 mx-auto max-w-screen-xl pb-12 px-4 items-center lg:flex md:px-8">
              <div className="space-y-4 flex-1 sm:text-center lg:text-left">
                  <h1 className="text-white font-bold text-4xl xl:text-5xl">
                      Checkout our computer accessories for your 
                       <span className="text-indigo-400"> Beast</span>
                  </h1>
                  <p className="text-gray-300 max-w-xl leading-relaxed sm:mx-auto lg:ml-0">
                      It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum
                  </p>
                  
              </div>
              <div className="flex-1 text-center mt-7 lg:mt-0 lg:ml-3 py-4">
                  <img src={pc} className="w-full mx-auto sm:w-10/12  lg:w-full bg-blend-multiply" />
              </div>
          </section>
      </div>
  )
}

export default Banner;
