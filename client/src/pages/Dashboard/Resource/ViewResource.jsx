import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../../services/api";
import DefaultButton from "../../../component/Buttons/DefaultButton";
import Toast from "../../../component/Toast/Toast";
import { FaLink } from "react-icons/fa";

const ViewResource = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [resource, setResource] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [toastData, setToastData] = useState({ show: false, success: false, message: "" });

    const showToast = (success, message) => {
        setToastData({ show: true, success, message });
        setTimeout(() => setToastData({ show: false, success: false, message: "" }), 3000);
    };

    // 🔹 Fetch resource
    useEffect(() => {
        const fetchResource = async () => {
            try {
                const res = await API.get(`/resource/get-one-resource/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (res.data?.success && res.data.result) {
                    setResource(res.data.result);
                } else {
                    setResource(null);
                }
            } catch (err) {
                console.error(err);
                setError("Failed to load resource");
            } finally {
                setLoading(false);
            }
        };
        fetchResource();
    }, [id, token]);

    // 🔹 Delete resource
    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this resource?")) return;
        try {
            const res = await API.delete(`/resource/delete-resource/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.data?.success) {
                showToast(true, "Resource deleted successfully!");
                setTimeout(() => navigate("/Dashboard/manage-resource"), 1500);
            } else {
                showToast(false, "Failed to delete resource.");
            }
        } catch (err) {
            console.error(err);
            showToast(false, "Error deleting resource.");
        }
    };

    if (loading) return <p className="text-center text-white mt-10">Loading...</p>;
    if (error) return <p className="text-center text-red-400 mt-10">{error}</p>;
    if (!resource) return <p className="text-center text-gray-400 mt-10">No resource found</p>;

    return (
        <div>
            {/* Back Button */}
            <div>
                <a href="/Dashboard/manage-resource">
                    <DefaultButton label="Back To Manage Resources" />
                </a>
            </div>

            {/* Toast */}
            {toastData.show && (
                <Toast
                    success={toastData.success}
                    message={toastData.message}
                    onClose={() => setToastData({ ...toastData, show: false })}
                />
            )}

            {/* Resource Card */}
            <div className="max-w-5xl mx-auto mt-10 p-8 bg-gradient-to-br from-[#1c1c2e] to-[#131324] rounded-3xl shadow-lg border border-purple-700/30">
                <h1 className="text-3xl font-bold text-fuchsia-400 mb-4">{resource.title}</h1>

                <p className="text-fuchsia-200 mb-6 text-lg leading-relaxed">
                    {resource.content}
                </p>

                <div className="flex items-center gap-2 mb-6">
                    <FaLink className="text-fuchsia-400 text-xl" />
                    <a
                        href={resource.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-fuchsia-400 hover:text-fuchsia-300 underline"
                    >
                        {resource.link}
                    </a>
                </div>

                <p className="text-sm text-fuchsia-300/70">
                    Created on: {new Date(resource.createdAt).toLocaleString()}
                </p>

                {/* Delete Button */}
                <div className="mt-8 flex justify-end">
                    <button
                        onClick={handleDelete}
                        className="px-6 py-3 rounded-xl bg-red-700/30 hover:bg-red-600/40 
                        text-red-300 text-sm font-medium transition-all duration-300 
                        shadow-[0_0_15px_rgba(239,68,68,0.25)]"
                    >
                        Delete Resource
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewResource;
