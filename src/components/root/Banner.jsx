import React from "react";

function Banner() {
  return (
    <div
      className="relative  bg-center h-[50vh] md:h-[70vh] flex items-center justify-center text-center bg-cover bg-muted"
      style={
            {

                "background-image": "url('https://images.unsplash.com/photo-1487215078519-e21cc028cb29?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" 
            }
        }
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 text-white px-4 max-w-2xl">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Discover the Beauty of Science
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Explore the future of science and Gadgets
        </p>
        <a
          href="#explore"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300"
        >
          Explore Now
        </a>
      </div>
    </div>
  );
}

export default Banner;
