import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Quote2img from "../../assets/Quote2img.jpg";
import API from "../../services/api";
import DefaultButton from "../../component/Buttons/DefaultButton";


const NEWS = () => {
    const [newsData, setallnews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchnonauthnews = async () => {
            try {
                const res = await API.get(`/nonauth/get-all-news?nocache=${Date.now()}`, {
                    headers: {
                        "Cache-Control": "no-cache",
                        Pragma: "no-cache",
                        Expires: "0",
                    },
                });

                if (res.data?.success && Array.isArray(res.data.result)) {
                    setallnews(res.data.result);
                } else {
                    setallnews([]);
                }
            } catch (err) {
                console.error("Failed to fetch users:", err);
                setError("Could not load users");
                setallnews([]);
            } finally {
                setLoading(false);
            }
        };

        fetchnonauthnews();
    }, []);



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
                            key={news._id}
                            className="relative group bg-white/60 backdrop-blur-md rounded-3xl shadow-xl overflow-hidden w-72 md:w-80 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                        >
                            <div className="relative overflow-hidden">
                                <img
                                    src={`${import.meta.env.VITE_APP_API_FILES}/uploads/${news.imageUrl?.[0]}`}
                                    alt={news.title}
                                    className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute top-4 left-4 bg-[#560606] text-white text-sm font-semibold px-4 py-1 rounded-full shadow-md">
                                    {new Date(news.createdAt).toLocaleDateString()}
                                </div>
                            </div>
                            <div className="p-5 text-center">
                                <h3 className="text-xl font-bold text-gray-800 mb-2 transition-colors duration-300 group-hover:text-[#560606]">
                                    {news.title}
                                </h3>
                                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                    {news.description?.[0]}
                                </p>
                                <a
                                    href={`/view-news/${news.title}`}
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

            <center>
                <div className="mt-20">
                    <a href="/news">
                        <DefaultButton 
                            type="button"
                            label="View More NEWS"
                        />
                    </a>
                </div>
            </center>

        </section>
    );
};

export default NEWS;
