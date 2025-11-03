const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    phone: { type: String, required: true },
    affiliation: { type: String, enum: ["Student", "Staff / Faculty", "Family Member of Student", "Family Member of Staff"], required: true },
    appointmentTypes: [{ type: String }],
    preferredDate: { type: Date, required: true },
    preferredTime: { type: String, required: true },
    visitReason: { type: String },
    accessibility: { type: String },
    meetingMode: { type: String, enum: ["In-person", "Virtual", "Either is fine"], required: true },
    status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
    remarks: { type: String, default: "" },
    attendance: { type: String, enum: ["Present", "Absent", "Not Marked"], default: "Not Marked" },
    active: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Appointment', AppointmentSchema);
