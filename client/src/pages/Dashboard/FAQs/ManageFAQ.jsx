import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { FaQuestionCircle } from "react-icons/fa";
import CountUp from "react-countup";
import API from "../../../services/api";
import DefaultButton from "../../../component/Buttons/DefaultButton";

const ManageFAQ = () => {
    const [faqList, setFaqList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const faqsPerPage = 10;

    useEffect(() => {
        const fetchFAQs = async () => {
            try {
                const res = await API.get(`/faq/all-faq?nocache=${Date.now()}`);
                if (res.data?.success && Array.isArray(res.data.result)) {
                    setFaqList(res.data.result);
                } else {
                    setFaqList([]);
                }
            } catch (err) {
                console.error("Failed to fetch FAQs:", err);
                setError("Could not load FAQs");
                setFaqList([]);
            } finally {
                setLoading(false);
            }
        };
        fetchFAQs();
    }, []);

    const totalFAQs = faqList.length;

    const items = [
        { id: 1, name: "Total FAQs", icon: <FaQuestionCircle />, value: totalFAQs },
    ];

    // 🔍 Filter FAQs
    const filteredFAQs = useMemo(() => {
        const query = search.trim().toLowerCase();
        if (!query) return faqList;
        return faqList.filter(
            (faq) =>
                faq.question?.toLowerCase().includes(query) ||
                faq.answer?.toLowerCase().includes(query)
        );
    }, [faqList, search]);

    useEffect(() => {
        setCurrentPage(1);
    }, [search]);

    // 📄 Pagination
    const totalPages = Math.ceil(filteredFAQs.length / faqsPerPage);
    const paginatedFAQs = filteredFAQs.slice(
        (currentPage - 1) * faqsPerPage,
        currentPage * faqsPerPage
    );

    if (loading)
        return (
            <div className="text-center text-fuchsia-200 mt-10 text-lg animate-pulse">
                Loading FAQs...
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
                FAQ Management
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
                            boxShadow: "0 0 25px rgba(147,51,234,0.4)",
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

            {/* Create Button */}
            <div className="mb-4 -mt-4">
                <a href="/Dashboard/create-faq">
                    <DefaultButton
                        type="button"
                        label="Create FAQ"
                    />
                </a>
            </div>

            {/* Search */}
            <div className="mb-8 flex flex-wrap items-center gap-4">
                <input
                    type="text"
                    placeholder="Search by question or answer..."
                    className="px-4 py-2 rounded-lg bg-[#18182e] border border-fuchsia-700/50 text-fuchsia-100 placeholder-fuchsia-400/60 focus:outline-none focus:ring-2 focus:ring-fuchsia-600"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* FAQ Table */}
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
                            <th className="px-6 py-4 text-left">Question</th>
                            <th className="px-6 py-4 text-left">Answer</th>
                            <th className="px-6 py-4 text-left">Created At</th>
                            <th className="px-6 py-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedFAQs.length > 0 ? (
                            paginatedFAQs.map((faq, index) => (
                                <motion.tr
                                    key={faq._id || index}
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.03 }}
                                    whileHover={{
                                        backgroundColor: "rgba(147,51,234,0.1)",
                                        boxShadow: "0 0 10px rgba(147,51,234,0.2)",
                                    }}
                                    className="border-t border-fuchsia-800/20 hover:backdrop-blur-xl transition-all duration-300"
                                >
                                    <td className="px-6 py-4">
                                        {index + 1 + (currentPage - 1) * faqsPerPage}
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-fuchsia-200">
                                        {faq.question}
                                    </td>
                                    <td className="px-6 py-4 text-fuchsia-300">
                                        {faq.answer}
                                    </td>
                                    <td className="px-6 py-4 text-fuchsia-400">
                                        {new Date(faq.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 flex gap-3">
                                        <a href={`/Dashboard/update-faq/${faq._id}`}>
                                            <button
                                                className="px-3 py-1.5 rounded-lg bg-purple-700/30 hover:bg-purple-600/40 
                                                text-fuchsia-200 text-xs font-medium transition-all duration-200 shadow-[0_0_10px_rgba(192,38,211,0.25)]"
                                            >
                                                Edit
                                            </button>
                                        </a>
                                    </td>
                                </motion.tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-6 text-fuchsia-400">
                                    No FAQs found
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

export default ManageFAQ;
