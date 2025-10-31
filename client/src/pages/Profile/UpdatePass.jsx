import React, { useState } from "react";
import DefaultButton from "../../component/Buttons/DefaultButton";
import DefaultInput from "../../component/Form/DefaultInput";
import API from "../../services/api";
import useForm from "../../hooks/useForm";
import Toast from "../../component/Toast/Toast";

const UpdatePass = () => {
    const [toastData, setToastData] = useState({
        show: false,
        success: false,
        message: "",
    });

    const token = localStorage.getItem("token");

    // ✅ include resetForm to clear inputs after success
    const { values, handleChange, resetForm } = useForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const showToast = (success, message) => {
        setToastData({ show: true, success, message });
        setTimeout(
            () => setToastData({ show: false, success: false, message: "" }),
            3000
        );
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();

        if (!values.currentPassword || !values.newPassword || !values.confirmPassword) {
            showToast(false, "Please fill in all fields.");
            return;
        }

        if (values.newPassword !== values.confirmPassword) {
            showToast(false, "New password and confirm password do not match!");
            return;
        }

        try {
            const res = await API.post(
                `/member/update-password-from-dashboard?nocache=${Date.now()}`,
                {
                    currentpass: values.currentPassword,
                    newpass: values.newPassword,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    validateStatus: () => true, // prevent axios from throwing 400 as an error
                }
            );

            if (res.data?.success === true) {
                showToast(true, res.data.message || "Password updated successfully!");
                resetForm();

                setTimeout(() => {
                    localStorage.clear();
                    window.location.href = "/login";
                }, 1500);
            } else {
                showToast(false, res.data?.message || "Failed to update password.");
            }
        } catch (error) {
            console.error("Error updating password:", error);
            showToast(false, "Something went wrong while updating password.");
        }
    };



    return (
        <div className="bg-white p-6 mt-8 rounded-md shadow-md border border-purple-200">
            <h1 className="text-lg font-bold mb-4 text-purple-800">
                Update Password
            </h1>

            {/* Toast Notification */}
            {toastData.show && (
                <div className="fixed top-5 right-5 z-50">
                    <Toast
                        success={toastData.success}
                        message={toastData.message}
                        onClose={() => setToastData({ ...toastData, show: false })}
                    />
                </div>
            )}

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <DefaultInput
                    label="Current Password"
                    name="currentPassword"
                    type="password"
                    value={values.currentPassword}
                    onChange={handleChange}
                    required
                />
                <DefaultInput
                    label="New Password"
                    name="newPassword"
                    type="password"
                    value={values.newPassword}
                    onChange={handleChange}
                    required
                />
                <DefaultInput
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    required
                />

                <DefaultButton
                    type="submit"
                    label="Update Password"
                    className="w-full mt-4"
                />
            </form>
        </div>
    );
};

export default UpdatePass;
