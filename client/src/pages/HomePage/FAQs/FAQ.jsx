import React, { useEffect, useState, useMemo } from "react";
import { FaSearch, FaChevronDown, FaChevronUp, FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import API from "../../../services/api";

const FAQ = () => {
    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    const [openIndex, setOpenIndex] = useState(null);
    const [sortOrder, setSortOrder] = useState("desc"); // "desc" = latest first

    useEffect(() => {
        const fetchFaqs = async () => {
            try {
                const res = await API.get(`/faq/all-faq?nocache=${Date.now()}`, {
                    headers: {
                        "Cache-Control": "no-cache",
                        Pragma: "no-cache",
                        Expires: "0",
                    },
                });

                if (res.data?.success && Array.isArray(res.data.result)) {
                    setFaqs(res.data.result);
                } else {
                    setFaqs([]);
                }
            } catch (err) {
                console.error("Failed to fetch FAQs:", err);
                setError("Failed to load FAQs.");
                setFaqs([]);
            } finally {
                setLoading(false);
            }
        };

        fetchFaqs();
    }, []);

    // Sort FAQs
    const sortedFaqs = useMemo(() => {
        const sorted = [...faqs].sort((a, b) => {
            const dateA = new Date(a.createdAt || a.date || 0);
            const dateB = new Date(b.createdAt || b.date || 0);
            return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
        });
        return sorted;
    }, [faqs, sortOrder]);

    // Filter by search
    const filteredFaqs = useMemo(() => {
        if (!search.trim()) return sortedFaqs;
        return sortedFaqs.filter((faq) =>
            faq.question.toLowerCase().includes(search.toLowerCase())
        );
    }, [sortedFaqs, search]);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-20 bg-gray-50">
            {/* Header */}
            <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-extrabold text-[#560606] mb-4 tracking-tight">
                    Frequently Asked Questions
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto text-lg md:text-xl">
                    Browse answers to common questions or search by topic.
                </p>
            </div>

            {/* Search + Sort Controls */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-10 px-6">
                {/* Search */}
                <div className="relative w-full md:w-1/2">
                    <FaSearch className="absolute left-3 top-3 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search FAQs by question..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full border border-gray-300 rounded-full pl-10 pr-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#560606]"
                    />
                </div>

                {/* Sort Button */}
                <button
                    onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
                    className="flex items-center gap-2 bg-[#560606] text-white px-5 py-2 rounded-full hover:bg-[#3d0303] transition-all"
                >
                    {sortOrder === "desc" ? <FaSortAmountDown /> : <FaSortAmountUp />}
                    {sortOrder === "desc" ? "Latest → Oldest" : "Oldest → Latest"}
                </button>
            </div>

            {/* FAQs Grid */}
            <div className="max-w-7xl mx-auto px-6">
                {loading ? (
                    <p className="text-center text-gray-600">Loading FAQs...</p>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : filteredFaqs.length === 0 ? (
                    <p className="text-center text-gray-600">No FAQs found.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredFaqs.map((faq, index) => (
                            <div
                                key={faq._id || index}
                                className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                            >
                                <button
                                    className="w-full flex justify-between items-center text-left px-6 py-4 text-gray-800 font-semibold hover:bg-gray-100 transition-colors"
                                    onClick={() => toggleFAQ(index)}
                                >
                                    <span className="line-clamp-2">{faq.question}</span>
                                    {openIndex === index ? (
                                        <FaChevronUp className="text-[#560606]" />
                                    ) : (
                                        <FaChevronDown className="text-gray-500" />
                                    )}
                                </button>

                                <div
                                    className={`px-6 transition-all duration-300 overflow-hidden ${openIndex === index ? "max-h-96 py-3" : "max-h-0"
                                        }`}
                                >
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default FAQ;
