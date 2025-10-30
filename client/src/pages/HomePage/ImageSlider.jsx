import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Slider1 from '../../assets/Slider1.jpg'
import Slider2 from '../../assets/Slider2.jpg'
import Slider3 from '../../assets/Slider3.png'
import Slider4 from '../../assets/Slider4.jpg'

const slides = [
    {
        image: Slider1,
        title: "Your Mental Health Matters",
        desc: "We’re here to listen, guide, and walk with you every step of your wellbeing journey.",
    },
    {
        image: Slider2,
        title: "Empowering Student Wellbeing",
        desc: "Supporting your mental health journey through counseling, workshops, and assessments.",
    },
    {
        image: Slider3,
        title: "Connected Community",
        desc: "Together we build empathy, understanding, and strength across our university community.",
    },
    {
        image: Slider4,
        title: "Mindfulness & Balance",
        desc: "Encouraging calm, awareness, and inner peace to enhance academic and personal wellbeing.",
    }
];

const ImageSlider = () => {
    const [current, setCurrent] = useState(0);
    const length = slides.length;

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 3000);
        return () => clearInterval(interval);
    }, [current]);

    return (
        <div className="relative w-full mx-auto h-[80vh] overflow-hidden bg-gray-100">
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ease-in-out ${index === current ? "opacity-100" : "opacity-0"
                        }`}
                >
                    <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-start px-8 md:px-16 text-white">
                        <div className="max-w-lg">
                            <h2 className="text-3xl md:text-5xl font-bold mb-3 leading-tight drop-shadow-lg">
                                {slide.title}
                            </h2>
                            <p className="text-base md:text-lg opacity-90 font-light">
                                {slide.desc}
                            </p>
                        </div>
                    </div>
                </div>
            ))}

            {/* Left Button */}
            <button
                onClick={prevSlide}
                className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition"
            >
                <FaArrowLeft size={20} />
            </button>

            {/* Right Button */}
            <button
                onClick={nextSlide}
                className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition"
            >
                <FaArrowRight size={20} />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 w-full flex justify-center gap-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`w-3 h-3 rounded-full transition-all ${current === index ? "bg-white scale-125" : "bg-white/50"
                            }`}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default ImageSlider;
