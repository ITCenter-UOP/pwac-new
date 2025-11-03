import React from "react";
import Logo from "../../assets/logo.png";
import { FaUserCircle, FaQuestionCircle } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { MdDashboard } from "react-icons/md";

const Nav = () => {
    const { auth } = useAuth();

    // Role-based button rendering
    const renderRoleButton = () => {
        if (!auth) {
            return (
                <a href="/login">
                    <button className="flex items-center gap-2 text-sm hover:text-[#560606] bg-white text-[#560606] px-3 py-1.5 rounded-full transition-all duration-300 hover:bg-gray-100 shadow-sm">
                        <FaUserCircle />
                        <span>Login</span>
                    </button>
                </a>
            );
        }

        if (auth.role === "admin" || auth.role === "staff") {
            return (
                <a href="/dashboard">
                    <button className="flex items-center gap-2 text-sm hover:text-[#560606] bg-white text-[#560606] px-3 py-1.5 rounded-full transition-all duration-300 hover:bg-gray-100 shadow-sm">
                        <MdDashboard />
                        <span>Dashboard</span>
                    </button>
                </a>
            );
        }

        if (auth.role === "user") {
            return (
                <a href="/my-account">
                    <button className="flex items-center gap-2 text-sm hover:text-[#560606] bg-white text-[#560606] px-3 py-1.5 rounded-full transition-all duration-300 hover:bg-gray-100 shadow-sm">
                        <MdDashboard />
                        <span>My Account</span>
                    </button>
                </a>
            );
        }

        // fallback
        return (
            <a href="/login">
                <button className="flex items-center gap-2 text-sm hover:text-[#560606] bg-white text-[#560606] px-3 py-1.5 rounded-full transition-all duration-300 hover:bg-gray-100 shadow-sm">
                    <FaUserCircle />
                    <span>Login</span>
                </button>
            </a>
        );
    };

    return (
        <div className="bg-[#560606] w-full text-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
                {/* Left Section */}
                <a href="/">
                    <div className="flex items-center gap-4 text-center md:text-left">
                        <img src={Logo} alt="Logo" className="h-16 w-auto mx-auto md:mx-0" />
                        <div>
                            <p className="text-lg font-semibold leading-tight">
                                Psychological Wellbeing & Assessment Center
                            </p>
                            <p className="text-sm text-gray-200">
                                University of Peradeniya
                            </p>
                        </div>
                    </div>
                </a>

                {/* Right Section */}
                <div className="flex items-center gap-6">
                    {renderRoleButton()}

                    <a href="/faqs">
                        <button className="flex items-center gap-2 text-sm hover:text-[#560606] bg-white text-[#560606] px-3 py-1.5 rounded-full transition-all duration-300 hover:bg-gray-100 shadow-sm">
                            <FaQuestionCircle />
                            <span>FAQ</span>
                        </button>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Nav;
