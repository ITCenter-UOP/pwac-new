import React, { useEffect, useState } from "react";
import welcomeimg from "../../assets/Slider1.jpg";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import ItemCards from "./ItemCards";

const DashHome = () => {
    const { auth } = useAuth();
    const [dateTime, setDateTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => setDateTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);




    return (
        <div className="p-6">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#111122]/90 via-[#18182e]/80 to-[#0f0f1f]/90 border border-fuchsia-800/30 shadow-[0_0_30px_rgba(147,51,234,0.2)] backdrop-blur-2xl"
            >
                {/* Glow gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-600/10 via-purple-700/10 to-transparent pointer-events-none" />

                {/* Top content */}
                <div className="flex flex-col md:flex-row items-center gap-6 p-6">
                    {/* Image */}
                    <motion.img
                        src={welcomeimg}
                        alt="Welcome"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        className="rounded-xl h-40 w-auto shadow-[0_0_15px_rgba(147,51,234,0.3)]"
                    />

                    {/* Welcome Text */}
                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-300 mb-2 tracking-wide">
                            Welcome, {auth?.user?.username || "User"}
                        </h2>
                        <p className="text-fuchsia-100 text-sm leading-relaxed">
                            You’ve entered the{" "}
                            <span className="font-semibold text-fuchsia-300">
                                Psychological Well-being and Assessment Center
                            </span>
                            . Explore insights, stay balanced, and take your next step toward
                            growth.
                        </p>
                    </div>
                </div>

                {/* Divider line */}
                <div className="border-t border-fuchsia-800/30 mx-6" />

                {/* Bottom Section - Time & Date */}
                <div className="flex flex-col sm:flex-row justify-between items-center px-6 py-4 text-fuchsia-200 text-sm">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="tracking-wider"
                    >
                        🕒{" "}
                        {dateTime.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                        })}
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="tracking-wider"
                    >
                        📅 {dateTime.toLocaleDateString(undefined, {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </motion.div>
                </div>
            </motion.div>

            <div className="">
                <ItemCards />
            </div>
        </div>
    );
};

export default DashHome;
