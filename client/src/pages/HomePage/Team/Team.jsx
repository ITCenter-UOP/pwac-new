import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import defultUser from "../../../assets/user.png";
import API from "../../../services/api";

const Team = () => {
    const [team, setTeam] = useState([]);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const res = await API.get("/member/get-all-members");
                if (res.data?.success) {
                    const filtered = res.data.result.filter((m) =>
                        ["admin", "staff"].includes(m.role?.name?.toLowerCase())
                    );
                    setTeam(filtered);
                }
            } catch (err) {
                console.error("Error fetching members:", err);
            }
        };
        fetchMembers();
    }, []);

    const getProfileSrc = (member) => {
        return member.profileImage?.profileimg
            ? `${import.meta.env.VITE_APP_API_FILES}/uploads/${member.profileImage.profileimg}`
            : defultUser;
    };

    return (
        <section className="py-16 px-4 md:px-8 bg-gradient-to-br from-[#f9fafb] to-[#f1f5f9]">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-[#560606] mb-4">
                    Our University Team
                </h2>
                <p className="text-gray-600 mb-12 text-base md:text-lg">
                    Meet our dedicated <span className="font-semibold text-[#560606]">administrators</span> and{" "}
                    <span className="font-semibold text-[#560606]">staff</span> who ensure student success.
                </p>

                {/* Team Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {team.length > 0 ? (
                        team.map((member, index) => {
                            const info = member.personalInfor || {};

                            return (
                                <motion.div
                                    key={member._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    className="relative group bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                                >
                                    {/* Profile Image */}
                                    <div className="relative w-full flex justify-center mt-6">
                                        <img
                                            src={getProfileSrc(member)}
                                            alt={member.username}
                                            className="w-28 h-28 md:w-32 md:h-32 object-cover rounded-full border-4 border-gradient-to-br border-[#560606]/40 shadow-md transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>

                                    {/* Name & Role */}
                                    <div className="text-center mt-4 px-4 pb-6">
                                        <h3 className="text-lg md:text-xl font-semibold text-gray-800 capitalize">
                                            {member.username}
                                        </h3>
                                        <span className="inline-block mt-1 px-3 py-1 text-xs md:text-sm bg-gradient-to-r from-[#560606] to-[#7d1b1b] text-white rounded-full">
                                            {member.role?.name?.toLowerCase() === "admin" ? "Director" : member.role?.name}
                                        </span>

                                        {/* Expertise */}
                                        {info.expertise && (
                                            <p className="text-sm text-gray-500 italic mt-2">{info.expertise}</p>
                                        )}

                                        {/* Description */}
                                        {info.desc && (
                                            <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                                                {info.desc}
                                            </p>
                                        )}
                                    </div>

                                    {/* Hover Overlay for Contact */}
                                    <div className="absolute inset-0 bg-[#560606]/90 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-4 text-center">
                                        {info.contact?.length > 0 && (
                                            <p className="flex items-center gap-2 mb-2">
                                                <FaPhoneAlt /> {info.contact[0]}
                                            </p>
                                        )}
                                        <p className="flex items-center gap-2 mb-2">
                                            <FaEnvelope /> {member.email}
                                        </p>
                                        {info.address && (
                                            <p className="flex items-center gap-2">
                                                <FaMapMarkerAlt /> {info.address}
                                            </p>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })
                    ) : (
                        <p className="col-span-full text-gray-500">No team members found.</p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Team;
