import React from "react";
import { FaUsers } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import DefaultButton from "../../../component/Buttons/DefaultButton";

const ManageUser = () => {
    const items = [
        { id: 1, name: "Administrative Users", icon: <MdAdminPanelSettings />, value: 50 },
        { id: 2, name: "Users", icon: <FaUsers />, value: 18 },
    ];

    const users = [
        {
            id: 1,
            username: "john_doe",
            email: "john@example.com",
            type: "Admin",
            status: "Active",
            verified: true,
        },
        {
            id: 2,
            username: "lisa_white",
            email: "lisa@example.com",
            type: "User",
            status: "Suspended",
            verified: false,
        },
        {
            id: 3,
            username: "mark_silver",
            email: "mark@example.com",
            type: "User",
            status: "Active",
            verified: true,
        },
    ];

    return (
        <div className="mt-4">
            {/* Title */}
            <h2 className="text-2xl font-bold text-black mb-6 tracking-wide">
                User Management
            </h2>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {items.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{
                            scale: 1.05,
                            boxShadow: "0 0 25px rgba(217,70,239,0.4)",
                        }}
                        className="relative rounded-2xl p-6 border border-fuchsia-800/40 
              bg-gradient-to-br from-[#111122]/90 via-[#18182e]/80 to-[#0f0f1f]/90 
              shadow-[0_0_20px_rgba(147,51,234,0.15)] hover:border-fuchsia-500/60 
              transition-all duration-300 backdrop-blur-2xl cursor-pointer"
                    >
                        {/* Glow overlay */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-600/10 via-purple-700/10 to-transparent rounded-2xl pointer-events-none" />

                        {/* Icon */}
                        <div className="text-4xl text-fuchsia-400 mb-3">{item.icon}</div>

                        {/* Name */}
                        <h3 className="text-lg font-semibold text-fuchsia-100 mb-1">{item.name}</h3>

                        {/* Value */}
                        <p className="text-fuchsia-300 text-sm font-medium tracking-wide">
                            <CountUp end={item.value} duration={3} /> total
                        </p>
                    </motion.div>
                ))}
            </div>

            {/* Button Section */}
            <div className="flex justify-start mb-8">
                <DefaultButton
                    type="button"
                    label="Create New Administrative User"
                    onClick={() => console.log("Open create admin modal")}
                    className="!bg-gradient-to-r !from-fuchsia-600 !to-purple-600 hover:shadow-[0_0_25px_rgba(217,70,239,0.6)] transition-all duration-300"
                />
            </div>

            {/* Users Table */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="overflow-x-auto bg-gradient-to-br from-[#111122]/90 via-[#18182e]/80 to-[#0f0f1f]/90 border border-fuchsia-800/40 rounded-3xl shadow-[0_0_25px_rgba(147,51,234,0.15)] backdrop-blur-2xl"
            >
                <table className="min-w-full text-sm text-fuchsia-100 border-collapse">
                    <thead>
                        <tr className="text-fuchsia-300 uppercase text-xs tracking-wider bg-gradient-to-r from-fuchsia-700/30 to-purple-700/30">
                            <th className="px-6 py-4 text-left">#</th>
                            <th className="px-6 py-4 text-left">Username</th>
                            <th className="px-6 py-4 text-left">Email</th>
                            <th className="px-6 py-4 text-left">User Type</th>
                            <th className="px-6 py-4 text-left">Account Status</th>
                            <th className="px-6 py-4 text-left">Email Verified</th>
                            <th className="px-6 py-4 text-left">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user, index) => (
                            <motion.tr
                                key={user.id}
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{
                                    backgroundColor: "rgba(217,70,239,0.1)",
                                    boxShadow: "0 0 10px rgba(217,70,239,0.2)",
                                }}
                                className="border-t border-fuchsia-800/20 hover:backdrop-blur-xl transition-all duration-300"
                            >
                                <td className="px-6 py-4">{user.id}</td>
                                <td className="px-6 py-4 font-semibold text-fuchsia-200">{user.username}</td>
                                <td className="px-6 py-4 text-fuchsia-300">{user.email}</td>
                                <td className="px-6 py-4">{user.type}</td>
                                <td
                                    className={`px-6 py-4 font-medium ${user.status === "Active" ? "text-green-400" : "text-red-400"
                                        }`}
                                >
                                    {user.status}
                                </td>
                                <td
                                    className={`px-6 py-4 font-medium ${user.verified ? "text-emerald-400" : "text-amber-400"
                                        }`}
                                >
                                    {user.verified ? "Yes" : "No"}
                                </td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => console.log("Edit user", user.username)}
                                        className="px-3 py-1.5 rounded-lg bg-fuchsia-700/30 hover:bg-fuchsia-600/40 
                      text-fuchsia-200 text-xs font-medium transition-all duration-200 shadow-[0_0_10px_rgba(217,70,239,0.25)]"
                                    >
                                        Edit
                                    </button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </motion.div>
        </div>
    );
};

export default ManageUser;
