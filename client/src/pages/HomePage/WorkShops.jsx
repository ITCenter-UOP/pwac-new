import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import API from "../../services/api";
import DefaultButton from "../../component/Buttons/DefaultButton";

const WorkShops = () => {
    const [workshops, setWorkshops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const visibleCount = 3;

    useEffect(() => {
        const fetchWorkshops = async () => {
            try {
                const res = await API.get(`/workshop/get-all-workshops?nocache=${Date.now()}`, {
                    headers: {
                        "Cache-Control": "no-cache",
                        Pragma: "no-cache",
                        Expires: "0",
                    },
                });

                if (res.data?.success && Array.isArray(res.data.result)) {
                    // FILTER only active workshops
                    const activeWorkshops = res.data.result.filter(w => w.isActive === true);
                    setWorkshops(activeWorkshops);
                } else {
                    setWorkshops([]);
                }
            } catch (err) {
                console.error("Failed to fetch workshops:", err);
                setError("Could not load workshops");
                setWorkshops([]);
            } finally {
                setLoading(false);
            }
        };

        fetchWorkshops();
    }, []);

    const nextSlide = () => {
        if (workshops.length > visibleCount) {
            setCurrentIndex((prev) => (prev + visibleCount >= workshops.length ? 0 : prev + visibleCount));
        }
    };

    const prevSlide = () => {
        if (workshops.length > visibleCount) {
            setCurrentIndex((prev) => (prev - visibleCount < 0 ? workshops.length - visibleCount : prev - visibleCount));
        }
    };

    useEffect(() => {
        if (workshops.length > 1) {
            const interval = setInterval(nextSlide, 6000);
            return () => clearInterval(interval);
        }
    }, [workshops]);

    const visibleWorkshops = workshops.slice(currentIndex, currentIndex + visibleCount);

    // Prevent duplication when only 1 record exists
    if (workshops.length > 1 && visibleWorkshops.length < visibleCount) {
        visibleWorkshops.push(...workshops.slice(0, visibleCount - visibleWorkshops.length));
    }

    return (
        <section className="py-20 bg-gray-50 relative overflow-hidden">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-extrabold text-[#560606] mb-4 tracking-tight">
                    Upcoming Workshops
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto text-lg md:text-xl">
                    Explore engaging and educational workshops organized by our Psychological Wellbeing & Assessment Center.
                </p>
            </div>

            {/* Slider Container */}
            <div className="relative w-full flex items-center justify-center px-8 md:px-16">
                {/* Left Arrow */}
                {workshops.length > 1 && (
                    <button
                        onClick={prevSlide}
                        className="absolute left-6 md:left-10 bg-[#560606] hover:bg-[#7a0a0a] text-white p-3 md:p-4 rounded-full shadow-lg transition-transform hover:scale-110 z-20"
                    >
                        <FaArrowLeft size={18} />
                    </button>
                )}

                {/* Cards Wrapper */}
                <div className="flex gap-8 md:gap-10 transition-transform duration-700 ease-in-out">
                    {visibleWorkshops.map((workshop) => (
                        <div
                            key={workshop._id}
                            className="relative group bg-white/60 backdrop-blur-md rounded-3xl shadow-xl overflow-hidden w-72 md:w-80 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                        >
                            <div className="relative overflow-hidden">
                                <img
                                    src={`${import.meta.env.VITE_APP_API_FILES}/uploads/${workshop.image}`}
                                    alt={workshop.title}
                                    className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute top-4 left-4 bg-[#560606] text-white text-sm font-semibold px-4 py-1 rounded-full shadow-md">
                                    {new Date(workshop.date).toLocaleDateString()}
                                </div>
                            </div>
                            <div className="p-5 text-center">
                                <h3 className="text-xl font-bold text-gray-800 mb-1 transition-colors duration-300 group-hover:text-[#560606]">
                                    {workshop.title}
                                </h3>
                                <p className="text-sm text-gray-500 mb-2 italic">{workshop.subtitle}</p>
                                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                    {workshop.description}
                                </p>
                                <p className="text-[#560606] text-sm font-medium mb-3">
                                    {new Date(workshop.date).toLocaleDateString()} at {workshop.time}
                                </p>
                                {workshop.registrationLink && (
                                    <a
                                        href={workshop.registrationLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block mt-2 text-[#560606] font-medium hover:underline"
                                    >
                                        Register Now →
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Arrow */}
                {workshops.length > 1 && (
                    <button
                        onClick={nextSlide}
                        className="absolute right-6 md:right-10 bg-[#560606] hover:bg-[#7a0a0a] text-white p-3 md:p-4 rounded-full shadow-lg transition-transform hover:scale-110 z-20"
                    >
                        <FaArrowRight size={18} />
                    </button>
                )}
            </div>

            <center>
                <div className="mt-20">
                    <a href="/workshops">
                        <DefaultButton type="button" label="View More Workshops" />
                    </a>
                </div>
            </center>
        </section>
    );
};

export default WorkShops;
