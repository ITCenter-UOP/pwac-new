import React from "react";
import {
    FaUsers,
    FaNewspaper,
    FaQuestion,
} from "react-icons/fa";
import { GrSchedules } from "react-icons/gr";
import { IoPeople } from "react-icons/io5";
import { MdEvent } from "react-icons/md";
import { FiBook } from "react-icons/fi";
import { motion } from "framer-motion";
import CountUp from 'react-countup'

const ItemCards = () => {
    const items = [
        { id: 1, name: "Users", icon: <FaUsers />, value: 50 },
        { id: 2, name: "Appointments", icon: <GrSchedules />, value: 18 },
        { id: 3, name: "News & Events", icon: <FaNewspaper />, value: 12 },
        { id: 4, name: "Team", icon: <IoPeople />, value: 9 },
        { id: 5, name: "Workshops", icon: <MdEvent />, value: 4 },
        { id: 6, name: "Resources", icon: <FiBook />, value: 22 },
        { id: 7, name: "FAQs", icon: <FaQuestion />, value: 15 },
    ];

    return (
        <div className="mt-8">
            <h2 className="text-xl font-bold text-black mb-4 tracking-wide">
                Dashboard Overview
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {items.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{
                            scale: 1.05,
                            boxShadow: "0 0 25px rgba(217,70,239,0.4)",
                        }}
                        className="relative rounded-2xl p-5 border border-fuchsia-800/40 bg-gradient-to-br from-[#111122]/90 via-[#18182e]/80 to-[#0f0f1f]/90 shadow-[0_0_20px_rgba(147,51,234,0.15)] hover:border-fuchsia-500/60 transition-all duration-300 backdrop-blur-2xl"
                    >
                        {/* Glow overlay */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-600/10 via-purple-700/10 to-transparent pointer-events-none rounded-2xl" />

                        {/* Icon */}
                        <div className="text-4xl text-fuchsia-400 mb-3">{item.icon}</div>

                        {/* Name */}
                        <h3 className="text-lg font-semibold text-fuchsia-100 mb-1">
                            {item.name}
                        </h3>

                        {/* Value */}
                        <p className="text-fuchsia-300 text-sm font-medium tracking-wide">
                            <CountUp end={item.value} duration={5}/> total
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ItemCards;
