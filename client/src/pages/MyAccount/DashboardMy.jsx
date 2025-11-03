import React, { useEffect, useState } from "react";
import {
    FaCalendarCheck,
    FaClipboardList,
    FaPlus,
    FaClock,
    FaIdCard,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import API from "../../services/api";
import defultUser from "../../assets/user.png";

const DashboardMy = () => {
    const { auth } = useAuth();
    const username = auth?.user?.username || "Student";
    const token = localStorage.getItem("token");

    const [profileImage, setProfileImage] = useState(null);
    const [activeAppointment, setActiveAppointment] = useState(null);
    const [dateTime, setDateTime] = useState({
        time: "",
        date: "",
        day: "",
        month: "",
        year: "",
    });
    const [greeting, setGreeting] = useState("");

    // 🕒 Real-time DateTime
    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            const hour = now.getHours();
            const day = now.toLocaleDateString("en-US", { weekday: "long" });
            const month = now.toLocaleDateString("en-US", { month: "long" });
            const date = now.getDate();
            const year = now.getFullYear();
            const time = now.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            });

            if (hour < 12) setGreeting("Good Morning 🌅");
            else if (hour < 18) setGreeting("Good Afternoon ☀️");
            else setGreeting("Good Evening 🌙");

            setDateTime({ time, date, day, month, year });
        };

        updateDateTime();
        const timer = setInterval(updateDateTime, 1000);
        return () => clearInterval(timer);
    }, []);

    // 👤 Fetch Profile Image
    useEffect(() => {
        const fetchImage = async () => {
            try {
                const res = await API.get(`/member/get-myprofileimage?nocache=${Date.now()}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const imgData = Array.isArray(res.data.result)
                    ? res.data.result[0]
                    : res.data.result;
                setProfileImage(imgData?.profileimg || null);
            } catch {
                setProfileImage(null);
            }
        };
        fetchImage();
    }, [token]);

    // 📅 Fetch Active Appointment
    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const res = await API.get(`/appointment/get-all-appointments`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const allAppointments = res.data?.result || [];

                const active = allAppointments.find(
                    (a) =>
                        a.status !== "Rejected" &&
                        a.attendance !== "Present" &&
                        a.attendance !== "Absent"
                );
                setActiveAppointment(active || null);
            } catch (error) {
                console.error("Error fetching appointments:", error);
            }
        };
        fetchAppointments();
    }, [token]);

    const stats = [
        {
            id: 1,
            title: "My Appointments",
            value: activeAppointment ? "1 Active" : "0 Active",
            icon: <FaCalendarCheck className="text-3xl md:text-4xl text-[#560606]" />,
        },
        {
            id: 2,
            title: "Resources Accessed",
            value: "12",
            icon: <FaClipboardList className="text-3xl md:text-4xl text-[#560606]" />,
        },
        {
            id: 3,
            title: "Current Time",
            value: `${dateTime.time}`,
            icon: <FaClock className="text-3xl md:text-4xl text-[#560606]" />,
        },
    ];

    const actions = [
        {
            id: 1,
            title: "Create Appointment",
            icon: <FaPlus />,
            link: "/my-account/create-appointment",
        },
        {
            id: 2,
            title: "Available Resources",
            icon: <FaCalendarCheck />,
            link: "/resources",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#fef9f9] via-white to-[#fff5f5] px-4 sm:px-6 lg:px-10 py-8 sm:py-10">
            <div className="max-w-7xl mx-auto space-y-8 sm:space-y-10">
                {/* 🏫 Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="rounded-3xl bg-white shadow-xl border border-[#560606]/10 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between text-center md:text-left"
                >
                    <div className="space-y-1 sm:space-y-2">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#560606]">
                            {greeting}, {username} 👋
                        </h1>
                        <p className="text-gray-600 text-sm sm:text-base">
                            {dateTime.day}, {dateTime.month} {dateTime.date}, {dateTime.year}
                        </p>
                    </div>

                    <div className="mt-6 md:mt-0 relative">
                        <img
                            src={
                                profileImage
                                    ? `${import.meta.env.VITE_APP_API_FILES}/uploads/${profileImage}`
                                    : defultUser
                            }
                            alt="profile"
                            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-[#560606]/30 p-1 shadow-md object-cover mx-auto md:mx-0"
                        />
                        <span className="absolute bottom-2 right-4 w-4 h-4 bg-green-400 border border-white rounded-full" />
                    </div>
                </motion.div>

                {/* 📊 Stats */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
                >
                    {stats.map((stat) => (
                        <motion.div
                            key={stat.id}
                            whileHover={{ scale: 1.03 }}
                            className="bg-white rounded-2xl shadow-md border border-[#560606]/10 p-5 sm:p-6 flex justify-between items-center hover:shadow-xl transition-all duration-300"
                        >
                            <div>
                                <h2 className="text-base sm:text-lg font-semibold text-[#560606]">
                                    {stat.title}
                                </h2>
                                <p className="text-xl sm:text-2xl font-bold text-gray-800 mt-1 sm:mt-2">
                                    {stat.value}
                                </p>
                            </div>
                            <div className="bg-[#560606]/10 p-3 sm:p-4 rounded-2xl">
                                {stat.icon}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* 🎫 Active Appointment */}
                {activeAppointment && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white border border-[#560606]/20 shadow-md rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6"
                    >
                        <FaIdCard className="text-3xl sm:text-4xl text-[#560606]" />
                        <div className="text-sm sm:text-base">
                            <h2 className="text-lg font-semibold text-[#560606]">
                                Active Appointment
                            </h2>
                            <p className="text-gray-700">
                                Appointment ID:{" "}
                                <span className="font-semibold text-[#560606] break-all">
                                    {activeAppointment._id}
                                </span>
                            </p>
                            <p className="text-gray-600 text-xs sm:text-sm mt-1">
                                Status: {activeAppointment.status || "Pending"}
                            </p>
                        </div>
                    </motion.div>
                )}

                {/* ⚡ Quick Actions */}
                <div>
                    <h2 className="text-xl sm:text-2xl font-semibold text-[#560606] mb-4 sm:mb-6 text-center md:text-left">
                        Quick Actions
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                        {actions.map((action) => (
                            <motion.a
                                key={action.id}
                                href={action.link}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="bg-white border border-[#560606]/10 rounded-2xl p-5 sm:p-6 flex flex-col items-center justify-center text-center shadow-md hover:shadow-lg hover:bg-[#560606]/5 transition-all duration-300"
                            >
                                <div className="text-[#560606] text-3xl sm:text-4xl mb-2 sm:mb-3">
                                    {action.icon}
                                </div>
                                <div className="text-base sm:text-lg font-semibold text-gray-800">
                                    {action.title}
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardMy;
