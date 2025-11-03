import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../../services/api";
import Toast from "../../../component/Toast/Toast";
import { FaUser, FaClipboardList, FaVideo, FaCheckCircle, FaCommentDots } from "react-icons/fa";

const UpdateAppointment = () => {
    const { id } = useParams();
    const token = localStorage.getItem("token");

    const [appointment, setAppointment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState({ show: false, success: false, message: "" });

    const showToast = (success, message) => {
        setToast({ show: true, success, message });
        setTimeout(() => setToast({ show: false, success: false, message: "" }), 3000);
    };

    useEffect(() => {
        const fetchAppointment = async () => {
            try {
                const res = await API.get(`/appointment/get-one-appointment/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const found = res.data?.result || res.data?.appointment || res.data?.data;
                if (found) setAppointment(found);
                else showToast(false, "Appointment not found");
            } catch (err) {
                console.error(err);
                showToast(false, "Error fetching appointment");
            } finally {
                setLoading(false);
            }
        };
        fetchAppointment();
    }, [id, token]);

    const updateField = async (endpoint, payload, successMsg, errorMsg) => {
        try {
            const res = await API.put(endpoint, payload, {
                headers: { Authorization: `Bearer ${token}` },
            });
            showToast(res.data?.success, res.data?.message || successMsg);
        } catch (err) {
            console.error(err);
            showToast(false, errorMsg);
        }
    };

    if (loading)
        return <p className="text-center mt-10 text-gray-600">Loading appointment...</p>;
    if (!appointment)
        return <p className="text-center mt-10 text-gray-600">No appointment found.</p>;

    const meetingModes = ["In-person", "Virtual", "Either is fine"];
    const statuses = ["Pending", "Approved", "Rejected"];
    const attendances = ["Present", "Absent", "Not Marked"];

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-white p-8">
            {toast.show && (
                <Toast
                    success={toast.success}
                    message={toast.message}
                    onClose={() => setToast({ ...toast, show: false })}
                />
            )}

            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-extrabold text-center text-indigo-900 mb-10">
                    Appointment Management Dashboard
                </h1>

                {/* ===== USER & APPOINTMENT INFO ===== */}
                <div className="grid md:grid-cols-2 gap-8 mb-10">
                    {/* USER INFO */}
                    <div className="bg-white/80 backdrop-blur-xl shadow-xl rounded-2xl p-6 border border-indigo-100">
                        <div className="flex items-center mb-4">
                            <FaUser className="text-indigo-600 text-2xl mr-2" />
                            <h2 className="text-xl font-semibold text-indigo-800">User Information</h2>
                        </div>
                        <div className="space-y-2 text-gray-700">
                            <p><strong>Username:</strong> {appointment?.user?.username}</p>
                            <p><strong>Email:</strong> {appointment?.user?.email}</p>
                            <p><strong>Role ID:</strong> {appointment?.user?.role}</p>
                            <p><strong>Active:</strong> {appointment?.user?.isActive ? "Yes" : "No"}</p>
                            <p><strong>Email Verified:</strong> {appointment?.user?.isEmailVerified ? "Yes" : "No"}</p>
                            <p><strong>User Created:</strong> {new Date(appointment?.user?.createdAt).toLocaleString()}</p>
                        </div>
                    </div>

                    {/* APPOINTMENT INFO */}
                    <div className="bg-white/80 backdrop-blur-xl shadow-xl rounded-2xl p-6 border border-indigo-100">
                        <div className="flex items-center mb-4">
                            <FaClipboardList className="text-indigo-600 text-2xl mr-2" />
                            <h2 className="text-xl font-semibold text-indigo-800">Appointment Details</h2>
                        </div>
                        <div className="space-y-2 text-gray-700">
                            <p><strong>ID:</strong> {appointment._id}</p>
                            <p><strong>Phone:</strong> {appointment.phone}</p>
                            <p><strong>Affiliation:</strong> {appointment.affiliation}</p>
                            <p><strong>Type:</strong> {appointment.appointmentTypes?.join(", ")}</p>
                            <p><strong>Date:</strong> {appointment.preferredDate?.split("T")[0]}</p>
                            <p><strong>Time:</strong> {appointment.preferredTime}</p>
                            <p><strong>Reason:</strong> {appointment.visitReason}</p>
                            <p><strong>Accessibility:</strong> {appointment.accessibility}</p>
                            <p><strong>Meeting Mode:</strong> {appointment.meetingMode}</p>
                            <p><strong>Status:</strong> {appointment.status}</p>
                            <p><strong>Attendance:</strong> {appointment.attendance}</p>
                            <p><strong>Remarks:</strong> {appointment.remarks || "—"}</p>
                            <p><strong>Created:</strong> {new Date(appointment.createdAt).toLocaleString()}</p>
                            <p><strong>Updated:</strong> {new Date(appointment.updatedAt).toLocaleString()}</p>
                        </div>
                    </div>
                </div>

                {/* ===== UPDATE SECTIONS ===== */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* MEETING MODE */}
                    <div className="bg-gradient-to-br from-indigo-50 to-white shadow-md border border-indigo-100 rounded-2xl p-5 hover:shadow-lg transition">
                        <div className="flex items-center mb-3">
                            <FaVideo className="text-indigo-500 mr-2" />
                            <h3 className="font-semibold text-gray-800">Meeting Mode</h3>
                        </div>
                        <select
                            value={appointment.meetingMode || ""}
                            onChange={(e) => setAppointment({ ...appointment, meetingMode: e.target.value })}
                            className="w-full border rounded-lg p-3 mb-3 focus:ring-2 focus:ring-indigo-400"
                        >
                            {meetingModes.map((m) => <option key={m}>{m}</option>)}
                        </select>
                        <button
                            onClick={() => updateField("/appointment/set-meeting-mode", { appointmentId: id, meetingMode: appointment.meetingMode }, "Meeting mode updated", "Error updating meeting mode")}
                            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
                        >
                            Update
                        </button>
                    </div>

                    {/* STATUS */}
                    <div className="bg-gradient-to-br from-green-50 to-white shadow-md border border-green-100 rounded-2xl p-5 hover:shadow-lg transition">
                        <div className="flex items-center mb-3">
                            <FaCheckCircle className="text-green-500 mr-2" />
                            <h3 className="font-semibold text-gray-800">Status</h3>
                        </div>
                        <select
                            value={appointment.status || ""}
                            onChange={(e) => setAppointment({ ...appointment, status: e.target.value })}
                            className="w-full border rounded-lg p-3 mb-3 focus:ring-2 focus:ring-green-400"
                        >
                            {statuses.map((s) => <option key={s}>{s}</option>)}
                        </select>
                        <button
                            onClick={() => updateField("/appointment/set-status", { appointmentId: id, status: appointment.status }, "Status updated", "Error updating status")}
                            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                        >
                            Update
                        </button>
                    </div>

                    {/* ATTENDANCE */}
                    <div className="bg-gradient-to-br from-blue-50 to-white shadow-md border border-blue-100 rounded-2xl p-5 hover:shadow-lg transition">
                        <div className="flex items-center mb-3">
                            <FaClipboardList className="text-blue-500 mr-2" />
                            <h3 className="font-semibold text-gray-800">Attendance</h3>
                        </div>
                        <select
                            value={appointment.attendance || ""}
                            onChange={(e) => setAppointment({ ...appointment, attendance: e.target.value })}
                            className="w-full border rounded-lg p-3 mb-3 focus:ring-2 focus:ring-blue-400"
                        >
                            {attendances.map((a) => <option key={a}>{a}</option>)}
                        </select>
                        <button
                            onClick={() => updateField("/appointment/set-attendance", { appointmentId: id, attendance: appointment.attendance }, "Attendance updated", "Error updating attendance")}
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            Update
                        </button>
                    </div>

                    {/* REMARKS */}
                    <div className="bg-gradient-to-br from-gray-50 to-white shadow-md border border-gray-100 rounded-2xl p-5 hover:shadow-lg transition">
                        <div className="flex items-center mb-3">
                            <FaCommentDots className="text-gray-600 mr-2" />
                            <h3 className="font-semibold text-gray-800">Remarks</h3>
                        </div>
                        <textarea
                            value={appointment.remarks || ""}
                            onChange={(e) => setAppointment({ ...appointment, remarks: e.target.value })}
                            className="w-full border rounded-lg p-3 mb-3 min-h-[100px] focus:ring-2 focus:ring-gray-400"
                            placeholder="Add remarks..."
                        ></textarea>
                        <button
                            onClick={() => updateField("/appointment/add-remarks", { appointmentId: id, remarks: appointment.remarks }, "Remarks updated", "Error updating remarks")}
                            className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 transition"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateAppointment;
