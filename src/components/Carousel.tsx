'use client'

import React, { useState, useEffect } from 'react';

interface CarouselProps{
    images: Array<string>;
}

const Carousel = (props:CarouselProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
        prevIndex === props.images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? props.images.length - 1 : prevIndex - 1
        );
    };
    
    useEffect(() => {
        const slideTimer = setInterval(nextSlide, 4000);
        return () => clearInterval(slideTimer); // Cleanup on unmount
    }, [currentIndex]);


    return (
        <div className="flex flex-col items-center w-full px-5">
            <div className="relative flex justify-center items-center overflow-hidden">

                <div className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                    {props.images.map((image, index) => (
                        <img
                        key={index}
                        src={image}
                        alt={`Slide ${index}`}
                        className="w-full h-full object-cover flex-shrink-0"
                        />
                    ))}
                </div>

                <button
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 
                    bg-black bg-opacity-50 text-white p-2 rounded-full text-3xl"
                    onClick={prevSlide}
                >
                    &lt;-
                </button>

                <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black 
                bg-opacity-50 text-white p-2 rounded-full text-3xl"
                onClick={nextSlide}
                >
                    -&gt;
                </button>
            </div>
            <div className="mt-4 flex space-x-2">
                    {props.images.map((_, index) => (
                    <span
                        key={index}
                        className={`w-3 h-3 rounded-full ${
                        index === currentIndex ? 'bg-white' : 'bg-gray-400'
                        } cursor-pointer`}
                        onClick={() => setCurrentIndex(index)}
                    ></span>
                    ))}
            </div>
        </div>
    );
};

export default Carousel;