import React, { useState } from "react";
import { motion } from "framer-motion";
import API from "../../../services/api";
import DefaultButton from "../../../component/Buttons/DefaultButton";
import Toast from "../../../component/Toast/Toast";
import { useNavigate } from "react-router-dom";

const CreateFAQ = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem("token");

    const [formData, setFormData] = useState({
        question: "",
        answer: "",
    });
    const [loading, setLoading] = useState(false);
    const [toastData, setToastData] = useState({ show: false, success: false, message: "" });

    const showToast = (success, message) => {
        setToastData({ show: true, success, message });
        setTimeout(() => setToastData({ show: false, success: false, message: "" }), 3000);
    };

    // 🔹 Handle input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // 🔹 Handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await API.post(
                "/faq/create-faq",
                {
                    question: formData.question,
                    answer: formData.answer,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (res.data?.success) {
                showToast(true, "FAQ created successfully!");
                setTimeout(() => navigate("/Dashboard/manage-faq"), 2000);
            } else {
                showToast(false, res.data?.message || "Failed to create FAQ.");
            }
        } catch (err) {
            console.error(err);
            showToast(false, "Error creating FAQ.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-6xl mx-auto p-8 bg-gradient-to-br from-[#111122]/90 via-[#18182e]/80 to-[#0f0f1f]/90 
                       border border-fuchsia-800/40 rounded-3xl shadow-[0_0_25px_rgba(147,51,234,0.15)] backdrop-blur-2xl mt-6"
        >
            {toastData.show && (
                <Toast
                    success={toastData.success}
                    message={toastData.message}
                    onClose={() => setToastData({ ...toastData, show: false })}
                />
            )}

            <h2 className="text-3xl font-bold text-fuchsia-400 mb-6">Create New FAQ</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-fuchsia-300 mb-2 font-medium">Question</label>
                    <input
                        type="text"
                        name="question"
                        value={formData.question}
                        onChange={handleChange}
                        required
                        placeholder="Enter FAQ question"
                        className="w-full px-4 py-2 rounded-lg bg-[#18182e] border border-fuchsia-700/50 
                        text-fuchsia-100 placeholder-fuchsia-400/60 focus:outline-none focus:ring-2 
                        focus:ring-fuchsia-600 transition-all"
                    />
                </div>

                <div>
                    <label className="block text-fuchsia-300 mb-2 font-medium">Answer</label>
                    <textarea
                        name="answer"
                        value={formData.answer}
                        onChange={handleChange}
                        required
                        rows="5"
                        placeholder="Enter FAQ answer"
                        className="w-full px-4 py-2 rounded-lg bg-[#18182e] border border-fuchsia-700/50 
                        text-fuchsia-100 placeholder-fuchsia-400/60 focus:outline-none focus:ring-2 
                        focus:ring-fuchsia-600 transition-all resize-none"
                    ></textarea>
                </div>

                <div className="flex justify-between items-center pt-4">
                    <a href="/Dashboard/manage-faq">
                        <button
                            type="button"
                            className="px-4 py-2 rounded-lg bg-gray-700/40 hover:bg-gray-600/60 
                            text-fuchsia-100 text-sm font-medium transition-all duration-200"
                        >
                            Cancel
                        </button>
                    </a>
                    <DefaultButton
                        type="submit"
                        label={loading ? "Creating..." : "Create FAQ"}
                        disabled={loading}
                    />
                </div>
            </form>
        </motion.div>
    );
};

export default CreateFAQ;
