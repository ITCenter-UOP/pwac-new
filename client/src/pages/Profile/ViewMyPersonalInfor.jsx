import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import API from "../../services/api";
import { motion } from "framer-motion";
import userpng from "../../assets/user.png";

const ViewMyPersonalInfor = () => {
    const { auth } = useAuth();
    const [mypersonalinfor, setmypersonalinfor] = useState(null);
    const token = localStorage.getItem("token");


    useEffect(() => {
        const fetchmypersonalinfor = async () => {
            try {
                const res = await API.get(`/member/get-personal-infor?nocache=${Date.now()}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Cache-Control": "no-cache",
                        Pragma: "no-cache",
                        Expires: "0",
                    },
                });
                setmypersonalinfor(res.data.result || null);
            } catch (err) {
                console.error("Failed to fetch personal info:", err);
                setmypersonalinfor(null);
            }
        };
        fetchmypersonalinfor();
    }, [token]);

    if (!mypersonalinfor) return <p className="text-center text-purple-300 mt-6">You Still Not Update your Personal Data</p>;

    return (
        <motion.div
            initial={{ scale: 0.97, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl border border-purple-700/40 bg-gradient-to-br from-[#131324]/80 to-[#1c1c30]/90 backdrop-blur-xl p-8 shadow-[0_0_40px_rgba(147,51,234,0.2)] max-w-7xl w-full mx-auto mt-8"
        >
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-700/10 to-transparent blur-2xl" />
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 relative z-10">

                {/* Info */}
                <div className="flex flex-col gap-2 text-left">
                    <div className="mt-4 space-y-2 text-purple-100">
                        <p><span className="font-semibold">Address:</span> {mypersonalinfor.address || "-"}</p>
                        <p><span className="font-semibold">Contact:</span> {mypersonalinfor.contact?.join(", ") || "-"}</p>
                        <p><span className="font-semibold">Description:</span> {mypersonalinfor.desc || "-"}</p>
                        <p><span className="font-semibold">Expertise:</span> {mypersonalinfor.expertise || "-"}</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );

};

export default ViewMyPersonalInfor;
