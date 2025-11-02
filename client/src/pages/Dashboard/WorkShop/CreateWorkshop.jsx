import React, { useState } from "react";
import API from "../../../services/api";
import DefaultButton from "../../../component/Buttons/DefaultButton";
import Toast from "../../../component/Toast/Toast";
import { useNavigate } from "react-router-dom";

const CreateWorkshop = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem("token");

    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [description, setDescription] = useState("");
    const [registrationLink, setRegistrationLink] = useState("");
    const [imageFile, setImageFile] = useState(null);

    const [loading, setLoading] = useState(false);
    const [toastData, setToastData] = useState({ show: false, success: false, message: "" });

    const showToast = (success, message) => {
        setToastData({ show: true, success, message });
        setTimeout(() => setToastData({ show: false, success: false, message: "" }), 3000);
    };

    const handleCreateWorkshop = async () => {
        if (!title.trim() || !date || !time) return showToast(false, "Title, date, and time are required");

        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("title", title);
            formData.append("subtitle", subtitle);
            formData.append("date", date);
            formData.append("time", time);
            formData.append("description", description);
            formData.append("registrationLink", registrationLink);
            if (imageFile) formData.append("image", imageFile);

            const res = await API.post("/workshop/create-workshop", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            if (res.data?.success) {
                showToast(true, "Workshop created successfully!");
                setTimeout(() => navigate('/Dashboard/manage-workshop'), 2000);
            } else {
                showToast(false, res.data?.message || "Failed to create workshop");
            }
        } catch (err) {
            console.error(err);
            showToast(false, err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="">
            <div className="">
                <a href="/Dashboard/manage-workshop">
                    <DefaultButton
                        label="Back To Manage Workshops"
                    />
                </a>

            </div>
            <div className="max-w-6xl mx-auto mt-10 p-8 bg-gradient-to-br from-[#1c1c2e] to-[#131324] rounded-3xl shadow-lg border border-purple-700/30 flex flex-col gap-4">
                {toastData.show && (
                    <Toast
                        success={toastData.success}
                        message={toastData.message}
                        onClose={() => setToastData({ ...toastData, show: false })}
                    />
                )}

                <h1 className="text-3xl font-bold text-fuchsia-400 mb-4">Create Workshop</h1>

                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    className="px-4 py-3 rounded-lg bg-[#1b1b2d]/90 border border-purple-700/40 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                />
                <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="Subtitle"
                    className="px-4 py-3 rounded-lg bg-[#1b1b2d]/90 border border-purple-700/40 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                />
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="px-4 py-3 rounded-lg bg-[#1b1b2d]/90 border border-purple-700/40 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                />
                <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="px-4 py-3 rounded-lg bg-[#1b1b2d]/90 border border-purple-700/40 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    rows={4}
                    className="px-4 py-3 rounded-lg bg-[#1b1b2d]/90 border border-purple-700/40 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                />
                <input
                    type="text"
                    value={registrationLink}
                    onChange={(e) => setRegistrationLink(e.target.value)}
                    placeholder="Registration Link"
                    className="px-4 py-3 rounded-lg bg-[#1b1b2d]/90 border border-purple-700/40 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                />
                <input
                    type="file"
                    onChange={(e) => setImageFile(e.target.files[0])}
                    className="px-4 py-3 rounded-lg bg-[#1b1b2d]/90 border border-purple-700/40 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                />

                <DefaultButton
                    label={loading ? "Creating..." : "Create Workshop"}
                    onClick={handleCreateWorkshop}
                    disabled={loading}
                    className="mt-4 w-full bg-gradient-to-r from-fuchsia-600 to-purple-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                />
            </div>
        </div>
    );
};

export default CreateWorkshop;
