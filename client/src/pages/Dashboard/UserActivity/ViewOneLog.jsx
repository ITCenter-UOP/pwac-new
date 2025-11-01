import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../../../services/api";
import { useAuth } from "../../../context/AuthContext";

const ViewOneLog = () => {
    const { id } = useParams();
    const { auth } = useAuth();
    const token = localStorage.getItem("token");

    const [userlog, setUserLog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserLog = async () => {
            try {
                const res = await API.get(`/admin/get-one-log/${id}?nocache=${Date.now()}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Cache-Control": "no-cache",
                    },
                });

                if (res.data?.success) {
                    setUserLog(res.data.result);
                } else {
                    setUserLog(null);
                }
            } catch (err) {
                console.error("Failed to fetch log:", err);
                setError("Could not load log data");
            } finally {
                setLoading(false);
            }
        };

        fetchUserLog();
    }, [token, id]);

    return (
        <div className="p-6">
            <h2 className="text-lg font-semibold text-white mb-5">View User Log</h2>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-gradient-to-br from-[#111122]/90 via-[#18182e]/80 to-[#0f0f1f]/90 border border-purple-800/40 
                           rounded-3xl shadow-[0_0_25px_rgba(168,85,247,0.15)] p-6 text-gray-200 backdrop-blur-2xl"
            >
                {loading ? (
                    <p className="text-gray-400">Loading log details...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : userlog ? (
                    <div className="space-y-6">
                        {/* Log Info */}
                        <div>
                            <h3 className="text-xl font-bold text-fuchsia-400 mb-3">
                                Log Information
                            </h3>
                            <div className="grid sm:grid-cols-2 gap-3 text-sm">
                                <p><span className="text-gray-400">Action:</span> {userlog.action}</p>
                                <p><span className="text-gray-400">Description:</span> {userlog.description}</p>
                                <p><span className="text-gray-400">IP Address:</span> {userlog.ipAddress}</p>
                                <p><span className="text-gray-400">User Agent:</span> {userlog.userAgent}</p>
                                <p><span className="text-gray-400">Created At:</span>{" "}
                                    {new Date(userlog.createdAt).toLocaleString("en-GB")}
                                </p>
                                <p><span className="text-gray-400">Updated At:</span>{" "}
                                    {new Date(userlog.updatedAt).toLocaleString("en-GB")}
                                </p>
                            </div>
                        </div>

                        {/* User Info */}
                        <div className="border-t border-purple-800/40 pt-4">
                            <h3 className="text-xl font-bold text-fuchsia-400 mb-3">
                                User Information
                            </h3>
                            <div className="grid sm:grid-cols-2 gap-3 text-sm">
                                <p><span className="text-gray-400">Username:</span> {userlog.user?.username || "—"}</p>
                                <p><span className="text-gray-400">Email:</span> {userlog.user?.email || "—"}</p>
                                <p><span className="text-gray-400">Role ID:</span> {userlog.user?.role || "—"}</p>
                                <p><span className="text-gray-400">Email Verified:</span> {userlog.user?.isEmailVerified ? "Yes" : "No"}</p>
                                <p><span className="text-gray-400">Account Active:</span> {userlog.user?.isActive ? "Active" : "Inactive"}</p>
                                <p><span className="text-gray-400">User Created:</span>{" "}
                                    {new Date(userlog.user?.createdAt).toLocaleString("en-GB")}
                                </p>
                            </div>
                        </div>

                        {/* Metadata */}
                        {userlog.metadata && (
                            <div className="border-t border-purple-800/40 pt-4">
                                <h3 className="text-xl font-bold text-fuchsia-400 mb-3">
                                    Metadata
                                </h3>
                                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                                    <p><span className="text-gray-400">IP Address:</span> {userlog.metadata.ipAddress}</p>
                                    <p><span className="text-gray-400">User Agent:</span> {userlog.metadata.userAgent}</p>
                                    <p><span className="text-gray-400">Timestamp:</span> {userlog.metadata.timestamp}</p>
                                </div>
                            </div>
                        )}

                        <div className="flex justify-end pt-4">
                            <a
                                href="/Dashboard/user-logs"
                                className="px-4 py-2 bg-purple-700/30 hover:bg-purple-600/40 rounded-lg 
                                           text-gray-100 text-sm font-medium shadow-[0_0_10px_rgba(168,85,247,0.25)] transition-all duration-200"
                            >
                                Back to Logs
                            </a>
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-400">No log found.</p>
                )}
            </motion.div>
        </div>
    );
};

export default ViewOneLog;
