import React, { useState, useEffect, useMemo } from "react";
import { FaSearch, FaExternalLinkAlt } from "react-icons/fa";
import API from "../../../services/api";

const Resource = () => {
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    const [sortOrder, setSortOrder] = useState("latest");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    useEffect(() => {
        const fetchResources = async () => {
            try {
                const res = await API.get(`/resource/all-resource?nocache=${Date.now()}`, {
                    headers: {
                        "Cache-Control": "no-cache",
                        Pragma: "no-cache",
                        Expires: "0",
                    },
                });

                if (res.data?.success && Array.isArray(res.data.result)) {
                    setResources(res.data.result);
                } else {
                    setResources([]);
                }
            } catch (err) {
                console.error("Failed to fetch resources:", err);
                setError("Could not load resources");
                setResources([]);
            } finally {
                setLoading(false);
            }
        };

        fetchResources();
    }, []);

    // Filter + sort
    const filteredResources = useMemo(() => {
        let filtered = [...resources];

        if (search.trim()) {
            filtered = filtered.filter((r) =>
                r.title.toLowerCase().includes(search.toLowerCase())
            );
        }

        filtered.sort((a, b) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            return sortOrder === "latest" ? dateB - dateA : dateA - dateB;
        });

        return filtered;
    }, [resources, search, sortOrder]);

    // Pagination
    const totalPages = Math.ceil(filteredResources.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedResources = filteredResources.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

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
                    Our Resources
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto text-lg md:text-xl">
                    Explore valuable guides, tools, and educational content provided by our Psychological Wellbeing & Assessment Center.
                </p>
            </div>

            {/* Search & Sort */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12 px-8 md:px-16">
                <div className="relative w-full md:w-1/3">
                    <FaSearch className="absolute left-3 top-3 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search resources by title..."
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

            {/* Pagination Top */}
            {totalPages > 1 && <Pagination />}

            {/* Grid */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-8 md:px-16">
                {loading ? (
                    <p className="col-span-full text-center text-gray-600">Loading resources...</p>
                ) : filteredResources.length === 0 ? (
                    <p className="col-span-full text-center text-gray-600">No resources found.</p>
                ) : (
                    paginatedResources.map((res) => (
                        <div
                            key={res._id}
                            className="relative group bg-white/70 backdrop-blur-md rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                        >
                            <div className="p-6 text-center">
                                <h3 className="text-xl font-bold text-gray-800 mb-3 transition-colors duration-300 group-hover:text-[#560606]">
                                    {res.title}
                                </h3>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                    {res.content}
                                </p>
                                {res.link && (
                                    <a
                                        href={res.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-[#560606] font-medium hover:underline"
                                    >
                                        Visit Resource <FaExternalLinkAlt size={14} />
                                    </a>
                                )}
                              </div>
                        </div>
                    ))
                )}
            </div>

            {/* Pagination Bottom */}
            {totalPages > 1 && <Pagination />}
        </section>
    );
};

export default Resource;
