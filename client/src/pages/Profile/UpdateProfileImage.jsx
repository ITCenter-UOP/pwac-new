import React, { useState } from "react";
import API from "../../services/api";
import FileInput from "../../component/Form/FileInput";
import DefaultButton from "../../component/Buttons/DefaultButton";
import useForm from "../../hooks/useForm";
import Toast from "../../component/Toast/Toast";
import { motion } from "framer-motion";
import { FaCloudUploadAlt } from "react-icons/fa";

const UpdateProfileImage = () => {
    const token = localStorage.getItem("token");
    const { values, handleChange } = useForm({
        profileImage: null,
    });

    const [toastData, setToastData] = useState({
        show: false,
        success: false,
        message: "",
    });
    const [isUploading, setIsUploading] = useState(false);

    const showToast = (success, message) => {
        setToastData({ show: true, success, message });
        setTimeout(
            () => setToastData({ show: false, success: false, message: "" }),
            3000
        );
    };

    const handleImageSubmit = async (e) => {
        e.preventDefault();
        if (!values.profileImage) {
            showToast(false, "Please select an image first.");
            return;
        }

        setIsUploading(true);
        try {
            const data = new FormData();
            data.append("profileImage", values.profileImage);

            const res = await API.post(
                `/member/update-profile-image?nocache=${Date.now()}`,
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (res.data.success === true) {
                showToast(true, res.data.message );
                setTimeout(() => window.location.reload(), 1000);
            } else {
                showToast(false, res.data.error || "Upload failed. Try again.");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            showToast(
                false,
                error.response?.data?.message ||
                "Something went wrong while updating your profile image."
            );
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative bg-gradient-to-br from-[#1b1b2d]/80 to-[#2a1b36]/80 border border-purple-700/40 rounded-3xl p-6 shadow-[0_0_25px_rgba(147,51,234,0.25)] backdrop-blur-xl"
        >
            {/* Toast */}
            {toastData.show && (
                <div className="fixed top-5 right-5 z-50">
                    <Toast
                        success={toastData.success}
                        message={toastData.message}
                        onClose={() => setToastData({ ...toastData, show: false })}
                    />
                </div>
            )}

            {/* Header */}
            <div className="flex items-center gap-3 mb-5">
                <div className="p-3 rounded-xl bg-gradient-to-br from-fuchsia-600 to-purple-700 shadow-[0_0_15px_rgba(217,70,239,0.4)]">
                    <FaCloudUploadAlt className="text-white text-xl" />
                </div>
                <h1 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-300">
                    Update Profile Image
                </h1>
            </div>

            {/* Upload Form */}
            <form onSubmit={handleImageSubmit} className="space-y-4">
                <div className="border-2 border-dashed border-purple-600/40 rounded-2xl p-6 bg-purple-950/10 hover:bg-purple-900/20 transition-all duration-300 flex flex-col items-center justify-center text-center">
                    <FaCloudUploadAlt className="text-fuchsia-500 text-5xl mb-3" />
                    <p className="text-sm text-purple-300 mb-3">
                        Drag and drop or click below to upload your profile image
                    </p>
                    <FileInput
                        label="Choose Image"
                        name="profileImage"
                        onChange={(e) =>
                            handleChange({
                                target: { name: "profileImage", value: e.target.files[0] },
                            })
                        }
                        accept="image/*"
                        required
                    />
                </div>

                <motion.div whileTap={{ scale: 0.97 }}>
                    <DefaultButton
                        type="submit"
                        disabled={isUploading}
                        label={isUploading ? "Uploading..." : "Update Image"}
                        className={`w-full mt-4 py-3 font-semibold text-white rounded-xl bg-gradient-to-r from-fuchsia-600 to-purple-600 shadow-[0_0_15px_rgba(217,70,239,0.4)] hover:shadow-[0_0_25px_rgba(217,70,239,0.6)] transition-all duration-300 ${isUploading ? "opacity-70 cursor-not-allowed" : ""
                            }`}
                    />
                </motion.div>
            </form>
        </motion.div>
    );
};

export default UpdateProfileImage;
