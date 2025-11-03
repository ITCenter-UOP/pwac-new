import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../../../services/api";
import DefaultButton from "../../../component/Buttons/DefaultButton";
import Toast from "../../../component/Toast/Toast";

const UpdateFAQ = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [faq, setFaq] = useState({ question: "", answer: "" });
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [toastData, setToastData] = useState({ show: false, success: false, message: "" });

    const showToast = (success, message) => {
        setToastData({ show: true, success, message });
        setTimeout(() => setToastData({ show: false, success: false, message: "" }), 3000);
    };

    // 🔹 Fetch FAQ by ID
    useEffect(() => {
        const fetchFAQ = async () => {
            try {
                const res = await API.get(`/faq/all-faq`);
                if (res.data?.success && Array.isArray(res.data.result)) {
                    const found = res.data.result.find((item) => item._id === id);
                    if (found) setFaq(found);
                }
            } catch (err) {
                console.error("Failed to load FAQ:", err);
                showToast(false, "Failed to load FAQ data.");
            } finally {
                setLoading(false);
            }
        };
        fetchFAQ();
    }, [id]);

    // 🔹 Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFaq((prev) => ({ ...prev, [name]: value }));
    };

    // 🔹 Submit update
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const res = await API.post(
                `/faq/update-faq/${id}`,
                {
                    answer: faq.answer, // only update answer
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (res.data?.success) {
                showToast(true, "FAQ updated successfully!");
                setTimeout(() => navigate("/Dashboard/manage-faq"), 2000);
            } else {
                showToast(false, res.data?.message || "Failed to update FAQ.");
            }
        } catch (err) {
            console.error(err);
            showToast(false, "Update failed.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading)
        return (
            <div className="text-center text-fuchsia-200 mt-10 text-lg animate-pulse">
                Loading FAQ...
            </div>
        );

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

            <h2 className="text-3xl font-bold text-fuchsia-400 mb-6">Update FAQ</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-fuchsia-300 mb-2 font-medium">Question (Primary)</label>
                    <input
                        type="text"
                        name="question"
                        value={faq.question}
                        readOnly
                        className="w-full px-4 py-2 rounded-lg bg-[#1a1a2e]/60 border border-fuchsia-700/50 
                        text-fuchsia-300 cursor-not-allowed focus:outline-none"
                    />
                </div>

                <div>
                    <label className="block text-fuchsia-300 mb-2 font-medium">Answer</label>
                    <textarea
                        name="answer"
                        value={faq.answer}
                        onChange={handleChange}
                        required
                        rows="5"
                        className="w-full px-4 py-2 rounded-lg bg-[#18182e] border border-fuchsia-700/50 
                        text-fuchsia-100 placeholder-fuchsia-400/60 focus:outline-none focus:ring-2 
                        focus:ring-fuchsia-600 transition-all resize-none"
                        placeholder="Enter new FAQ answer"
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
                        label={submitting ? "Updating..." : "Update FAQ"}
                        disabled={submitting}
                    />
                </div>
            </form>
        </motion.div>
    );
};

export default UpdateFAQ;
