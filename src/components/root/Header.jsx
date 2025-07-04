import React from 'react'
import BackgroundAnimation from '../Landing page/BackgroundAnimation'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Link } from "react-router-dom";
import { CardBody, CardContainer } from '../ui/3d-card';
import image from "../../assets/pngwing.com.png";

function Header() {
    return (
        <header className="flex flex-col items-center justify-center text-center px-4 py-5 md:py-20 overflow-hidden relative w-full max-w-screen border-b-2 border-black dark:border-white  rounded-lg">
            {/* Background Animation Component - contained within header */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
                <BackgroundAnimation />
            </div>
            
            <div className="relative w-full h-full flex items-center justify-center flex-col sm:flex-row rounded-3xl z-10">
                <div className="max-w-5xl px-6 text-center md:text-left py-5">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100">
                        Next-Gen Tech <br />
                        <span className="text-blue-500">For Your Digital Life</span>
                    </h1>
                    <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
                        Discover premium electronic gadgets and computer accessories that enhance your digital experience.
                    </p>
                    <div className="mt-6 flex flex-col md:flex-row gap-4 justify-center md:justify-start">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link to={"/all-products"} className="px-6 py-3 bg-white text-blue-700 rounded-full font-semibold shadow-lg hover:bg-gray-200 transition">
                                        Shop Now →
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Browse all products</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <button className="px-6 py-3 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-blue-700 transition">
                            View Deals
                        </button>
                    </div>
                </div>

                <CardContainer className="inter-var z-20">
                    <CardBody>
                        <img src={image} className="w-full object-cover rounded-xl" alt="Tech products" />
                    </CardBody>
                </CardContainer>
            </div>
        </header>
    )
}

export default Header