import React, { useEffect, useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import API from "../../services/api";
import userpng from "../../assets/user.png";
import UpdatePass from "./UpdatePass";
import UpdateProfileImage from "./UpdateProfileImage";
import { motion } from "framer-motion";

const Profile = () => {
    const { auth } = useAuth();
    const [MyProfileImage, setMyProfileImage] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        // Uncomment to fetch profile image dynamically if needed
        // const fetchmyprofileimage = async () => {
        //   try {
        //     const res = await API.get(`/member/get-myprofileimage?nocache=${Date.now()}`, {
        //       headers: {
        //         Authorization: `Bearer ${token}`,
        //         "Cache-Control": "no-cache",
        //         Pragma: "no-cache",
        //         Expires: "0",
        //       },
        //     });
        //     setMyProfileImage(
        //       Array.isArray(res.data.result) ? res.data.result : [res.data.result]
        //     );
        //   } catch (err) {
        //     console.error("Failed to fetch profile image:", err);
        //     setMyProfileImage([]);
        //   }
        // };
        // fetchmyprofileimage();
    }, [token]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative flex flex-col gap-10"
        >
            {/* Background Glow */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-600/10 via-purple-700/10 to-transparent blur-3xl" />
            </div>

           
            {/* Profile Card */}
            <motion.div
                initial={{ scale: 0.97, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative overflow-hidden rounded-3xl border border-purple-700/40 bg-gradient-to-br from-[#131324]/80 to-[#1c1c30]/90 backdrop-blur-xl p-8 shadow-[0_0_40px_rgba(147,51,234,0.2)] max-w-3xl w-full"
            >
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-700/10 to-transparent blur-2xl" />
                </div>

                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 relative z-10">
                    {/* Avatar */}
                    <motion.div whileHover={{ scale: 1.05 }} className="relative">
                        <div className="relative">
                            <img
                                src={
                                    MyProfileImage[0]?.profile_image
                                        ? `${import.meta.env.VITE_APP_API}/uploads/${MyProfileImage[0].profile_image}`
                                        : userpng
                                }
                                alt="User"
                                className="h-32 w-32 rounded-full border-4 border-fuchsia-600 shadow-[0_0_30px_rgba(217,70,239,0.4)] object-cover"
                            />
                            <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border border-gray-900 shadow-md" />
                        </div>
                    </motion.div>

                    {/* Info */}
                    <div className="flex flex-col gap-2">
                        <h2 className="text-2xl font-bold text-fuchsia-100 tracking-wide">
                            {auth?.user?.username || "User"}
                        </h2>
                        <p className="text-purple-300 text-sm">{auth?.user?.email}</p>
                        <div className="mt-2 inline-block px-4 py-1 text-xs font-semibold text-white bg-gradient-to-r from-fuchsia-600 to-purple-600 rounded-full shadow-md">
                            {auth?.role || "Member"}
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Update Sections */}
            <div className="grid md:grid-cols-2 gap-8">
                {/* Password Update */}
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gradient-to-br from-[#1b1b2d]/80 to-[#2a1b36]/80 border border-purple-700/40 rounded-3xl p-6 shadow-[0_0_25px_rgba(147,51,234,0.25)] backdrop-blur-xl"
                >
                    <h3 className="text-lg font-semibold text-white mb-4 tracking-wide">
                        Update Password
                    </h3>
                    <div className="border-t border-purple-800/30 mb-4"></div>
                    <UpdatePass />
                </motion.div>

                {/* Profile Image Update */}
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gradient-to-br from-[#1b1b2d]/80 to-[#2a1b36]/80 border border-purple-700/40 rounded-3xl p-6 shadow-[0_0_25px_rgba(147,51,234,0.25)] backdrop-blur-xl"
                >
                    <h3 className="text-lg font-semibold text-white mb-4 tracking-wide">
                        Update Profile Image
                    </h3>
                    <div className="border-t border-purple-800/30 mb-4"></div>
                    <UpdateProfileImage />
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Profile;
