import React from 'react';
import {
    HeartHandshake,
    HeartPulse,
    ClipboardCheck,
    UsersRound,
} from "lucide-react";

const Services = () => {
    const services = [
        {
            icon: <HeartHandshake className="h-12 w-12 text-[#560606]" />,
            title: "Psychological First Aid",
            subtitle: "Immediate support without judgment.",
            description:
                "Brief, one-on-one sessions by trained professionals to help manage distress, stabilize emotions, and identify next steps. Often the first point of contact in times of emotional crisis.",
        },
        {
            icon: <HeartPulse className="h-12 w-12 text-[#560606]" />,
            title: "Mental Health Screening & Referrals",
            subtitle: "Get clarity and direction.",
            description:
                "Initial confidential screening helps us understand your emotional state and immediate concerns. Based on this, clients may be referred to:",
            bullets: [
                "Counselling and Psychological Services Unit (CaPSU)",
                "Psychiatric Unit – Teaching Hospital Peradeniya",
                "Group therapy, workshops, or assessments",
            ],
        },
        {
            icon: <ClipboardCheck className="h-12 w-12 text-[#560606]" />,
            title: "Psychological Assessments",
            subtitle: "Understand yourself better.",
            description: "We offer structured assessments for:",
            bullets: [
                "IQ and cognitive abilities",
                "Emotional and behavioural functioning",
                "Stress, anxiety, depression, ADHD",
                "Personality and career interests",
                "Specific learning disabilities",
            ],
            closing:
                "These assessments support academic planning, therapy, and personal insight.",
        },
        {
            icon: <UsersRound className="h-12 w-12 text-[#560606]" />,
            title: "Wellbeing Workshops & Programs",
            subtitle: "Grow with others. Learn life-enhancing skills.",
            description: "We host sessions on:",
            bullets: [
                "Stress management & emotional regulation",
                "Resilience building",
                "Mindfulness & relaxation",
                "Communication & relationship skills",
                "Financial & time management",
                "Work–life balance",
                "Music, dance & art therapy",
                "Smartphone addiction",
                "Parenting skills",
                "Movie discussions, and more",
            ],
            closing: "Open to all university members and families.",
        },
    ];

    return (
        <div className="bg-gray-50 min-h-screen px-6 lg:px-24 py-16">
            {/* Page Heading */}
            <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight drop-shadow-md text-[#560606] mb-3">
                    Services Offered
                </h2>
                <p className="text-gray-700 text-base md:text-lg leading-relaxed italic max-w-2xl mx-auto">
                    A variety of mental health services designed to meet your unique needs.
                </p>
            </div>

            {/* Service Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                {services.map((service, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-200 hover:border-[#560606] cursor-pointer flex flex-col"
                    >
                        <div className="flex items-center justify-center mb-4">
                            <div className="p-3 bg-[#560606]/10 rounded-full">
                                {service.icon}
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-[#560606] mb-2">{service.title}</h3>
                        <p className="text-gray-700 mb-3 font-medium">{service.subtitle}</p>
                        <p className="text-gray-600 mb-3 leading-relaxed">{service.description}</p>
                        {service.bullets && (
                            <ul className="list-disc list-inside mb-3 text-gray-600 space-y-1 pl-2">
                                {service.bullets.map((bullet, i) => (
                                    <li key={i}>{bullet}</li>
                                ))}
                            </ul>
                        )}
                        {service.closing && (
                            <p className="text-gray-600 mt-auto font-medium">{service.closing}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Services;
