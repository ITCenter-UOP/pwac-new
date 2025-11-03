import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../component/MyAccount/NavBar";
import SecNav from "../component/MyAccount/SecNav";

const MyAccount = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#fff9f9] to-[#fde8e8] text-[#2b1a1a]">
            {/* Top Navigation */}
            <div className="sticky top-0 z-50 shadow-md">
                <NavBar />
                <SecNav />
            </div>

            {/* Main Content */}
            <main className="flex-grow px-4 md:px-10 py-8">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-[#560606]/10 p-6">
                    <Outlet />
                </div>
            </main>

            {/* Footer */}
            <footer className="text-center py-4 text-sm text-[#560606]/70 border-t border-[#560606]/20 bg-white/60">
                © {new Date().getFullYear()} Psychological Wellbeing & Assessment Center — University of Peradeniya
            </footer>
        </div>
    );
};

export default MyAccount;
