import React from "react";
import { FaUsers, FaHandsHelping, FaHeart } from "react-icons/fa";

const AboutUsHome = () => {
    return (
        <section className="py-24 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-gray-50 to-white">
            {/* Header */}
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-[#560606] mb-3 tracking-tight">
                    About Us
                </h2>
                <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
                    Learn more about our identity, purpose, and commitment to mental wellbeing.
                </p>
                <div className="mt-4 w-16 h-[3px] bg-[#560606] mx-auto rounded-full"></div>
            </div>

            {/* Content Grid */}
            <div className="grid md:grid-cols-3 gap-10">
                {/* Who We Are */}
                <div
                    data-aos="zoom-in"
                    className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 text-center border-t-4 border-[#560606]"
                >
                    <div className="flex justify-center mb-5">
                        <FaUsers className="text-[#560606] text-5xl" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-3">
                        Who We Are
                    </h3>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                        The Psychological Wellbeing and Assessment Centre is a space within the
                        University of Peradeniya that promotes emotional and mental wellness for
                        students, staff, and their families. We believe early psychological
                        support and preventive care build resilience in individuals and communities.
                    </p>
                </div>

                {/* What We Do */}
                <div
                    data-aos="zoom-in"
                    className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 text-center border-t-4 border-[#560606]"
                >
                    <div className="flex justify-center mb-5">
                        <FaHandsHelping className="text-[#560606] text-5xl" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-3">
                        What We Do
                    </h3>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                        We provide psychological first aid by trained professionals, and offer
                        screenings, assessments, and referrals to the university’s CaPSU. We also
                        host programs and workshops to promote mental health.
                    </p>
                </div>

                {/* Our Mission */}
                <div
                    data-aos="zoom-in"
                    className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 text-center border-t-4 border-[#560606]"
                >
                    <div className="flex justify-center mb-5">
                        <FaHeart className="text-[#560606] text-5xl" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-3">
                        Our Mission
                    </h3>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                        To create a mentally healthy campus through accessible, confidential
                        psychological support, and empower individuals through education and
                        wellbeing programs.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default AboutUsHome;
