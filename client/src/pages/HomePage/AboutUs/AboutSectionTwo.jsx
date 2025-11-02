import React from 'react';

const AboutSectionTwo = () => {
    return (
        <section className="px-6 lg:px-24 py-16">
            <div className="space-y-12">

                {/* Who the Centre is For */}
                <div className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition-shadow duration-500 cursor-default">
                    <h2 className="text-3xl font-bold text-[#560606] mb-4 inline-block border-b-4 border-[#FFC107] pb-1">
                        Who the Centre is For
                    </h2>
                    <p className="text-gray-800 text-lg leading-relaxed">
                        The Psychological Wellbeing and Assessment Centre serves the entire University of Peradeniya community, including students, academic staff, and non-academic staff.
                        <br /><br />
                        It is designed for anyone seeking support for emotional wellbeing, personal development, academic or professional growth, or psychological assessment.
                        <br /><br />
                        <span className="font-semibold">
                            Whether facing immediate challenges, planning for future success, or looking to build resilience and life skills, individuals at all stages of their journey are welcome.
                        </span>
                    </p>
                </div>

                {/* Brief Introduction */}
                <div className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition-shadow duration-500 cursor-default">
                    <h2 className="text-3xl font-bold text-[#560606] mb-4 inline-block border-b-4 border-[#FFC107] pb-1">
                        A Brief Introduction
                    </h2>
                    <p className="text-gray-800 text-lg leading-relaxed">
                        The Centre is committed to enhancing the emotional, social, and academic wellbeing of the university community.
                        <br /><br />
                        We offer a range of services including counselling, coaching, skills workshops, and personalized psychological assessments—focusing on both prevention and support.
                        <br /><br />
                        By helping individuals identify their strengths, build resilience, and develop life skills, the centre fosters personal growth while promoting a supportive environment that encourages help-seeking and reduces stigma around mental health.
                        <br /><br />
                        Conveniently located at the heart of the university, we offer confidential services in a welcoming, comfortable setting. Whether it’s crisis support, career counselling, or personal development workshops, we help our university community thrive.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default AboutSectionTwo;
