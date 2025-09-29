import React from 'react'
import {useState,useEffect,useRef} from 'react'

export const Banner = () => {

    const [currentSlide, setCurrentSlide] = useState(0);
    const sliderRef = useRef(null);
    const totalSlides = 5;

    const images = [
        "/assets/1.jpg",
        "/assets/2.jpg",
        "/assets/1.jpg",
        "/assets/3.jpg",
        "/assets/4.jpg",
    ];

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % totalSlides);
        }, 3000);
        return () => clearInterval(interval);
    }, [totalSlides]);
    return (
        <div>
            <div className="flex flex-col items-center mt-1">
                {/* Slider container */}
                <div className="w-full max-w-7xl overflow-hidden relative">
                    <div
                        ref={sliderRef}
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                        {images.map((src, index) => (
                            <img
                                key={index}
                                src={src}
                                alt={`Slide ${index + 1}`}
                                className="w-full flex-shrink-0"
                            />
                        ))}
                    </div>
                </div>

                {/* Dot indicators */}
                <div className="flex items-center mt-2 space-x-2">
                    {images.map((_, index) => (
                        <span
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-3 h-3 rounded-full cursor-pointer ${currentSlide === index ? "bg-black" : "bg-black/20"
                                }`}
                        ></span>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default Banner;
