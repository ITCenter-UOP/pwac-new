import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaPlus, FaTimes, FaUpload, FaNewspaper } from "react-icons/fa";
import Toast from "../../../component/Toast/Toast";
import API from "../../../services/api";
import { useNavigate } from "react-router-dom";

const CreateNews = () => {
    const navigate = useNavigate()
    const [toastData, setToastData] = useState({ show: false, success: false, message: "" });
    const [title, setTitle] = useState("");
    const [descriptions, setDescriptions] = useState([""]);
    const [images, setImages] = useState([null]);
    const token = localStorage.getItem("token");

    const showToast = (success, message) => {
        setToastData({ show: true, success, message });
        setTimeout(() => setToastData({ show: false, success: false, message: "" }), 3000);
    };

    const handleAddDescription = () => setDescriptions([...descriptions, ""]);
    const handleRemoveDescription = (i) => setDescriptions(descriptions.filter((_, idx) => idx !== i));
    const handleDescriptionChange = (i, v) => {
        const copy = [...descriptions];
        copy[i] = v;
        setDescriptions(copy);
    };

    const handleAddImage = () => setImages([...images, null]);
    const handleRemoveImage = (i) => setImages(images.filter((_, idx) => idx !== i));
    const handleFileChange = (i, f) => {
        const copy = [...images];
        copy[i] = f;
        setImages(copy);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("title", title);
            descriptions.forEach((d) => formData.append("desc", d));
            images.forEach((img) => img && formData.append("imageUrl", img));

            const res = await API.post(`/news/create-news?nocache=${Date.now()}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.data?.success) {
                showToast(true, res.data.message || "News created successfully!");
                setTimeout(() => navigate('/Dashboard/manage-news'), 1000);
            } else {
                showToast(false, res.data?.message || "Failed to create news.");
            }
        } catch (err) {
            console.error("Error creating news:", err);
            showToast(false, "Something went wrong while creating news.");
        }
    };

    return (
        <div className="p-10 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100 shadow-[0_8px_40px_rgba(0,0,0,0.08)] p-10 border border-gray-200"
            >
                <div className="flex items-center gap-3 mb-10">
                    <div className="p-3 rounded-2xl bg-gradient-to-r from-pink-600 to-purple-600 shadow-md">
                        <FaNewspaper className="text-white text-2xl" />
                    </div>
                    <h2 className="text-3xl font-semibold text-gray-800 tracking-tight">
                        Create News
                    </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-10">
                    {/* Title */}
                    <div>
                        <label className="block text-base font-medium text-gray-700 mb-2">
                            News Title
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter the news title..."
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-800 
                            placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all"
                        />
                    </div>

                    {/* Descriptions */}
                    <div className="space-y-5">
                        <h3 className="text-lg font-medium text-gray-700">Descriptions</h3>
                        {descriptions.map((desc, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="relative bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all"
                            >
                                <textarea
                                    rows="4"
                                    value={desc}
                                    onChange={(e) => handleDescriptionChange(i, e.target.value)}
                                    placeholder="Write your paragraph..."
                                    className="w-full resize-none px-4 py-3 rounded-xl border border-gray-300 text-gray-800 
                                    placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                                />
                                {descriptions.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveDescription(i)}
                                        className="absolute top-3 right-3 text-red-500 hover:text-red-600 transition-all"
                                    >
                                        <FaTimes />
                                    </button>
                                )}
                            </motion.div>
                        ))}
                        <button
                            type="button"
                            onClick={handleAddDescription}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl text-white bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 
                            shadow-md transition-all"
                        >
                            <FaPlus /> Add Paragraph
                        </button>
                    </div>

                    {/* Images */}
                    <div className="space-y-5">
                        <h3 className="text-lg font-medium text-gray-700">Images</h3>
                        {images.map((img, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="relative bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all"
                            >
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleFileChange(i, e.target.files[0])}
                                    className="block w-full text-gray-800 bg-white border border-gray-300 rounded-lg cursor-pointer
                                    focus:ring-2 focus:ring-pink-500 transition-all"
                                />
                                {images.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveImage(i)}
                                        className="absolute top-3 right-3 text-red-500 hover:text-red-600 transition-all"
                                    >
                                        <FaTimes />
                                    </button>
                                )}
                            </motion.div>
                        ))}
                        <button
                            type="button"
                            onClick={handleAddImage}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl text-white bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 
                            shadow-md transition-all"
                        >
                            <FaUpload /> Add Image
                        </button>
                    </div>

                    {/* Submit */}
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        type="submit"
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 
                        text-white font-semibold text-lg shadow-lg transition-all"
                    >
                        Publish News
                    </motion.button>
                </form>

                {toastData.show && (
                    <Toast success={toastData.success} message={toastData.message} />
                )}
            </motion.div>
        </div>
    );
};

export default CreateNews;
