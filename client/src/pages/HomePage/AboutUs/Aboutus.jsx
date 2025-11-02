import React from 'react';
import AboutSectionTwo from './AboutSectionTwo';
import AboutQuotes from './AboutQuotes';
import AboutSectionFourth from './AboutSectionFourth';

const AboutUs = () => {
    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Container */}
            <div className="mx-auto px-6 py-16 space-y-16">
                {/* Header */}
                <div className="text-center">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight drop-shadow-md text-[#560606] mb-4">
                        About Us
                    </h2>
                    <p className="text-gray-700 text-base md:text-lg italic max-w-2xl mx-auto leading-relaxed">
                        Empowering wellbeing through compassionate care, understanding, and evidence-based practices.
                    </p>
                </div>

                {/* Sections */}
                <AboutSectionTwo />
                <AboutQuotes />
                <AboutSectionFourth />
            </div>
        </div>
    );
};

export default AboutUs;
