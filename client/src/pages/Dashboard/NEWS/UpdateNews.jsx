import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaNewspaper, FaTrash, FaSave, FaUpload } from "react-icons/fa";
import API from "../../../services/api";
import { useAuth } from "../../../context/AuthContext";
import { useParams } from "react-router-dom";
import DefaultButton from "../../../component/Buttons/DefaultButton";
import Toast from "../../../component/Toast/Toast";

const UpdateNews = () => {
    const { id } = useParams();
    const { auth } = useAuth();
    const [news, setNews] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deletingImage, setDeletingImage] = useState(null);
    const [deletingDesc, setDeletingDesc] = useState(null);
    const [editingDesc, setEditingDesc] = useState("");
    const [savingDesc, setSavingDesc] = useState(false);
    const [uploadingImages, setUploadingImages] = useState(false);
    const [newImages, setNewImages] = useState([]);
    const [toastData, setToastData] = useState({ show: false, success: false, message: "" });
    const [confirmAction, setConfirmAction] = useState(null); // holds deletion callback
    const token = localStorage.getItem("token");

    const showToast = (success, message) => {
        setToastData({ show: true, success, message });
        setTimeout(() => setToastData({ show: false, success: false, message: "" }), 3000);
    };

    // Fetch news
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const res = await API.get(`/news/get-one-news/${id}?nocache=${Date.now()}`, {
                    headers: { Authorization: `Bearer ${token}` },
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
            setDeletingImage(index);
            await API.delete(`/news/delete-image-news/${id}`, {
                headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
                data: { image: imgName },
            });
            setNews((prev) => ({
                ...prev,
                imageUrl: prev.imageUrl.filter((_, i) => i !== index),
            }));
        } catch (err) {
            console.error("Failed to delete image:", err);
            alert("Failed to delete image. Try again.");
        } finally {
            setDeletingImage(null);
        }
    };

    // Delete description
    const handleDeleteDescription = async (desc, index) => {
        if (!window.confirm("Are you sure you want to delete this description?")) return;

        try {
            setDeletingDesc(index);
            await API.delete(`/news/delete-news-desc/${id}`, {
                headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
                data: { description: desc },
            });
            setNews((prev) => ({
                ...prev,
                description: prev.description.filter((_, i) => i !== index),
            }));
        } catch (err) {
            console.error("Failed to delete description:", err);
            alert("Failed to delete description. Try again.");
        } finally {
            setDeletingDesc(null);
        }
    };


    // Save new description
    const handleSaveDescription = async () => {
        if (!editingDesc.trim()) return showToast(false, "Description cannot be empty");
        try {
            setSavingDesc(true);
            await API.post(`/news/update-news-desc/${id}`,
                { description: editingDesc },
                { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
            );
            setNews((prev) => ({
                ...prev,
                description: [...prev.description, editingDesc],
            }));
            setEditingDesc("");
            showToast(true, "Description updated successfully!");
        } catch (err) {
            console.error("Failed to update description:", err);
            showToast(false, "Failed to update description. Try again.");
        } finally {
            setSavingDesc(false);
        }
    };

    // Upload new images
    const handleAddImages = async () => {
        if (newImages.length === 0) return showToast(false, "Select images to upload");
        try {
            setUploadingImages(true);
            const formData = new FormData();
            newImages.forEach((file) => formData.append("imageUrl", file));

            const res = await API.post(`/news/add-images-news/${id}`, formData, {
                headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
            });

            if (res.data?.success) {
                const uploadedFilenames = res.data.result?.addedImages || [];
                setNews((prev) => ({
                    ...prev,
                    imageUrl: [...prev.imageUrl, ...uploadedFilenames],
                }));
                setNewImages([]);
                showToast(true, "Images uploaded successfully!");
                setTimeout(() => window.location.reload(), 2000);
            }
        } catch (err) {
            console.error("Failed to upload images:", err);
            showToast(false, "Failed to upload images. Try again.");
        } finally {
            setUploadingImages(false);
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
            {/* Toast */}
            {toastData.show && (
                <div className="fixed top-5 right-5 z-50">
                    <Toast
                        success={toastData.success}
                        message={toastData.message}
                        onClose={() => setToastData({ ...toastData, show: false })}
                        onConfirm={confirmAction}
                    />
                </div>
            )}

            {/* Background Glow */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-600/10 via-purple-700/10 to-transparent blur-3xl" />
            </div>

            {/* News Card */}
            <motion.div
                initial={{ scale: 0.97, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative overflow-hidden rounded-3xl border border-purple-700/40 bg-gradient-to-br from-[#131324]/80 to-[#1c1c30]/90 backdrop-blur-xl p-8 shadow-[0_0_40px_rgba(147,51,234,0.2)] w-full"
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
                                    <button
                                        onClick={() => handleDeleteImage(img, i)}
                                        disabled={deletingImage === i}
                                        className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md hover:bg-red-700"
                                    >
                                        {deletingImage === i ? "..." : <FaTrash />}
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {/* Upload New Images */}
                    <div className="mt-4 flex flex-col sm:flex-row gap-2 items-center">
                        <input
                            type="file"
                            multiple
                            onChange={(e) => setNewImages([...e.target.files])}
                            className="px-4 py-2 rounded-lg bg-[#1b1b2d]/80 border border-purple-700/40 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                        />
                        <DefaultButton
                            label="Upload"
                            onClick={handleAddImages}
                            disabled={uploadingImages}
                            className="flex items-center gap-2 bg-gradient-to-r from-fuchsia-600 to-purple-700 text-white px-4 py-2 rounded-xl shadow-[0_0_15px_rgba(217,70,239,0.3)] hover:shadow-[0_0_25px_rgba(217,70,239,0.5)] transition-all duration-300"
                            icon={<FaUpload />}
                        />
                    </div>

                    {/* Description */}
                    <div className="mt-6 flex flex-col gap-4 text-gray-300 leading-relaxed">
                        {news?.description?.map((desc, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <p className="text-base flex-1">{desc}</p>
                                <button
                                    onClick={() => handleDeleteDescription(desc, i)}
                                    disabled={deletingDesc === i}
                                    className="p-1 bg-red-600 text-white rounded-full shadow-md hover:bg-red-700"
                                >
                                    {deletingDesc === i ? "..." : <FaTrash />}
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Add New Description */}
                    <div className="mt-4 flex flex-col sm:flex-row gap-2">
                        <input
                            type="text"
                            value={editingDesc}
                            onChange={(e) => setEditingDesc(e.target.value)}
                            placeholder="Add new description..."
                            className="flex-1 px-4 py-2 rounded-lg bg-[#1b1b2d]/80 border border-purple-700/40 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                        />
                        <DefaultButton
                            label="Save"
                            onClick={handleSaveDescription}
                            disabled={savingDesc}
                            className="bg-gradient-to-r from-fuchsia-600 to-purple-700 text-white px-4 py-2 rounded-xl shadow-[0_0_15px_rgba(217,70,239,0.3)] hover:shadow-[0_0_25px_rgba(217,70,239,0.5)] transition-all duration-300"
                        />
                    </div>

                    {/* Meta */}
                    <div className="mt-6 flex flex-wrap items-center justify-between text-sm text-gray-400 border-t border-purple-700/30 pt-4">
                        <span>Author: <span className="text-fuchsia-400">{auth?.user?.username || "Unknown"}</span></span>
                        <span>Published: {new Date(news.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default UpdateNews;
