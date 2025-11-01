import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DefaultButton from "../../../component/Buttons/DefaultButton";
import API from "../../../services/api";
import UpdateUserType from "./UpdateUserType";
import { useAuth } from "../../../context/AuthContext";
import UpdateUserStatus from "./UpdateUserStatus";

const UpdateUser = () => {
    const token = localStorage.getItem("token");
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { auth } = useAuth()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await API.get(`/admin/get-one-user/${id}?nocache=${Date.now()}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Cache-Control": "no-cache",
                    },
                });

                if (res.data.success === true) {
                    setUser(res.data.result);
                } else {
                    setUser(null);
                }
            } catch (err) {
                console.error("Failed to fetch user:", err);
                setError("Could not load user");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [token, id]);

    if (loading) {
        return <div className="text-fuchsia-400 text-sm">Loading user data...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-sm">{error}</div>;
    }

    return (
        <div className="">
            <div className="mt-4 space-y-6">
                {/* Back button */}
                <div>
                    <a href="/Dashboard/manage-users">
                        <DefaultButton type="button" label="← Back to Manage Users" />
                    </a>
                </div>

                {/* User Card */}
                {user ? (
                    <div
                        className="p-6 rounded-2xl border border-fuchsia-800/40 
          bg-gradient-to-br from-[#111122]/90 via-[#18182e]/80 to-[#0f0f1f]/90 
          shadow-[0_0_25px_rgba(147,51,234,0.15)] backdrop-blur-2xl
          hover:border-fuchsia-500/60 transition-all duration-300"
                    >
                        <h2 className="text-2xl font-bold text-fuchsia-400 mb-6">
                            User Details
                        </h2>

                        <div className="flex flex-col md:flex-row gap-6">
                            {/* Profile Image */}
                            <div className="flex-shrink-0">
                                {user.profileImage?.profileimg ? (
                                    <img
                                        src={`${import.meta.env.VITE_APP_API_FILES}/uploads/${user.profileImage.profileimg}`}
                                        alt="Profile"
                                        className="w-36 h-36 rounded-xl border border-fuchsia-700/40 
                  shadow-[0_0_20px_rgba(217,70,239,0.3)] object-cover"
                                    />
                                ) : (
                                    <div
                                        className="w-36 h-36 rounded-xl border border-fuchsia-700/40 
                  shadow-[0_0_20px_rgba(217,70,239,0.3)] 
                  flex items-center justify-center text-fuchsia-400/60 bg-[#1a1a2a]"
                                    >
                                        No Image
                                    </div>
                                )}
                            </div>

                            {/* Info Fields */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1 text-fuchsia-100">
                                <div>
                                    <p className="font-semibold text-fuchsia-400/80">Username</p>
                                    <p>{user.username}</p>
                                </div>

                                <div>
                                    <p className="font-semibold text-fuchsia-400/80">Email</p>
                                    <p>{user.email}</p>
                                </div>

                                <div>
                                    <p className="font-semibold text-fuchsia-400/80">Role</p>
                                    <p>{user.role?.name || "N/A"}</p>
                                </div>

                                <div>
                                    <p className="font-semibold text-fuchsia-400/80">Account Status</p>
                                    <p className={user.isActive ? "text-green-400" : "text-red-400"}>
                                        {user.isActive ? "Active" : "Inactive"}
                                    </p>
                                </div>

                                <div>
                                    <p className="font-semibold text-fuchsia-400/80">Email Verified</p>
                                    <p className={user.isEmailVerified ? "text-emerald-400" : "text-amber-400"}>
                                        {user.isEmailVerified ? "Yes" : "No"}
                                    </p>
                                </div>

                                <div>
                                    <p className="font-semibold text-fuchsia-400/80">Created At</p>
                                    <p>{new Date(user.createdAt).toLocaleString()}</p>
                                </div>

                                <div>
                                    <p className="font-semibold text-fuchsia-400/80">Updated At</p>
                                    <p>{new Date(user.updatedAt).toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="text-fuchsia-400/70 text-sm">No user data found.</p>
                )}
            </div>

            {
                auth.id === user._id ?
                    <div className=""></div>
                    :
                    <div className="mt-8">
                        <UpdateUserType userid={id} />
                    </div>
            }

            {
                auth.id === user._id ?
                    <div className=""></div>
                    :
                    <div className="mt-8">
                        <UpdateUserStatus userid={id} />
                    </div>
            }

        </div>
    );
};

export default UpdateUser;
