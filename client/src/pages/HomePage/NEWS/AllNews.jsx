import React, { useState, useEffect, useMemo } from "react";
import { FaSearch } from "react-icons/fa";
import API from "../../../services/api";

const AllNews = () => {
    const [newsData, setAllNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    const [sortOrder, setSortOrder] = useState("latest");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const res = await API.get(`/nonauth/get-all-news?nocache=${Date.now()}`, {
                    headers: {
                        "Cache-Control": "no-cache",
                        Pragma: "no-cache",
                        Expires: "0",
                    },
                });

                if (res.data?.success && Array.isArray(res.data.result)) {
                    setAllNews(res.data.result);
                } else {
                    setAllNews([]);
                }
            } catch (err) {
                console.error("Failed to fetch news:", err);
                setError("Could not load news");
                setAllNews([]);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    // Filter + sort logic
    const filteredNews = useMemo(() => {
        let filtered = [...newsData];

        // Search filter
        if (search.trim()) {
            filtered = filtered.filter((news) =>
                news.title.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Sort
        filtered.sort((a, b) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            return sortOrder === "latest" ? dateB - dateA : dateA - dateB;
        });

        return filtered;
    }, [newsData, search, sortOrder]);

    // Pagination logic
    const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedNews = filteredNews.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    // Reset page when filters/search change
    useEffect(() => {
        setCurrentPage(1);
    }, [search, sortOrder]);

    const Pagination = () => (
        <div className="flex justify-center items-center gap-2 mt-8">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-full ${currentPage === 1
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-[#560606] text-white hover:bg-[#7a0a0a]"
                    }`}
            >
                Prev
            </button>

            {[...Array(totalPages)].map((_, index) => {
                const pageNum = index + 1;
                return (
                    <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-4 py-2 rounded-full ${pageNum === currentPage
                            ? "bg-[#560606] text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                    >
                        {pageNum}
                    </button>
                );
            })}

            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-full ${currentPage === totalPages
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-[#560606] text-white hover:bg-[#7a0a0a]"
                    }`}
            >
                Next
            </button>
        </div>
    );

    return (
        <section className="py-20 bg-gray-50 relative overflow-hidden">
            {/* Heading */}
            <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-extrabold text-[#560606] mb-4 tracking-tight">
                    Our News
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto text-lg md:text-xl">
                    Stay informed about the latest events, workshops, and updates from our Psychological Wellbeing & Assessment Center.
                </p>
            </div>

            {/* Search & Filter */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12 px-8 md:px-16">
                <div className="relative w-full md:w-1/3">
                    <FaSearch className="absolute left-3 top-3 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search by title..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full border border-gray-300 rounded-full pl-10 pr-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#560606]"
                    />
                </div>

                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="border border-gray-300 rounded-full px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#560606]"
                >
                    <option value="latest">Latest to Oldest</option>
                    <option value="oldest">Oldest to Latest</option>
                </select>
            </div>

            {/* Top Pagination */}
            {totalPages > 1 && <Pagination />}

            {/* Grid View */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-8 md:px-16">
                {loading ? (
                    <p className="col-span-full text-center text-gray-600">Loading news...</p>
                ) : filteredNews.length === 0 ? (
                    <p className="col-span-full text-center text-gray-600">No news found.</p>
                ) : (
                    paginatedNews.map((news) => (
                        <div
                            key={news._id}
                            className="relative group bg-white/70 backdrop-blur-md rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                        >
                            <div className="relative overflow-hidden">
                                <img
                                    src={`${import.meta.env.VITE_APP_API_FILES}/uploads/${news.imageUrl?.[0]}`}
                                    alt={news.title}
                                    className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute top-4 left-4 bg-[#560606] text-white text-sm font-semibold px-4 py-1 rounded-full shadow-md">
                                    {new Date(news.createdAt).toLocaleDateString()}
                                </div>
                            </div>
                            <div className="p-5 text-center">
                                <h3 className="text-xl font-bold text-gray-800 mb-2 transition-colors duration-300 group-hover:text-[#560606]">
                                    {news.title}
                                </h3>
                                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                    {news.description?.[0]}
                                </p>
                                <a
                                    href={`/view-news/${news.title}`}
                                    className="inline-block mt-3 text-[#560606] font-medium hover:underline"
                                >
                                    Read More →
                                </a>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Bottom Pagination */}
            {totalPages > 1 && <Pagination />}
        </section>
    );
};

export default AllNews;
