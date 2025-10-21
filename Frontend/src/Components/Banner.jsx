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

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % totalSlides);
        }, 3000);
        return () => clearInterval(interval);
    }, [totalSlides]);
    
    return (
        <div className="px-4">
            <div className="flex flex-col items-center mt-4">
               
                <div className="w-full max-w-7xl overflow-hidden relative rounded-2xl shadow-2xl group">
                    {/* Navigation Arrows */}
                    <button 
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 z-10 backdrop-blur-sm"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    
                    <button 
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 z-10 backdrop-blur-sm"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Slide Counter */}
                    <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium z-10 backdrop-blur-sm">
                        {currentSlide + 1} / {totalSlides}
                    </div>

                    {/* Slides Container */}
                    <div
                        ref={sliderRef}
                        className="flex transition-transform duration-700 ease-out"
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                        {images.map((src, index) => (
                            <div key={index} className="w-full flex-shrink-0 relative">
                                <img
                                    src={src}
                                    alt={`Slide ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                            </div>
                        ))}
                    </div>

                    {/* Progress Bar */}
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-10">
                        <div 
                            className="h-full bg-white transition-all duration-3000 ease-linear"
                            style={{ 
                                width: `${(currentSlide + 1) * (100 / totalSlides)}%`,
                                transition: 'width 3s linear'
                            }}
                        ></div>
                    </div>
                </div>

                {/* Modern Dots Indicator */}
                <div className="flex items-center mt-4 space-x-3">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 transform hover:scale-125 ${
                                currentSlide === index 
                                    ? "bg-blue-600 scale-125 shadow-lg shadow-blue-600/30" 
                                    : "bg-gray-400 hover:bg-gray-300"
                            }`}
                        ></button>
                    ))}
                </div>

                
            </div>
        </div>
    )
}

export default Banner;
