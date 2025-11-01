import React, { useEffect, useState, useMemo } from "react";
import { FaUsers } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import DefaultButton from "../../../component/Buttons/DefaultButton";
import API from "../../../services/api";
import defultUser from "../../../assets/user.png";

const ManageUser = () => {
    const items = [
        { id: 1, name: "Administrative Users", icon: <MdAdminPanelSettings />, value: 50 },
        { id: 2, name: "Users", icon: <FaUsers />, value: 18 },
    ];

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [verifiedFilter, setVerifiedFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 20;

    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const res = await API.get(`/admin/get-all-users?nocache=${Date.now()}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Cache-Control": "no-cache",
                        Pragma: "no-cache",
                        Expires: "0",
                    },
                });

                if (res.data?.success && Array.isArray(res.data.result)) {
                    setUsers(res.data.result);
                } else {
                    setUsers([]);
                }
            } catch (err) {
                console.error("Failed to fetch users:", err);
                setError("Could not load users");
                setUsers([]);
            } finally {
                setLoading(false);
            }
        };

        fetchAllUsers();
    }, [token]);

    // 🔍 Filter + Search logic
    const filteredUsers = useMemo(() => {
        return users.filter((item) => {
            const user = item.user || {};
            const matchesSearch =
                user.username?.toLowerCase().includes(search.toLowerCase()) ||
                user.email?.toLowerCase().includes(search.toLowerCase());

            const matchesStatus =
                statusFilter === "" || String(user.isActive) === statusFilter;

            const matchesVerified =
                verifiedFilter === "" || String(user.isEmailVerified) === verifiedFilter;

            return matchesSearch && matchesStatus && matchesVerified;
        });
    }, [users, search, statusFilter, verifiedFilter]);

    // 📄 Pagination
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * usersPerPage,
        currentPage * usersPerPage
    );

    if (loading)
        return (
            <div className="text-center text-fuchsia-200 mt-10 text-lg animate-pulse">
                Loading users...
            </div>
        );

    if (error)
        return (
            <div className="text-center text-red-400 mt-10 text-lg">{error}</div>
        );

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
                        <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-600/10 via-purple-700/10 to-transparent rounded-2xl pointer-events-none" />
                        <div className="text-4xl text-fuchsia-400 mb-3">{item.icon}</div>
                        <h3 className="text-lg font-semibold text-fuchsia-100 mb-1">
                            {item.name}
                        </h3>
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

            {/* Filters */}
            <div className="mb-8 flex flex-wrap items-center gap-4">
                <input
                    type="text"
                    placeholder="Search by username or email..."
                    className="px-4 py-2 rounded-lg bg-[#18182e] border border-fuchsia-700/50 text-fuchsia-100 placeholder-fuchsia-400/60 focus:outline-none focus:ring-2 focus:ring-fuchsia-600"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select
                    className="px-4 py-2 rounded-lg bg-[#18182e] border border-fuchsia-700/50 text-fuchsia-100 focus:outline-none focus:ring-2 focus:ring-fuchsia-600"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="">All Status</option>
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                </select>

                <select
                    className="px-4 py-2 rounded-lg bg-[#18182e] border border-fuchsia-700/50 text-fuchsia-100 focus:outline-none focus:ring-2 focus:ring-fuchsia-600"
                    value={verifiedFilter}
                    onChange={(e) => setVerifiedFilter(e.target.value)}
                >
                    <option value="">All Verification</option>
                    <option value="true">Verified</option>
                    <option value="false">Not Verified</option>
                </select>
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
                        {paginatedUsers.length > 0 ? (
                            paginatedUsers.map((item, index) => {
                                const user = item.user || {};
                                return (
                                    <motion.tr
                                        key={user._id || index}
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.03 }}
                                        whileHover={{
                                            backgroundColor: "rgba(217,70,239,0.1)",
                                            boxShadow: "0 0 10px rgba(217,70,239,0.2)",
                                        }}
                                        className="border-t border-fuchsia-800/20 hover:backdrop-blur-xl transition-all duration-300"
                                    >
                                        <td className="px-6 py-4">
                                            {index + 1 + (currentPage - 1) * usersPerPage}
                                        </td>

                                        {/* Username + Avatar */}
                                        <td className="px-6 py-4 font-semibold text-fuchsia-200">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={
                                                        item.profileimg
                                                            ? `${import.meta.env.VITE_APP_API_FILES}/uploads/${item.profileimg}`
                                                            : defultUser
                                                    }
                                                    alt="User"
                                                    className="h-10 w-10 rounded-full border-2 border-fuchsia-500 object-cover shadow-[0_0_10px_rgba(255,0,255,0.4)]"
                                                />
                                                <span>{user.username}</span>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 text-fuchsia-300">
                                            {user.email}
                                        </td>

                                        <td className="px-6 py-4">
                                            {user.role ? "user" : "unknown"}
                                        </td>

                                        <td
                                            className={`px-6 py-4 font-medium ${user.isActive
                                                ? "text-green-400"
                                                : "text-red-400"
                                                }`}
                                        >
                                            {user.isActive ? "Active" : "Inactive"}
                                        </td>

                                        <td
                                            className={`px-6 py-4 font-medium ${user.isEmailVerified
                                                ? "text-emerald-400"
                                                : "text-amber-400"
                                                }`}
                                        >
                                            {user.isEmailVerified ? "Yes" : "No"}
                                        </td>

                                        <td className="px-6 py-4">
                                            <a href={`/Dashboard/update-user/${user._id}`}>
                                                <button
                                                    className="px-3 py-1.5 rounded-lg bg-fuchsia-700/30 hover:bg-fuchsia-600/40 
                                                text-fuchsia-200 text-xs font-medium transition-all duration-200 shadow-[0_0_10px_rgba(217,70,239,0.25)]"
                                                >
                                                    Edit
                                                </button>
                                            </a>
                                        </td>
                                    </motion.tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td
                                    colSpan="7"
                                    className="text-center py-6 text-fuchsia-400"
                                >
                                    No users found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </motion.div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-6 gap-2">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((p) => p - 1)}
                        className="px-3 py-1.5 rounded-lg bg-fuchsia-700/30 hover:bg-fuchsia-600/40 disabled:opacity-50 text-fuchsia-100 text-xs"
                    >
                        Prev
                    </button>
                    <span className="px-4 py-1.5 text-fuchsia-300 text-sm">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((p) => p + 1)}
                        className="px-3 py-1.5 rounded-lg bg-fuchsia-700/30 hover:bg-fuchsia-600/40 disabled:opacity-50 text-fuchsia-100 text-xs"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default ManageUser;
