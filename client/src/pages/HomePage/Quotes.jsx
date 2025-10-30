import React from "react";
import Quote2img from "../../assets/Quote2img.jpg";
import Quoteimg from "../../assets/Quoteimg.jpg";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const Quotes = () => {
    return (
        <section className="relative pt-24 pb-44 px-6 md:px-12 lg:px-24 bg-gradient-to-r from-gray-50 via-white to-gray-50 overflow-hidden">
            {/* Decorative Shapes */}
            <div className="absolute top-0 left-0 w-40 h-40 md:w-60 md:h-60 bg-[#560606]/10 rounded-full -z-10"></div>
            <div className="absolute bottom-0 right-0 w-52 h-52 md:w-72 md:h-72 bg-[#560606]/10 rounded-full -z-10"></div>

            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-12">
                {/* Images Column */}
                <div className="relative w-full md:w-1/2 flex justify-center md:justify-start mb-12 md:mb-0">
                    <img
                        src={Quote2img}
                        alt="Decorative"
                        className="h-64 sm:h-72 md:h-96 w-56 sm:w-64 md:w-80 object-cover rounded-2xl shadow-2xl transform rotate-[-5deg] hover:rotate-0 transition-all duration-500"
                    />
                    <img
                        src={Quoteimg}
                        alt="Decorative"
                        className="absolute top-16 left-12 sm:top-20 sm:left-20 md:top-28 md:left-32 h-64 sm:h-72 md:h-96 w-56 sm:w-64 md:w-80 object-cover rounded-2xl shadow-2xl border-4 border-white transform rotate-[5deg] hover:rotate-0 transition-all duration-500"
                    />
                </div>

                {/* Quote Text */}
                <div className="w-full md:w-1/2 text-center md:text-left">
                    <div className="bg-white p-8 sm:p-12 md:p-16 rounded-3xl shadow-2xl relative border-l-8 border-[#560606]">
                        <FaQuoteLeft className="absolute -top-6 -left-6 md:-top-8 md:-left-8 text-[#560606] text-4xl md:text-5xl opacity-20" />
                        <p className="text-gray-800 text-base sm:text-lg md:text-xl leading-relaxed font-light">
                            “You don’t have to be positive all the time. It’s perfectly okay to feel
                            sad, angry, annoyed, frustrated, scared, or anxious. Having feelings
                            doesn’t make you a ‘negative person.’ It makes you human.”
                        </p>
                        <FaQuoteRight className="absolute -bottom-6 -right-6 md:-bottom-8 md:-right-8 text-[#560606] text-4xl md:text-5xl opacity-20" />
                        <div className="mt-6 text-center md:text-right">
                            <span className="text-[#560606] signature-font font-bold text-2xl">
                               Lori Deschene
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Quotes;
