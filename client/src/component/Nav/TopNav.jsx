import React from "react";
import { FaHome, FaPhoneAlt } from "react-icons/fa";

const TopNav = () => {
    return (
        <div className="bg-white text-gray-600 border-b border-gray-200 w-full py-2 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm space-y-1 md:space-y-0">
                <div className="flex items-center gap-2 text-center md:text-left">
                    <FaHome className="text-[#560606]" />
                    <p>University of Peradeniya, Galaha Rd, 20400</p>
                </div>

                <div className="flex items-center gap-2">
                    <FaPhoneAlt className="text-[#560606]" />
                    <p>+94 81 239 2816</p>
                </div>
            </div>
        </div>
    );
};

export default TopNav;
