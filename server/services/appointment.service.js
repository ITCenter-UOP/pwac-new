const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Appointment = require("../models/appointment.model");
const logUserAction = require("../utils/others/logUserAction");

const {
    CreateAppointmentResDTO,
    UpdateAppointmentResDTO,
    GetAllAppointmentsResDTO,
    GetOneAppointmentResDTO,
    SetMeetingModeResDTO,
    SetStatusResDTO,
    AddRemarksResDTO,
    SetAttendanceResDTO
} = require("../dtos/appointment.dto");

class AppointmentService {
    static async createAppointment(token, phone, affiliation, appointmentTypes, preferredDate, preferredTime, visitReason, accessibility, meetingMode, req) {
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            if (err.name === "TokenExpiredError") throw new Error("Token expired. Please login again.");
            throw new Error("Invalid token.");
        }

        const user = await User.findOne({ email: decoded.email });
        if (!user) throw new Error("User not found");

        const newAppointment = new Appointment({
            user: user._id,
            phone,
            affiliation,
            appointmentTypes,
            preferredDate,
            preferredTime,
            visitReason,
            accessibility,
            meetingMode
        });

        const saved = await newAppointment.save();

        if (saved && req) {
            const metadata = {
                ipAddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
                userAgent: req.headers['user-agent'],
                timestamp: new Date(),
            };
            await logUserAction(req, "appointment_created", `${decoded.email} created a new appointment`, metadata, user._id);
        }

        return CreateAppointmentResDTO();
    }

    static async updateAppointment(token, appointmentId, phone, affiliation, appointmentTypes, preferredDate, preferredTime, visitReason, accessibility, meetingMode, req) {
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            throw new Error("Invalid token.");
        }

        const user = await User.findOne({ email: decoded.email });
        if (!user) throw new Error("User not found");

        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) throw new Error("Appointment not found");

        appointment.phone = phone || appointment.phone;
        appointment.affiliation = affiliation || appointment.affiliation;
        appointment.appointmentTypes = appointmentTypes || appointment.appointmentTypes;
        appointment.preferredDate = preferredDate || appointment.preferredDate;
        appointment.preferredTime = preferredTime || appointment.preferredTime;
        appointment.visitReason = visitReason || appointment.visitReason;
        appointment.accessibility = accessibility || appointment.accessibility;
        appointment.meetingMode = meetingMode || appointment.meetingMode;

        const updated = await appointment.save();

        if (updated && req) {
            const metadata = {
                ipAddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
                userAgent: req.headers['user-agent'],
                timestamp: new Date(),
            };
            await logUserAction(req, "appointment_updated", `${decoded.email} updated appointment ${appointmentId}`, metadata, user._id);
        }

        return UpdateAppointmentResDTO();
    }

    static async getAllAppointments() {
        const allAppointments = await Appointment.find().populate('user');
        return GetAllAppointmentsResDTO(allAppointments);
    }

    static async getOneAppointment(appointmentId) {
        const appointment = await Appointment.findById(appointmentId).populate('user');
        if (!appointment) throw new Error("Appointment not found");
        return GetOneAppointmentResDTO(appointment);
    }

    static async setMeetingMode(token, appointmentId, meetingMode, req) {
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            throw new Error("Invalid token.");
        }

        const user = await User.findOne({ email: decoded.email });
        if (!user) throw new Error("User not found");

        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) throw new Error("Appointment not found");

        appointment.meetingMode = meetingMode;
        await appointment.save();

        if (req) {
            const metadata = {
                ipAddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
                userAgent: req.headers['user-agent'],
                timestamp: new Date(),
            };
            await logUserAction(req, "meeting_mode_updated", `${decoded.email} set meeting mode for appointment ${appointmentId}`, metadata, user._id);
        }

        return SetMeetingModeResDTO();
    }

    static async setStatus(token, appointmentId, status, req) {
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            throw new Error("Invalid token.");
        }

        const user = await User.findOne({ email: decoded.email });
        if (!user) throw new Error("User not found");

        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) throw new Error("Appointment not found");

        appointment.status = status;
        await appointment.save();

        if (req) {
            const metadata = {
                ipAddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
                userAgent: req.headers['user-agent'],
                timestamp: new Date(),
            };
            await logUserAction(req, "appointment_status_updated", `${decoded.email} changed status of appointment ${appointmentId} to ${status}`, metadata, user._id);
        }

        return SetStatusResDTO();
    }

    static async addRemarks(token, appointmentId, remarks, req) {
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            throw new Error("Invalid token.");
        }

        const user = await User.findOne({ email: decoded.email });
        if (!user) throw new Error("User not found");

        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) throw new Error("Appointment not found");

        appointment.remarks = remarks;
        await appointment.save();

        if (req) {
            const metadata = {
                ipAddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
                userAgent: req.headers['user-agent'],
                timestamp: new Date(),
            };
            await logUserAction(req, "appointment_remarks_added", `${decoded.email} added remarks to appointment ${appointmentId}`, metadata, user._id);
        }

        return AddRemarksResDTO();
    }

    static async setAttendance(token, appointmentId, attendance, req) {
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            throw new Error("Invalid token.");
        }

        const user = await User.findOne({ email: decoded.email });
        if (!user) throw new Error("User not found");

        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) throw new Error("Appointment not found");

        appointment.attendance = attendance;
        await appointment.save();

        if (req) {
            const metadata = {
                ipAddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
                userAgent: req.headers['user-agent'],
                timestamp: new Date(),
            };
            await logUserAction(req, "appointment_attendance_updated", `${decoded.email} marked ${attendance} for appointment ${appointmentId}`, metadata, user._id);
        }

        return SetAttendanceResDTO();
    }
}

module.exports = AppointmentService;
