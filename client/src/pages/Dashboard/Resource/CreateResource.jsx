import React, { useState } from "react";
import API from "../../../services/api";
import DefaultButton from "../../../component/Buttons/DefaultButton";
import Toast from "../../../component/Toast/Toast";
import useForm from "../../../hooks/useForm";
import { useNavigate } from "react-router-dom";

const CreateResource = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem("token");

    const { values, handleChange } = useForm({
        title: "",
        content: "",
        link: "",
    });

    const [toastData, setToastData] = useState({
        show: false,
        success: false,
        message: "",
    });

    const showToast = (success, message) => {
        setToastData({ show: true, success, message });
        setTimeout(() => setToastData({ show: false, success: false, message: "" }), 3000);
    };

    const handleCreateResource = async () => {
        try {
            const res = await API.post(
                "/resource/create-resource",
                {
                    title: values.title,
                    content: values.content,
                    link: values.link,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (res.data?.success) {
                showToast(true, "Resource created successfully!");
                setTimeout(() => navigate('/Dashboard/manage-resource'), 2000);
            } else {
                showToast(false, "Failed to create resource.");
            }
        } catch (err) {
            console.error(err);
            showToast(false, "Error creating resource.");
        }
    };

    return (
        <div className="">
            <div className="">
                <a href="/Dashboard/manage-resource">
                    <DefaultButton label="Back To Manage Resources" />
                </a>
            </div>

            <div className="max-w-6xl mx-auto mt-10 p-8 bg-gradient-to-br from-[#1c1c2e] to-[#131324] rounded-3xl shadow-lg border border-purple-700/30">
                {toastData.show && (
                    <Toast
                        success={toastData.success}
                        message={toastData.message}
                        onClose={() => setToastData({ ...toastData, show: false })}
                    />
                )}

                <h1 className="text-3xl font-bold text-fuchsia-400 mb-6">Create New Resource</h1>

                <div className="flex flex-col gap-4">
                    <input
                        type="text"
                        name="title"
                        value={values.title}
                        onChange={handleChange}
                        placeholder="Resource Title"
                        className="px-4 py-3 rounded-lg bg-[#1b1b2d]/90 border border-purple-700/40 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                    />
                    <textarea
                        name="content"
                        value={values.content}
                        onChange={handleChange}
                        placeholder="Resource Content"
                        rows="6"
                        className="px-4 py-3 rounded-lg bg-[#1b1b2d]/90 border border-purple-700/40 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                    />
                    <input
                        type="text"
                        name="link"
                        value={values.link}
                        onChange={handleChange}
                        placeholder="External Resource Link (optional)"
                        className="px-4 py-3 rounded-lg bg-[#1b1b2d]/90 border border-purple-700/40 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                    />
                </div>

                <DefaultButton
                    label="Create Resource"
                    onClick={handleCreateResource}
                    className="mt-6 w-full bg-gradient-to-r from-fuchsia-600 to-purple-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                />
            </div>
        </div>
    );
};

export default CreateResource;
