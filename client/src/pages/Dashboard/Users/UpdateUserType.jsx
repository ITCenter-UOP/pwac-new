import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import useForm from "../../../hooks/useForm";
import API from "../../../services/api";
import DefaultButton from "../../../component/Buttons/DefaultButton";

const UpdateUserType = ({ userid }) => {
    const { auth } = useAuth();
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchAllroles = async () => {
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
                console.error("Failed to fetch users:", err);
                setError("Could not load users");
                setRoles([]);
            } finally {
                setLoading(false);
            }
        };

        fetchAllroles();
    }, [token]);

    return (
        <div
            className="p-6 rounded-2xl border border-fuchsia-800/40 
      bg-gradient-to-br from-[#111122]/90 via-[#18182e]/80 to-[#0f0f1f]/90 
      shadow-[0_0_25px_rgba(147,51,234,0.15)] backdrop-blur-2xl
      hover:border-fuchsia-500/60 transition-all duration-300"
        >
            <h2 className="text-xl font-semibold text-fuchsia-400 mb-4">
                Update User Type
            </h2>

            <div className="space-y-4">
                <p className="text-fuchsia-200">
                    Managing user role for ID:
                    <span className="ml-2 text-fuchsia-400 font-semibold">{userid}</span>
                </p>

                {/* Example: role update control */}
                <div className="flex flex-col sm:flex-row gap-3 items-center">
                    <label className="text-fuchsia-300 font-medium">Select Role:</label>
                    <select
                        className="px-4 py-2 rounded-lg bg-[#18182e] border border-fuchsia-700/50 
            text-fuchsia-100 focus:outline-none focus:ring-2 focus:ring-fuchsia-600
            transition-all duration-200"
                    >
                        {
                            roles.map((role, index) => {
                                return (
                                    <option key={index} value={role._id}>{role.name}</option>
                                )
                            })
                        }
                    </select>
                </div>

                {/* Update button */}
                <button
                    className="mt-4 px-5 py-2 rounded-xl bg-gradient-to-r from-fuchsia-600 to-purple-600 
          hover:shadow-[0_0_25px_rgba(217,70,239,0.6)] transition-all duration-300 
          text-white font-semibold"
                    onClick={() => console.log("Update role for user:", userid)}
                >
                    Update Role
                </button>
            </div>
        </div>
    );
};

export default UpdateUserType;
