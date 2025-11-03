import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import API from "../../../services/api";

const ManageAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 10;

    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const res = await API.get(`/appointment/get-all-appointments?nocache=${Date.now()}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Cache-Control": "no-cache",
                        Pragma: "no-cache",
                        Expires: "0",
                    },
                });

                if (res.data?.success && Array.isArray(res.data.result)) {
                    setAppointments(res.data.result);
                } else {
                    setAppointments([]);
                }
            } catch (err) {
                console.error("Failed to fetch appointments:", err);
                setError("Could not load appointments");
                setAppointments([]);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, [token]);

    // Stats
    const totalAppointments = appointments.length;
    const items = [
        { id: 1, name: "Total Appointments", value: totalAppointments },
    ];

    // Search filter
    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return appointments;
        return appointments.filter(
            (a) =>
                a.user?.email?.toLowerCase().includes(q) ||
                a.affiliation?.toLowerCase().includes(q) ||
                a.meetingMode?.toLowerCase().includes(q) ||
                a.status?.toLowerCase().includes(q)
        );
    }, [appointments, search]);

    useEffect(() => setCurrentPage(1), [search]);

    // Pagination
    const totalPages = Math.ceil(filtered.length / perPage);
    const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

    if (loading)
        return <div className="text-center text-fuchsia-200 mt-10 animate-pulse">Loading appointments...</div>;

    if (error)
        return <div className="text-center text-red-400 mt-10">{error}</div>;

    return (
        <div className="mt-6">
            <h2 className="text-2xl font-bold text-black mb-6">Appointment Management</h2>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {items.map((item, i) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{
                            scale: 1.05,
                            boxShadow: "0 0 25px rgba(147,51,234,0.4)",
                        }}
                        className="relative rounded-2xl p-6 border border-fuchsia-800/40 
                        bg-gradient-to-br from-[#111122]/90 via-[#18182e]/80 to-[#0f0f1f]/90 
                        shadow-[0_0_20px_rgba(147,51,234,0.15)] hover:border-fuchsia-500/60 
                        transition-all duration-300 backdrop-blur-2xl cursor-pointer"
                    >
                        <h3 className="text-lg font-semibold text-fuchsia-100 mb-1">{item.name}</h3>
                        <p className="text-fuchsia-300 text-sm font-medium tracking-wide">
                            <CountUp end={item.value} duration={2.5} /> total
                        </p>
                    </motion.div>
                ))}
            </div>

            {/* Search */}
            <div className="mb-8 flex flex-wrap items-center gap-4">
                <input
                    type="text"
                    placeholder="Search by email, affiliation, or meeting mode..."
                    className="px-4 py-2 rounded-lg bg-[#18182e] border border-fuchsia-700/50 text-fuchsia-100 placeholder-fuchsia-400/60 focus:outline-none focus:ring-2 focus:ring-fuchsia-600"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Table */}
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
                            <th className="px-6 py-4 text-left">Email</th>
                            <th className="px-6 py-4 text-left">Affiliation</th>
                            <th className="px-6 py-4 text-left">Preferred Date & Time</th>
                            <th className="px-6 py-4 text-left">Accessibility</th>
                            <th className="px-6 py-4 text-left">Meeting Mode</th>
                            <th className="px-6 py-4 text-left">Status</th>
                            <th className="px-6 py-4 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginated.length > 0 ? (
                            paginated.map((a, index) => (
                                <motion.tr
                                    key={a._id}
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.03 }}
                                    whileHover={{
                                        backgroundColor: "rgba(147,51,234,0.1)",
                                        boxShadow: "0 0 10px rgba(147,51,234,0.2)",
                                    }}
                                    className="border-t border-fuchsia-800/20 transition-all duration-300"
                                >
                                    <td className="px-6 py-4">{index + 1 + (currentPage - 1) * perPage}</td>
                                    <td className="px-6 py-4 font-semibold text-fuchsia-200">
                                        {a.user?.email || "N/A"}
                                    </td>
                                    <td className="px-6 py-4 text-fuchsia-300">{a.affiliation}</td>
                                    <td className="px-6 py-4 text-fuchsia-300">
                                        {new Date(a.preferredDate).toLocaleDateString()} – {a.preferredTime}
                                    </td>
                                    <td className="px-6 py-4 text-fuchsia-300">{a.accessibility}</td>
                                    <td className="px-6 py-4 text-fuchsia-300">{a.meetingMode}</td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`px-3 py-1 rounded-lg text-xs font-semibold ${a.status === "Pending"
                                                ? "bg-yellow-600/30 text-yellow-300"
                                                : a.status === "Approved"
                                                    ? "bg-green-600/30 text-green-300"
                                                    : "bg-red-600/30 text-red-300"
                                                }`}
                                        >
                                            {a.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <a href={`/Dashboard/update-appointment/${a._id}`}>
                                            <button
                                                className="px-3 py-1.5 rounded-lg bg-fuchsia-700/30 hover:bg-fuchsia-600/40 
                                            text-fuchsia-200 text-xs font-medium transition-all duration-200 shadow-[0_0_10px_rgba(147,51,234,0.25)]"
                                            >
                                                View
                                            </button>
                                        </a>
                                    </td>
                                </motion.tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="text-center py-6 text-fuchsia-400">
                                    No appointments found
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
                        className="px-3 py-1.5 rounded-lg bg-black disabled:opacity-50 text-fuchsia-100 text-xs"
                    >
                        Prev
                    </button>
                    <span className="px-4 py-1.5 text-black text-sm">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((p) => p + 1)}
                        className="px-3 py-1.5 rounded-lg bg-black disabled:opacity-50 text-fuchsia-100 text-xs"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default ManageAppointments;
