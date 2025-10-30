import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const MainFooter = () => {
    return (
        <footer className="bg-[#3b0a0a] text-[#f5f0e6] border-t border-[#7c4a4a]/40 md:pb-0 pb-12">
            {/* Upper section */}
            <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-12 ">

                {/* University Info */}
                <div>
                    <h3 className="text-xl font-serif font-semibold mb-4 text-[#f1d7b0]">
                        University of Peradeniya
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-200">
                        <span className="text-[#f8e7cb] font-medium">
                            Psychological Wellbeing & Assessment Center
                        </span>{" "}
                        is dedicated to promoting mental health, emotional balance, and personal growth within the university community through counseling, training, and research initiatives.
                    </p>
                </div>

                {/* Programs */}
                <div>
                    <h4 className="text-lg font-semibold mb-4 text-[#f1d7b0]">Our Programs</h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                        <li><a href="#" className="hover:text-[#f8e7cb] transition">Counseling Services</a></li>
                        <li><a href="#" className="hover:text-[#f8e7cb] transition">Workshops & Seminars</a></li>
                        <li><a href="#" className="hover:text-[#f8e7cb] transition">Stress Management</a></li>
                        <li><a href="#" className="hover:text-[#f8e7cb] transition">Peer Support</a></li>
                    </ul>
                </div>

                {/* Resources */}
                <div>
                    <h4 className="text-lg font-semibold mb-4 text-[#f1d7b0]">Resources</h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                        <li><a href="#" className="hover:text-[#f8e7cb] transition">Mental Health Guides</a></li>
                        <li><a href="#" className="hover:text-[#f8e7cb] transition">Publications</a></li>
                        <li><a href="#" className="hover:text-[#f8e7cb] transition">Awareness Events</a></li>
                        <li><a href="#" className="hover:text-[#f8e7cb] transition">FAQ</a></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h4 className="text-lg font-semibold mb-4 text-[#f1d7b0]">Contact Us</h4>
                    <ul className="space-y-3 text-sm text-gray-300">
                        <li className="flex items-start gap-3">
                            <FaMapMarkerAlt className="text-[#f1d7b0] mt-1" />
                            University of Peradeniya, Peradeniya, Sri Lanka
                        </li>
                        <li className="flex items-start gap-3">
                            <FaPhoneAlt className="text-[#f1d7b0] mt-1" /> +94 81 123 4567
                        </li>
                        <li className="flex items-start gap-3">
                            <FaEnvelope className="text-[#f1d7b0] mt-1" /> wellbeing@pdn.ac.lk
                        </li>
                    </ul>
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-[#7c4a4a]/40"></div>

            {/* Bottom section */}
            <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
                {/* Left */}
                <div className="text-center md:text-left text-gray-300">
                    © {new Date().getFullYear()} University of Peradeniya — Psychological Wellbeing & Assessment Center | developed and maintained by <a href="https://www.ceit.pdn.ac.lk/" target="_blank">IT Center</a>
                </div>

                {/* Social */}
                <div className="flex items-center gap-5 text-[#f1d7b0] text-lg">
                    <a href="#" className="hover:opacity-80 transition"><FaFacebookF /></a>
                    <a href="#" className="hover:opacity-80 transition"><FaTwitter /></a>
                    <a href="#" className="hover:opacity-80 transition"><FaInstagram /></a>
                </div>
            </div>
        </footer>
    );
};

export default MainFooter;
