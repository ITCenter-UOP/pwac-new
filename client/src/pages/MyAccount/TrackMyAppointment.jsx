import React, { useState, useEffect } from "react";
import API from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";

const statusSteps = ["Pending", "Approved", "Rejected"];
const attendanceSteps = ["Not Marked", "Present", "Absent"];

const TrackMyAppointment = () => {
    const { auth } = useAuth();
    const token = localStorage.getItem("token");
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const res = await API.get("/appointment/get-all-appointments", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                // filter appointments for current user using _id or email
                const authUser = auth?.user || JSON.parse(localStorage.getItem("authUser"));
                const userAppointments = res.data.result.filter(
                    (appt) =>
                        appt.user?._id === authUser?._id || appt.user?.email === authUser?.email
                );

                setAppointments(userAppointments);
            } catch (err) {
                console.error("Error fetching appointments:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, [token, auth]);

    if (loading) return <p className="text-center mt-10">Loading appointments...</p>;

    if (appointments.length === 0)
        return (
            <p className="text-center mt-10 text-gray-600 text-lg">
                You don’t have any appointments yet.
            </p>
        );

    return (
        <div className="max-w-7xl mx-auto mt-10 space-y-6">
            {appointments.map((appt) => (
                <motion.div
                    key={appt._id}
                    className="bg-white border border-[#560606]/20 rounded-2xl shadow-md p-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h2 className="text-xl font-bold text-[#560606] mb-2">
                        Appointment ID: {appt._id}
                    </h2>
                    <p>
                        <span className="font-semibold">Affiliation:</span> {appt.affiliation}
                    </p>
                    <p>
                        <span className="font-semibold">Phone:</span> {appt.phone}
                    </p>
                    <p>
                        <span className="font-semibold">Appointment Types:</span>{" "}
                        {appt.appointmentTypes.join(", ")}
                    </p>
                    <p>
                        <span className="font-semibold">Preferred Date:</span>{" "}
                        {new Date(appt.preferredDate).toLocaleDateString()}
                    </p>
                    <p>
                        <span className="font-semibold">Preferred Time:</span> {appt.preferredTime}
                    </p>
                    <p>
                        <span className="font-semibold">Meeting Mode:</span> {appt.meetingMode}
                    </p>
                    <p>
                        <span className="font-semibold">Accessibility:</span> {appt.accessibility}
                    </p>
                    <p>
                        <span className="font-semibold">Visit Reason:</span> {appt.visitReason}
                    </p>

                    {/* Status Tracker */}
                    <div className="mt-4">
                        <h3 className="font-semibold text-[#560606] mb-1">Status:</h3>
                        <div className="flex items-center space-x-2">
                            {statusSteps.map((step, index) => {
                                const completed = appt.status === step || (appt.status !== "Rejected" && statusSteps.indexOf(appt.status) > index);
                                const isActive = appt.status === step;
                                return (
                                    <div key={index} className="flex items-center space-x-2">
                                        <div
                                            className={`w-4 h-4 rounded-full border-2 border-[#560606] ${completed ? "bg-[#560606]" : "bg-white"
                                                } ${isActive ? "animate-pulse" : ""}`}
                                        />
                                        <span className={`${completed ? "text-[#560606]" : "text-gray-400"} text-sm`}>
                                            {step}
                                        </span>
                                        {index < statusSteps.length - 1 && (
                                            <div className="w-6 h-0.5 bg-gray-300"></div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Attendance Tracker */}
                    {appt.status === "Approved" && (
                        <div className="mt-4">
                            <h3 className="font-semibold text-[#560606] mb-1">Attendance:</h3>
                            <div className="flex items-center space-x-2">
                                {attendanceSteps.map((step, index) => {
                                    const completed = appt.attendance === step || (appt.attendance !== "Not Marked" && attendanceSteps.indexOf(appt.attendance) > index);
                                    const isActive = appt.attendance === step;
                                    return (
                                        <div key={index} className="flex items-center space-x-2">
                                            <div
                                                className={`w-4 h-4 rounded-full border-2 border-[#560606] ${completed ? "bg-[#560606]" : "bg-white"
                                                    } ${isActive ? "animate-pulse" : ""}`}
                                            />
                                            <span className={`${completed ? "text-[#560606]" : "text-gray-400"} text-sm`}>
                                                {step}
                                            </span>
                                            {index < attendanceSteps.length - 1 && (
                                                <div className="w-6 h-0.5 bg-gray-300"></div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </motion.div>
            ))}
        </div>
    );
};

export default TrackMyAppointment;
