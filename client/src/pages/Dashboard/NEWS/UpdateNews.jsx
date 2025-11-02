import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaNewspaper, FaTrash } from "react-icons/fa";
import API from "../../../services/api";
import { useAuth } from "../../../context/AuthContext";
import { useParams } from "react-router-dom";
import DefaultButton from "../../../component/Buttons/DefaultButton";

const UpdateNews = () => {
    const { id } = useParams();
    const { auth } = useAuth();
    const [news, setNews] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleting, setDeleting] = useState(null); // track deleting image index
    const token = localStorage.getItem("token");

    // Fetch news
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const res = await API.get(`/news/get-one-news/${id}?nocache=${Date.now()}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Cache-Control": "no-cache",
                        Pragma: "no-cache",
                        Expires: "0",
                    },
                });

                if (res.data?.success && res.data.result) {
                    setNews(res.data.result);
                } else {
                    setNews(null);
                }
            } catch (err) {
                console.error("Failed to fetch news:", err);
                setError("Could not load news");
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, [token, id]);

    // Delete image
    const handleDeleteImage = async (imgName, index) => {
        if (!window.confirm("Are you sure you want to delete this image?")) return;

        try {
            setDeleting(index);
            await API.delete(`/news/delete-image-news/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
                data: { image: imgName }, // must match your backend controller
            });

            // Remove image from local state immediately
            setNews((prev) => ({
                ...prev,
                imageUrl: prev.imageUrl.filter((_, i) => i !== index),
            }));
        } catch (err) {
            console.error("Failed to delete image:", err);
            alert("Failed to delete image. Try again.");
        } finally {
            setDeleting(null);
        }
    };

    if (loading) return <p className="text-center text-white">Loading...</p>;
    if (error) return <p className="text-center text-red-400">{error}</p>;
    if (!news) return <p className="text-center text-gray-400">No news found</p>;

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

            {/* News Card */}
            <motion.div
                initial={{ scale: 0.97, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative overflow-hidden rounded-3xl border border-purple-700/40 bg-gradient-to-br from-[#131324]/80 to-[#1c1c30]/90 backdrop-blur-xl p-8 shadow-[0_0_40px_rgba(147,51,234,0.2)] max-w-8xl w-full mx-auto"
            >
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-700/10 to-transparent blur-2xl" />
                </div>

                <div className="relative z-10 flex flex-col gap-6">
                    {/* Header */}
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-fuchsia-600/20 rounded-full border border-fuchsia-700/40 shadow-[0_0_15px_rgba(217,70,239,0.3)]">
                            <FaNewspaper className="text-fuchsia-400 text-2xl" />
                        </div>
                        <h1 className="text-3xl font-bold text-fuchsia-100 tracking-wide">
                            {news?.title}
                        </h1>
                    </div>

                    {/* Image Grid */}
                    {news?.imageUrl?.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                            {news.imageUrl.map((img, i) => (
                                <motion.div key={i} className="relative group">
                                    <img
                                        src={`${import.meta.env.VITE_APP_API_FILES}/uploads/${img}`}
                                        alt={`News ${i + 1}`}
                                        className="rounded-xl border border-purple-700/40 shadow-[0_0_20px_rgba(147,51,234,0.25)] object-cover w-full h-40"
                                    />
                                    {/* Delete Button */}
                                    <button
                                        onClick={() => handleDeleteImage(img, i)}
                                        disabled={deleting === i}
                                        className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md hover:bg-red-700"
                                    >
                                        {deleting === i ? "..." : <FaTrash />}
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {/* Description */}
                    <div className="mt-6 flex flex-col gap-4 text-gray-300 leading-relaxed">
                        {news?.description?.map((desc, i) => (
                            <p key={i} className="text-base">{desc}</p>
                        ))}
                    </div>

                    {/* Meta */}
                    <div className="mt-6 flex flex-wrap items-center justify-between text-sm text-gray-400 border-t border-purple-700/30 pt-4">
                        <span>Author: <span className="text-fuchsia-400">{auth?.user?.username || "Unknown"}</span></span>
                        <span>Published: {new Date(news.createdAt).toLocaleDateString()}</span>
                    </div>

                    {/* Update Button */}
                    <div className="mt-8 flex justify-end">
                        <DefaultButton
                            title="Update News"
                            icon={<FaNewspaper />}
                            className="bg-gradient-to-r from-fuchsia-600 to-purple-700 text-white px-6 py-3 rounded-xl shadow-[0_0_20px_rgba(217,70,239,0.4)] hover:shadow-[0_0_30px_rgba(217,70,239,0.6)] transition-all duration-300"
                        />
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default UpdateNews;
