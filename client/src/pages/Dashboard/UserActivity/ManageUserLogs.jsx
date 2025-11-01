import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import API from "../../../services/api";

const ManageUserLogs = () => {
    const [userlogs, setUserLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 20;

    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchAllLogs = async () => {
            try {
                const res = await API.get(`/admin/user-logs?nocache=${Date.now()}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Cache-Control": "no-cache",
                        Pragma: "no-cache",
                        Expires: "0",
                    },
                });

                if (res.data?.success && Array.isArray(res.data.result)) {
                    setUserLogs(res.data.result);
                } else {
                    setUserLogs([]);
                }
            } catch (err) {
                console.error("Failed to fetch user logs:", err);
                setError("Could not load user logs");
                setUserLogs([]);
            } finally {
                setLoading(false);
            }
        };

        fetchAllLogs();
    }, [token]);

    // 🔍 Filtered logs based on email search
    const filteredLogs = useMemo(() => {
        return userlogs.filter((u) =>
            u?.user?.email?.toLowerCase().includes(search.toLowerCase())
        );
    }, [userlogs, search]);

    // 🧮 Pagination
    const totalPages = Math.ceil(filteredLogs.length / usersPerPage);
    const startIndex = (currentPage - 1) * usersPerPage;
    const paginatedLogs = filteredLogs.slice(startIndex, startIndex + usersPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="p-4">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3">
                <h2 className="text-lg font-semibold text-white">Manage User Logs</h2>

                <input
                    type="text"
                    placeholder="Search by email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="px-4 py-2 rounded-lg bg-[#1a1a2e] text-white border border-purple-700/40 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full sm:w-64"
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="overflow-x-auto bg-gradient-to-br from-[#111122]/90 via-[#18182e]/80 to-[#0f0f1f]/90 border border-purple-800/40 rounded-3xl shadow-[0_0_25px_rgba(168,85,247,0.15)] backdrop-blur-2xl"
            >
                <table className="min-w-full text-sm text-gray-200 border-collapse">
                    <thead>
                        <tr className="text-purple-300 uppercase text-xs tracking-wider bg-gradient-to-r from-purple-700/30 to-indigo-700/30">
                            <th className="px-6 py-4 text-left">#</th>
                            <th className="px-6 py-4 text-left">Username</th>
                            <th className="px-6 py-4 text-left">Email</th>
                            <th className="px-6 py-4 text-left">Action</th>
                            <th className="px-6 py-4 text-left">Date & Time</th>
                            <th className="px-6 py-4 text-left"></th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td
                                    colSpan="6"
                                    className="text-center text-gray-400 py-6"
                                >
                                    Loading user logs...
                                </td>
                            </tr>
                        ) : error ? (
                            <tr>
                                <td
                                    colSpan="6"
                                    className="text-center text-red-500 py-6"
                                >
                                    {error}
                                </td>
                            </tr>
                        ) : paginatedLogs.length === 0 ? (
                            <tr>
                                <td
                                    colSpan="6"
                                    className="text-center text-gray-400 py-6"
                                >
                                    No user logs found
                                </td>
                            </tr>
                        ) : (
                            paginatedLogs.map((u, index) => (
                                <motion.tr
                                    key={u._id || index}
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.02 }}
                                    whileHover={{
                                        backgroundColor: "rgba(168,85,247,0.1)",
                                        boxShadow: "0 0 10px rgba(168,85,247,0.2)",
                                    }}
                                    className="border-t border-purple-800/20 hover:backdrop-blur-xl transition-all duration-300"
                                >
                                    <td className="px-6 py-4">{startIndex + index + 1}</td>

                                    <td className="px-6 py-4 font-semibold text-gray-100">
                                        {u?.user?.username || "—"}
                                    </td>

                                    <td className="px-6 py-4 text-gray-300">
                                        {u?.user?.email || "—"}
                                    </td>

                                    <td className="px-6 py-4 text-gray-200">
                                        {u.action || "—"}
                                    </td>

                                    <td className="px-6 py-4 text-gray-400">
                                        {(() => {
                                            const dateObj = new Date(u.createdAt);
                                            const date = dateObj.toLocaleDateString("en-GB");
                                            const time = dateObj.toLocaleTimeString("en-GB", {
                                                hour12: false,
                                            });
                                            return `${date} — ${time}`;
                                        })()}
                                    </td>

                                    <td className="px-6 py-4">
                                        <a href={`/Dashboard/update-user/${u?.user?._id}`}>
                                            <button
                                                className="px-3 py-1.5 rounded-lg bg-purple-700/30 hover:bg-purple-600/40 
                                                text-gray-100 text-xs font-medium transition-all duration-200 shadow-[0_0_10px_rgba(168,85,247,0.25)]"
                                            >
                                                View
                                            </button>
                                        </a>
                                    </td>
                                </motion.tr>
                            ))
                        )}
                    </tbody>
                </table>
            </motion.div>

            {/* Pagination controls */}
            {!loading && filteredLogs.length > usersPerPage && (
                <div className="flex justify-center items-center gap-2 mt-5">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 rounded-lg bg-[#1a1a2e] text-gray-200 hover:bg-purple-700/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        Prev
                    </button>
                    <span className="text-black text-sm">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 rounded-lg bg-[#1a1a2e] text-gray-200 hover:bg-purple-700/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default ManageUserLogs;
