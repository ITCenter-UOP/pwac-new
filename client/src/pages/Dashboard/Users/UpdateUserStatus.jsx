import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import useForm from "../../../hooks/useForm";
import API from "../../../services/api";
import Toast from "../../../component/Toast/Toast";

const UpdateUserStatus = ({ userid }) => {
    const { auth } = useAuth();
    const token = localStorage.getItem("token");

    const [toastData, setToastData] = useState({
        show: false,
        success: false,
        message: "",
    });

    const [loading, setLoading] = useState(false);

    const { values, handleChange } = useForm({
        status: "", // "active" or "inactive"
    });

    const showToast = (success, message) => {
        setToastData({ show: true, success, message });
        setTimeout(
            () => setToastData({ show: false, success: false, message: "" }),
            3000
        );
    };

    const handleUpdateUserStatus = async (e) => {
        e.preventDefault();

        if (!values.status) {
            showToast(false, "Please select a status first.");
            return;
        }

        try {
            setLoading(true);

            const res = await API.post(
                `/admin/update-status-user/${userid}`,
                { isActive: values.status === "true" },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (res.data.success === true) {
                showToast(true, res.data.message);
                setTimeout(() => window.location.reload(), 2000);
            } else {
                showToast(false, res.data.message);
            }
        } catch (err) {
            console.error("Error updating user status:", err);
            showToast(false, "Something went wrong while updating user.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="p-6 rounded-2xl border border-fuchsia-800/40 
      bg-gradient-to-br from-[#111122]/90 via-[#18182e]/80 to-[#0f0f1f]/90 
      shadow-[0_0_25px_rgba(147,51,234,0.15)] backdrop-blur-2xl
      hover:border-fuchsia-500/60 transition-all duration-300"
        >
            {toastData.show && (
                <div className="fixed top-5 right-5 z-50">
                    <Toast
                        success={toastData.success}
                        message={toastData.message}
                        onClose={() =>
                            setToastData({ ...toastData, show: false })
                        }
                    />
                </div>
            )}

            <h2 className="text-xl font-semibold text-fuchsia-400 mb-4">
                Update User Status
            </h2>

            <p className="text-fuchsia-200 mb-4">
                Managing status for user ID:
                <span className="ml-2 text-fuchsia-400 font-semibold">
                    {userid}
                </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-3 items-center">
                <label className="text-fuchsia-300 font-medium">
                    Select Status:
                </label>
                <select
                    name="status"
                    value={values.status}
                    onChange={handleChange}
                    className="bg-[#1a1a2a] border border-fuchsia-700/40 rounded-xl 
                    px-3 py-2 text-fuchsia-200 focus:outline-none focus:border-fuchsia-500
                    w-48"
                >
                    <option value="">-- Select --</option>
                    <option value={true}>Active</option>
                    <option value={false}>Inactive</option>
                </select>
            </div>

            <button
                className="mt-5 px-5 py-2 rounded-xl bg-gradient-to-r from-fuchsia-600 to-purple-600 
                hover:shadow-[0_0_25px_rgba(217,70,239,0.6)] transition-all duration-300 
                text-white font-semibold disabled:opacity-50"
                onClick={handleUpdateUserStatus}
                disabled={loading}
            >
                {loading ? "Updating..." : "Update Status"}
            </button>
        </div>
    );
};

export default UpdateUserStatus;
