import React, { useState, useEffect, useRef } from "react";
import {
    Menu,
    Search,
    Bell,
    MessageCircle,
    ChevronDown,
    User,
    Settings,
    LogOut,
} from "lucide-react";
import defultUser from "../../assets/user.png";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import API from "../../services/api";
import { motion, AnimatePresence } from "framer-motion";

const DashNav = ({ onMenuClick }) => {
    const { auth, logout } = useAuth();
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [MyProfileImage, setMyProfileImage] = useState([]);
    const token = localStorage.getItem("token");

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Fetch profile image
    useEffect(() => {
        const fetchmyprofileimage = async () => {
            try {
                const res = await API.get(
                    `/member/get-myprofileimage?nocache=${Date.now()}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Cache-Control": "no-cache",
                            Pragma: "no-cache",
                            Expires: "0",
                        },
                    }
                );
                setMyProfileImage(
                    Array.isArray(res.data.result) ? res.data.result : [res.data.result]
                );
            } catch (err) {
                console.error("Failed to fetch roles:", err);
                setMyProfileImage([]);
            }
        };

        fetchmyprofileimage();
    }, [token]);

    return (
        <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="sticky top-0 z-50 border-b border-purple-700/30 bg-gradient-to-r from-[#0d0d18]/70 via-[#141428]/70 to-[#0d0d18]/70 backdrop-blur-2xl shadow-[0_0_25px_rgba(147,51,234,0.25)]"
        >
            <div className="flex items-center justify-between px-4 py-3 lg:px-6">
                {/* Left Section */}
                <div className="flex items-center gap-4">
                    {/* Search Bar */}
                    <div className="hidden md:flex items-center bg-gradient-to-r from-[#1a1a2b] to-[#131324] border border-fuchsia-800/40 rounded-full px-3 py-2 w-80 shadow-inner focus-within:shadow-[0_0_10px_rgba(255,0,255,0.3)] transition">
                        <Search className="text-fuchsia-400 w-5 h-5 mr-2" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-transparent focus:outline-none w-full text-sm text-fuchsia-100 placeholder-fuchsia-500/60"
                        />
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-6">
                    {/* Notification */}
                    <Link to={"/Dashboard/notifications"}>
                        <motion.button
                            whileHover={{ scale: 1.15 }}
                            className="relative text-fuchsia-400 hover:text-fuchsia-200 transition"
                        >
                            <Bell className="w-6 h-6" />
                            <span className="absolute -top-1 -right-1 bg-fuchsia-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-lg">
                                3
                            </span>
                        </motion.button>
                    </Link>

                    {/* Messages */}
                    <motion.button
                        whileHover={{ scale: 1.15 }}
                        className="relative text-fuchsia-400 hover:text-fuchsia-200 transition"
                    >
                        <MessageCircle className="w-6 h-6" />
                        <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-lg">
                            5
                        </span>
                    </motion.button>

                    {/* User Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setOpen(!open)}
                            className="flex items-center gap-3 rounded-full bg-[#1a1a2b]/60 hover:bg-[#22223a]/60 px-2 py-1 transition border border-fuchsia-800/40"
                        >
                            <div className="relative">
                                <img
                                    src={
                                        MyProfileImage[0]?.profileimg
                                            ? `${import.meta.env.VITE_APP_API_FILES}/uploads/${MyProfileImage[0].profileimg}`
                                            : defultUser
                                    }
                                    alt="User"
                                    className="h-10 w-10 rounded-full border-2 border-fuchsia-500 object-cover shadow-[0_0_10px_rgba(255,0,255,0.4)]"
                                />
                                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border border-[#141428] rounded-full" />
                            </div>

                            <div className="hidden sm:block text-left leading-tight">
                                <p className="text-fuchsia-200 font-bold text-sm tracking-wide">
                                    {auth?.user?.username || "User"}
                                </p>
                                <p className="text-[10px] text-purple-400 uppercase">
                                    {auth?.role}
                                </p>
                            </div>

                            <ChevronDown
                                className={`w-4 h-4 text-fuchsia-400 transition-transform duration-300 ${open ? "rotate-180" : ""
                                    }`}
                            />
                        </motion.button>

                        {/* Dropdown Menu */}
                        <AnimatePresence>
                            {open && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute right-0 mt-3 w-52 bg-gradient-to-b from-[#1b1b2e]/95 to-[#141428]/95 border border-fuchsia-800/40 rounded-xl shadow-[0_0_15px_rgba(147,51,234,0.3)] overflow-hidden backdrop-blur-xl"
                                >
                                    <ul className="py-2 text-sm text-fuchsia-100">
                                        <li>
                                            <Link to={"/Dashboard/my-profile"}>
                                                <button className="flex items-center w-full px-4 py-2 hover:bg-fuchsia-500/20 transition">
                                                    <User className="w-4 h-4 mr-2" /> Profile
                                                </button>
                                            </Link>
                                        </li>
                                        <li>
                                            <button className="flex items-center w-full px-4 py-2 hover:bg-fuchsia-500/20 transition">
                                                <Settings className="w-4 h-4 mr-2" /> Settings
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                onClick={logout}
                                                className="flex items-center w-full px-4 py-2 hover:bg-red-500/30 transition text-red-400"
                                            >
                                                <LogOut className="w-4 h-4 mr-2" /> Logout
                                            </button>
                                        </li>
                                    </ul>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </motion.header>
    );
};

export default DashNav;
