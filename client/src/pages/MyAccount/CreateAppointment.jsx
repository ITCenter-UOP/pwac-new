import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import useForm from "../../hooks/useForm";
import Toast from "../../component/Toast/Toast";
import DefaultButton from "../../component/Buttons/DefaultButton";
import { useAuth } from "../../context/AuthContext";

const CreateAppointment = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const { auth } = useAuth();

    const { values, handleChange } = useForm({
        phone: "",
        affiliation: "",
        appointmentTypes: [],
        preferredDate: "",
        preferredTime: "",
        visitReason: "",
        accessibility: "",
        meetingMode: "",
    });

    const [toastData, setToastData] = useState({ show: false, success: false, message: "" });
    const [loading, setLoading] = useState(false);
    const [canCreate, setCanCreate] = useState(false);

    const showToast = (success, message) => {
        setToastData({ show: true, success, message });
        setTimeout(() => setToastData({ show: false, success: false, message: "" }), 3000);
    };

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const res = await API.get("/appointment/get-all-appointments", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!res.data?.success || !Array.isArray(res.data.result)) {
                    showToast(false, "Error fetching appointments.");
                    return;
                }

                const currentUser = auth?.user || JSON.parse(localStorage.getItem("authUser") || "{}");
                const currentUserId = currentUser?._id || currentUser?.id;

                // ✅ Filter only current user’s appointments
                const myAppointments = res.data.result.filter((appt) => {
                    const apptUser = appt.user?._id || appt.user;
                    return apptUser?.toString() === currentUserId?.toString();
                });

                console.log("User appointments:", myAppointments);

                // ✅ No appointments → allow creation
                if (myAppointments.length === 0) {
                    setCanCreate(true);
                    return;
                }

                // ✅ Block if ANY active appointment exists (Pending/Approved + Not Marked)
                const hasActiveAppointment = myAppointments.some(
                    (appt) =>
                        (appt.status === "Pending" || appt.status === "Approved") &&
                        appt.attendance === "Not Marked"
                );

                if (hasActiveAppointment) {
                    setCanCreate(false);
                    showToast(false, "You already have an active appointment.");
                } else {
                    setCanCreate(true);
                }
            } catch (err) {
                console.error("Error fetching appointments:", err);
                showToast(false, "Error checking appointments.");
            }
        };

        fetchAppointments();
    }, [token, auth]);

    const handleCheckboxChange = (type) => {
        const updated = values.appointmentTypes.includes(type)
            ? values.appointmentTypes.filter((t) => t !== type)
            : [...values.appointmentTypes, type];
        handleChange({ target: { name: "appointmentTypes", value: updated } });
    };

    const handleCreateAppointment = async () => {
        if (!canCreate) {
            showToast(false, "You cannot create a new appointment right now.");
            return;
        }

        setLoading(true);
        try {
            const res = await API.post(
                "/appointment/create-appointment",
                {
                    phone: values.phone,
                    affiliation: values.affiliation,
                    appointmentTypes: values.appointmentTypes,
                    preferredDate: values.preferredDate,
                    preferredTime: values.preferredTime,
                    visitReason: values.visitReason,
                    accessibility: values.accessibility,
                    meetingMode: values.meetingMode,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (res.data?.success) {
                showToast(true, "Appointment created successfully!");
                setTimeout(() => navigate("/my-account"), 1500);
            } else {
                showToast(false, res.data?.message || "Failed to create appointment.");
            }
        } catch (err) {
            console.error("Error creating appointment:", err);
            showToast(false, "Error creating appointment.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div>
                <a href="/my-account">
                    <DefaultButton label="Back to My Account" />
                </a>
            </div>

            <div className="max-w-7xl mx-auto mt-10 p-10 bg-white rounded-2xl shadow-xl border border-[#560606]/20">
                {toastData.show && (
                    <Toast
                        success={toastData.success}
                        message={toastData.message}
                        onClose={() => setToastData({ ...toastData, show: false })}
                    />
                )}

                <h1 className="text-3xl font-bold text-[#560606] mb-8 text-center">
                    Create New Appointment
                </h1>

                {!canCreate ? (
                    <div className="text-center text-gray-600 py-10">
                        <p className="text-lg">
                            You already have an active appointment.
                            You can create a new one after it’s marked as{" "}
                            <span className="text-[#560606] font-semibold">Rejected</span> or{" "}
                            <span className="text-[#560606] font-semibold">Present / Absent</span>.
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input
                                type="text"
                                name="phone"
                                value={values.phone}
                                onChange={handleChange}
                                placeholder="Phone Number"
                                className="px-4 py-3 rounded-lg bg-white border border-[#560606]/40"
                            />

                            <select
                                name="affiliation"
                                value={values.affiliation}
                                onChange={handleChange}
                                className="px-4 py-3 rounded-lg bg-white border border-[#560606]/40"
                            >
                                <option value="">Select Affiliation</option>
                                <option value="Student">Student</option>
                                <option value="Staff / Faculty">Staff / Faculty</option>
                                <option value="Family Member of Student">Family Member of Student</option>
                                <option value="Family Member of Staff">Family Member of Staff</option>
                            </select>

                            <input
                                type="date"
                                name="preferredDate"
                                value={values.preferredDate}
                                onChange={handleChange}
                                className="px-4 py-3 rounded-lg bg-white border border-[#560606]/40"
                            />

                            <input
                                type="time"
                                name="preferredTime"
                                value={values.preferredTime}
                                onChange={handleChange}
                                className="px-4 py-3 rounded-lg bg-white border border-[#560606]/40"
                            />

                            <select
                                name="meetingMode"
                                value={values.meetingMode}
                                onChange={handleChange}
                                className="px-4 py-3 rounded-lg bg-white border border-[#560606]/40"
                            >
                                <option value="">Select Meeting Mode</option>
                                <option value="In-person">In-person</option>
                                <option value="Virtual">Virtual</option>
                                <option value="Either is fine">Either is fine</option>
                            </select>

                            <input
                                type="text"
                                name="accessibility"
                                value={values.accessibility}
                                onChange={handleChange}
                                placeholder="Accessibility needs (optional)"
                                className="px-4 py-3 rounded-lg bg-white border border-[#560606]/40"
                            />
                        </div>

                        <div className="mt-6">
                            <h2 className="text-lg text-[#560606] font-semibold mb-2">
                                Appointment Type(s)
                            </h2>
                            <div className="flex flex-wrap gap-4">
                                {[
                                    "Counseling",
                                    "Career Guidance",
                                    "Financial Aid",
                                    "Personal Development",
                                ].map((type) => (
                                    <label key={type} className="flex items-center gap-2 text-gray-700 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={values.appointmentTypes.includes(type)}
                                            onChange={() => handleCheckboxChange(type)}
                                            className="accent-[#560606] w-4 h-4 cursor-pointer"
                                        />
                                        {type}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="mt-6">
                            <textarea
                                name="visitReason"
                                value={values.visitReason}
                                onChange={handleChange}
                                placeholder="Reason for visit..."
                                rows="4"
                                className="w-full px-4 py-3 rounded-lg bg-white border border-[#560606]/40"
                            />
                        </div>

                        <DefaultButton
                            label={loading ? "Submitting..." : "Submit Appointment Request"}
                            onClick={handleCreateAppointment}
                            disabled={loading}
                            className="mt-8 w-full bg-gradient-to-r from-[#560606] to-[#7d1b1b] text-white px-6 py-3 rounded-xl shadow-md"
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default CreateAppointment;
