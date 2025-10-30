import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Quote2img from "../../assets/Quote2img.jpg";

const NEWS = () => {
    const newsData = [
        { id: 1, title: "Mental Health Workshop", img: Quote2img, addat: "Oct 28, 2025", link: "#" },
        { id: 2, title: "Campus Counseling Updates", img: Quote2img, addat: "Oct 20, 2025", link: "#" },
        { id: 3, title: "Stress Management Webinar", img: Quote2img, addat: "Oct 15, 2025", link: "#" },
        { id: 4, title: "Mindfulness Session Highlights", img: Quote2img, addat: "Oct 10, 2025", link: "#" },
        { id: 5, title: "University Mental Health Tips", img: Quote2img, addat: "Oct 5, 2025", link: "#" },
        { id: 6, title: "Peer Support Program", img: Quote2img, addat: "Sep 28, 2025", link: "#" },
        { id: 7, title: "Counselor Spotlight", img: Quote2img, addat: "Sep 22, 2025", link: "#" },
        { id: 8, title: "Anxiety Awareness Campaign", img: Quote2img, addat: "Sep 15, 2025", link: "#" },
        { id: 9, title: "Yoga & Mindfulness Class", img: Quote2img, addat: "Sep 10, 2025", link: "#" },
        { id: 10, title: "Depression Awareness Week", img: Quote2img, addat: "Sep 5, 2025", link: "#" },
        { id: 11, title: "Positive Psychology Session", img: Quote2img, addat: "Aug 28, 2025", link: "#" },
        { id: 12, title: "Wellbeing Resource Hub", img: Quote2img, addat: "Aug 20, 2025", link: "#" },
    ];


    const [currentIndex, setCurrentIndex] = useState(0);
    const visibleCount = 3;

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + visibleCount >= newsData.length ? 0 : prev + visibleCount));
    };
    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - visibleCount < 0 ? newsData.length - visibleCount : prev - visibleCount));
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 6000);
        return () => clearInterval(interval);
    }, []);

    const visibleNews = newsData.slice(currentIndex, currentIndex + visibleCount);
    if (visibleNews.length < visibleCount) visibleNews.push(...newsData.slice(0, visibleCount - visibleNews.length));

    return (
        <section className="py-20 bg-gray-50 relative overflow-hidden">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-extrabold text-[#560606] mb-4 tracking-tight">
                    Our News
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto text-lg md:text-xl">
                    Stay informed about the latest events, workshops, and updates from our Psychological Wellbeing & Assessment Center.
                </p>
            </div>

            {/* Slider Container */}
            <div className="relative w-full flex items-center justify-center px-8 md:px-16">
                {/* Left Arrow */}
                <button
                    onClick={prevSlide}
                    className="absolute left-6 md:left-10 bg-[#560606] hover:bg-[#7a0a0a] text-white p-3 md:p-4 rounded-full shadow-lg transition-transform hover:scale-110 z-20"
                >
                    <FaArrowLeft size={18} />
                </button>

                {/* Cards Wrapper */}
                <div className="flex gap-8 md:gap-10 transition-transform duration-700 ease-in-out">
                    {visibleNews.map((news) => (
                        <div
                            key={news.id}
                            className="relative group bg-white/60 backdrop-blur-md rounded-3xl shadow-xl overflow-hidden w-72 md:w-80 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                        >
                            <div className="relative overflow-hidden">
                                <img
                                    src={news.img}
                                    alt={news.title}
                                    className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute top-4 left-4 bg-[#560606] text-white text-sm font-semibold px-4 py-1 rounded-full shadow-md">
                                    {news.addat}
                                </div>
                            </div>
                            <div className="p-5 text-center">
                                <h3 className="text-xl font-bold text-gray-800 mb-2 transition-colors duration-300 group-hover:text-[#560606]">
                                    {news.title}
                                </h3>
                                <a
                                    href={news.link}
                                    className="inline-block mt-3 text-[#560606] font-medium hover:underline"
                                >
                                    Read More →
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Arrow */}
                <button
                    onClick={nextSlide}
                    className="absolute right-6 md:right-10 bg-[#560606] hover:bg-[#7a0a0a] text-white p-3 md:p-4 rounded-full shadow-lg transition-transform hover:scale-110 z-20"
                >
                    <FaArrowRight size={18} />
                </button>
            </div>

        </section>
    );
};

export default NEWS;
