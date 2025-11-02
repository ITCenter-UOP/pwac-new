import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../../services/api";
import DefaultButton from "../../../component/Buttons/DefaultButton";
import Toast from "../../../component/Toast/Toast";

const UpdateWorkshop = () => {
    const { id } = useParams();
    const token = localStorage.getItem("token");

    const [workshop, setWorkshop] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [subtitle, setSubtitle] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [registrationLink, setRegistrationLink] = useState("");
    const [imageFile, setImageFile] = useState(null);

    const [toastData, setToastData] = useState({ show: false, success: false, message: "" });

    const showToast = (success, message) => {
        setToastData({ show: true, success, message });
        setTimeout(() => setToastData({ show: false, success: false, message: "" }), 3000);
    };

    useEffect(() => {
        const fetchWorkshop = async () => {
            try {
                const res = await API.get(`/workshop/get-one-workshop/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (res.data?.success && res.data.result) {
                    const ws = res.data.result;
                    setWorkshop(ws);
                    setSubtitle(ws.subtitle || "");
                    setDate(ws.date ? ws.date.split("T")[0] : "");
                    setTime(ws.time || "");
                    setRegistrationLink(ws.registrationLink || "");
                } else {
                    setWorkshop(null);
                }
            } catch (err) {
                console.error(err);
                setError("Failed to load workshop");
            } finally {
                setLoading(false);
            }
        };
        fetchWorkshop();
    }, [id, token]);

    const handleSaveWorkshop = async () => {
        try {
            const formData = new FormData();
            formData.append("workshopId", id);
            formData.append("subtitle", subtitle);
            formData.append("date", date);
            formData.append("time", time);
            formData.append("registrationLink", registrationLink);
            if (imageFile) formData.append("image", imageFile);

            const res = await API.put("/workshop/update-workshop", formData, {
                headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
            });

            if (res.data?.success) {
                showToast(true, "Workshop updated successfully!");
                setTimeout(() => window.location.reload(), 2000);
            } else {
                showToast(false, "Failed to update workshop.");
            }
        } catch (err) {
            console.error(err);
            showToast(false, "Failed to update workshop.");
        }
    };

    if (loading) return <p className="text-center text-white mt-10">Loading...</p>;
    if (error) return <p className="text-center text-red-400 mt-10">{error}</p>;
    if (!workshop) return <p className="text-center text-gray-400 mt-10">No workshop found</p>;

    return (
        <div className="">
            <div className="">
                <a href="/Dashboard/manage-workshop">
                    <DefaultButton 
                        label="Back To Manage Workshops"
                    />
                </a>
            </div>
            <div className="max-w-8xl mx-auto mt-10 p-8 bg-gradient-to-br from-[#1c1c2e] to-[#131324] rounded-3xl shadow-lg border border-purple-700/30">
                {toastData.show && (
                    <Toast
                        success={toastData.success}
                        message={toastData.message}
                        onClose={() => setToastData({ ...toastData, show: false })}
                    />
                )}

                <h1 className="text-3xl font-bold text-fuchsia-400 mb-6">{workshop.title}</h1>

                {/* Workshop Image */}
                {workshop.image && (
                    <img
                        src={`${import.meta.env.VITE_APP_API_FILES}/uploads/${workshop.image}`}
                        alt="Workshop"
                        className="w-full h-48 object-cover rounded-xl mb-6 border border-purple-700/40 shadow-lg"
                    />
                )}

                <div className="flex flex-col gap-4">
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
                </div>

                <DefaultButton
                    label="Save Workshop"
                    onClick={handleSaveWorkshop}
                    className="mt-6 w-full bg-gradient-to-r from-fuchsia-600 to-purple-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                />
            </div>
        </div>
    );
};

export default UpdateWorkshop;
