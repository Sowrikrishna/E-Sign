import React from 'react'
import {useState,useEffect,useRef} from 'react'
export const Banner = () => {

    const [currentSlide, setCurrentSlide] = useState(0);
    const sliderRef = useRef(null);
    const totalSlides = 5;

    const images = [
        "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/gallery/slide1.png",
        "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/gallery/slide2.png",
        "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/gallery/slide3.png",
        "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/gallery/slide4.png",
        "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/gallery/slide5.png",
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
            <div className="flex flex-col items-center">
                {/* Slider container */}
                <div className="w-full max-w-3xl overflow-hidden relative">
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
