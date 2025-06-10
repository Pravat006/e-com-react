import React, { useState, useEffect, useCallback } from 'react';

const Carousel = ({
    slides,
    autoSlide = true,
    autoSlideInterval = 3000,
}) => {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const slideCount = slides.length;
    const slidesWithClones = [slides[slideCount - 1], ...slides, slides[0]];

    const handleNext = useCallback(() => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex((prevIndex) => prevIndex + 1);
    }, [isTransitioning]);

    const handlePrev = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex((prevIndex) => prevIndex - 1);
    };

    useEffect(() => {
        if (autoSlide) {
            const slideInterval = setInterval(handleNext, autoSlideInterval);
            return () => clearInterval(slideInterval);
        }
    }, [autoSlide, autoSlideInterval, handleNext]);

    const handleTransitionEnd = () => {
        setIsTransitioning(false);
        if (currentIndex === 0) {
            setCurrentIndex(slideCount);
        } else if (currentIndex === slideCount + 1) {
            setCurrentIndex(1);
        }
    };

    return (
        <div className="relative w-full  mx-auto overflow-hidden">
            <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                    transition: isTransitioning ? 'transform 500ms ease-in-out' : 'none',
                }}
                onTransitionEnd={handleTransitionEnd}
            >
                {slidesWithClones.map((slide, index) => (
                    <div className="w-full flex-shrink-0" key={index}>
                        <img src={slide.image} alt={slide.alt} className="w-full h-auto sm:h-[500px] object-cover rounded-xl" />
                    </div>
                ))}
            </div>

            <button
                onClick={handlePrev}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
            >
                &#10094;
            </button>
            <button
                onClick={handleNext}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
            >
                &#10095;
            </button>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index + 1)}
                        className={`w-3 h-3 rounded-full ${currentIndex === index + 1 ? 'bg-white' : 'bg-gray-400'
                            } transition`}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default Carousel;