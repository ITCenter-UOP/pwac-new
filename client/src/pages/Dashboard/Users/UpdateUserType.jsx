import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import useForm from "../../../hooks/useForm";
import API from "../../../services/api";
import Toast from "../../../component/Toast/Toast";

const UpdateUserType = ({ userid }) => {
    const { auth } = useAuth();
    const token = localStorage.getItem("token");

    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [toastData, setToastData] = useState({
        show: false,
        success: false,
        message: "",
    });


    const { values, handleChange } = useForm({
        role: "",
    });


    useEffect(() => {
        const fetchAllRoles = async () => {
            try {
                const res = await API.get(`/role/get-roles?nocache=${Date.now()}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Cache-Control": "no-cache",
                        Pragma: "no-cache",
                        Expires: "0",
                    },
                });

                if (res.data?.success && Array.isArray(res.data.result)) {
                    setRoles(res.data.result);
                } else {
                    setRoles([]);
                }
            } catch (err) {
                console.error("Failed to fetch roles:", err);
                setError("Could not load roles");
                setRoles([]);
            } finally {
                setLoading(false);
            }
        };

        fetchAllRoles();
    }, [token]);

    const showToast = (success, message) => {
        setToastData({ show: true, success, message });
        setTimeout(
            () => setToastData({ show: false, success: false, message: "" }),
            3000
        );
    };

    const handleUpdateUserType = async (e) => {
        e.preventDefault();

        if (!values.role) {
            showToast(false, "Please select a role first.");
            return;
        }

        try {
            const res = await API.post(
                `/admin/update-role-user/${userid}`,
                { role: values.role },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (res.data.success == true) {
                showToast(true, res.data.message);
                setTimeout(() => window.location.reload(), 2000);
            } else {
                showToast(false, res.data?.message);
            }
        } catch (err) {
            console.error("Error updating user role:", err);
            showToast(false, "Something went wrong while updating role.");
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
                Update User Type
            </h2>

            <div className="space-y-4">
                <p className="text-fuchsia-200">
                    Managing user role for ID:
                    <span className="ml-2 text-fuchsia-400 font-semibold">
                        {userid}
                    </span>
                </p>


                <div className="flex flex-col sm:flex-row gap-3 items-center">
                    <label className="text-fuchsia-300 font-medium">
                        Select Role:
                    </label>
                    <select
                        name="role"
                        value={values.role}
                        onChange={handleChange}
                        className="px-4 py-2 rounded-lg bg-[#18182e] border border-fuchsia-700/50 
                        text-fuchsia-100 focus:outline-none focus:ring-2 focus:ring-fuchsia-600
                        transition-all duration-200"
                    >
                        <option value="">-- Select Role --</option>
                        {roles.map((role) => (
                            <option key={role._id} value={role._id}>
                                {role.name}
                            </option>
                        ))}
                    </select>
                </div>


                <button
                    className="mt-4 px-5 py-2 rounded-xl bg-gradient-to-r from-fuchsia-600 to-purple-600 
                    hover:shadow-[0_0_25px_rgba(217,70,239,0.6)] transition-all duration-300 
                    text-white font-semibold"
                    onClick={handleUpdateUserType}
                    disabled={loading}
                >
                    {loading ? "Updating..." : "Update Role"}
                </button>
            </div>
        </div>
    );
};

export default UpdateUserType;
