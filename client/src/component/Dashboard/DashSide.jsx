import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import defultImg from "../../assets/user.png";
import uoplogo from "../../assets/uoplogo.png";
import API from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { BiSolidDashboard } from "react-icons/bi";
import { FaUser, FaNewspaper, FaQuestion } from "react-icons/fa";
import { GrSchedules } from "react-icons/gr";
import { IoPeople } from "react-icons/io5";
import { MdEvent, MdLogout } from "react-icons/md";
import { FiBook } from "react-icons/fi";
import { motion } from "framer-motion";
import { Activity } from "lucide-react";

const DashSide = ({ closeSidebar }) => {
    const { auth, logout } = useAuth();
    const [MyProfileImage, setMyProfileImage] = useState([]);
    const token = localStorage.getItem("token");
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        const fetchMyProfileImage = async () => {
            try {
                const res = await API.get(`/member/get-myprofileimage?nocache=${Date.now()}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Cache-Control": "no-cache",
                        Pragma: "no-cache",
                        Expires: "0",
                    },
                });
                setMyProfileImage(
                    Array.isArray(res.data.result) ? res.data.result : [res.data.result]
                );
            } catch (err) {
                console.error("Failed to fetch profile image:", err);
                setMyProfileImage([]);
            }
        };
        fetchMyProfileImage();
    }, [token]);

    const navitem = [
        { name: "Dashboard", icon: <BiSolidDashboard />, link: "/Dashboard" },
        { name: "Users", icon: <FaUser />, link: "/Dashboard/users" },
        { name: "Appointment", icon: <GrSchedules />, link: "/Dashboard/appointment" },
        { name: "News & Event", icon: <FaNewspaper />, link: "/Dashboard/news-event" },
        { name: "WorkShop", icon: <MdEvent />, link: "/Dashboard/workshop" },
        { name: "Resources", icon: <FiBook />, link: "/Dashboard/resources" },
        { name: "FAQ", icon: <FaQuestion />, link: "/Dashboard/faq" },
        { name: "User Activities", icon: <Activity />, link: "/Dashboard/userlogs" },        
    ];

    return (
        <motion.aside
            initial={{ width: 300, opacity: 0 }}
            animate={{ width: collapsed ? 96 : 280, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="relative h-full flex flex-col bg-gradient-to-b from-[#0f0f1a] via-[#161627] to-[#0d0d18] border-r border-purple-800/30 shadow-[0_0_30px_rgba(147,51,234,0.25)] overflow-hidden backdrop-blur-2xl"
        >
            {/* Neon Glow Border */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-fuchsia-600/20 to-purple-800/10 blur-3xl" />
            </div>

            {/* Logo */}
            <div className="flex flex-col items-center py-5 border-b border-purple-700/20">
                <motion.img
                    src={uoplogo}
                    alt="UOP Logo"
                    className="h-14 w-auto drop-shadow-[0_0_10px_rgba(255,0,255,0.4)]"
                    whileHover={{ scale: 1.1, rotate: 3 }}
                />
                {!collapsed && (
                    <motion.h1
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-300 mt-2 tracking-wider"
                    >
                        PWAC
                    </motion.h1>
                )}
            </div>

            {/* Profile */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="px-5 py-6 border-b border-purple-800/20"
            >
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <img
                            src={
                                MyProfileImage[0]?.profile_image
                                    ? `${import.meta.env.VITE_APP_API}/uploads/${MyProfileImage[0].profile_image}`
                                    : defultImg
                            }
                            alt="User"
                            className="w-12 h-12 rounded-full border-2 border-fuchsia-500 shadow-[0_0_15px_rgba(255,0,255,0.4)] object-cover"
                        />
                        <span className="absolute bottom-0 right-0 block w-3 h-3 bg-green-400 rounded-full border border-gray-800" />
                    </div>
                    {!collapsed && (
                        <div>
                            <h2 className="text-sm font-semibold text-fuchsia-200">
                                {auth.user?.username || "User"}
                            </h2>
                            <p className="text-xs text-purple-400 uppercase">{auth?.role}</p>
                        </div>
                    )}
                </div>
            </motion.div>

            {/* Navigation */}
            <nav className="flex-1 px-3 mt-4 space-y-1 overflow-y-auto custom-scrollbar">
                {navitem.map((item, index) => (
                    <NavLink
                        key={index}
                        to={item.link}
                        onClick={closeSidebar}
                        className={({ isActive }) =>
                            `group relative flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${isActive
                                ? "bg-gradient-to-r from-fuchsia-600 to-purple-700 text-white shadow-[0_0_15px_rgba(147,51,234,0.5)]"
                                : "text-purple-300 hover:bg-white/10 hover:text-fuchsia-300"
                            }`
                        }
                    >
                        <motion.span
                            whileHover={{ scale: 1.2, rotate: 5 }}
                            className="text-xl"
                        >
                            {item.icon}
                        </motion.span>
                        {!collapsed && (
                            <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-sm tracking-wide"
                            >
                                {item.name}
                            </motion.span>
                        )}
                        {/* Neon hover glow */}
                        <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 group-hover:bg-gradient-to-r from-fuchsia-400 to-purple-500 blur-md transition-all duration-500" />
                    </NavLink>
                ))}

                {/* Logout */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={logout}
                    className="flex items-center gap-3 w-full px-4 py-3 mt-6 text-red-400 hover:text-white hover:bg-red-500/30 rounded-xl font-medium transition-all duration-300"
                >
                    <MdLogout className="text-xl" />
                    {!collapsed && <span className="text-sm">Logout</span>}
                </motion.button>
            </nav>

            {/* Footer */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-3 text-center text-[10px] text-purple-400 border-t border-purple-700/20"
            >
                {!collapsed && (
                    <>
                        © {new Date().getFullYear()} UOP-PWAC
                        <br />
                        <span className="text-fuchsia-400 font-semibold">
                            Psychological Well-being and Assessment Center
                        </span>
                    </>
                )}
            </motion.div>
        </motion.aside>
    );
};

export default DashSide;
