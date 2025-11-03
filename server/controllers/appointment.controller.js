const {
    CreateAppointmentDTO,
    UpdateAppointmentDTO,
    SetMeetingModeDTO,
    SetStatusDTO,
    AddRemarksDTO,
    SetAttendanceDTO,
    ErrorResDTO
} = require("../dtos/appointment.dto");

const AppointmentService = require("../services/appointment.service");

const AppointmentController = {
    createAppointment: async (req, res) => {
        try {
            const token = req.header("Authorization")?.replace("Bearer ", "");
            if (!token) return res.status(401).json(ErrorResDTO("Access denied. No token provided."));

            const { phone, affiliation, appointmentTypes, preferredDate, preferredTime, visitReason, accessibility, meetingMode } = req.body;

            const dto = CreateAppointmentDTO(token, phone, affiliation, appointmentTypes, preferredDate, preferredTime, visitReason, accessibility, meetingMode);

            const result = await AppointmentService.createAppointment(
                dto.token, dto.phone, dto.affiliation, dto.appointmentTypes, dto.preferredDate,
                dto.preferredTime, dto.visitReason, dto.accessibility, dto.meetingMode, req
            );

            res.status(200).json(result);
        } catch (err) {
            res.status(400).json(ErrorResDTO(err.message));
        }
    },

    updateAppointment: async (req, res) => {
        try {
            const token = req.header("Authorization")?.replace("Bearer ", "");
            if (!token) return res.status(401).json(ErrorResDTO("Access denied. No token provided."));

            const { appointmentId, phone, affiliation, appointmentTypes, preferredDate, preferredTime, visitReason, accessibility, meetingMode } = req.body;

            const dto = UpdateAppointmentDTO(token, appointmentId, phone, affiliation, appointmentTypes, preferredDate, preferredTime, visitReason, accessibility, meetingMode);

            const result = await AppointmentService.updateAppointment(
                dto.token, dto.appointmentId, dto.phone, dto.affiliation, dto.appointmentTypes, dto.preferredDate,
                dto.preferredTime, dto.visitReason, dto.accessibility, dto.meetingMode, req
            );

            res.status(200).json(result);
        } catch (err) {
            res.status(400).json(ErrorResDTO(err.message));
        }
    },

    getAllAppointments: async (req, res) => {
        try {
            const result = await AppointmentService.getAllAppointments();
            res.status(200).json(result);
        } catch (err) {
            res.status(400).json(ErrorResDTO(err.message));
        }
    },

    getOneAppointment: async (req, res) => {
        try {
            const appointmentId = req.params.id;
            const result = await AppointmentService.getOneAppointment(appointmentId);
            res.status(200).json(result);
        } catch (err) {
            res.status(400).json(ErrorResDTO(err.message));
        }
    },

    setMeetingMode: async (req, res) => {
        try {
            const token = req.header("Authorization")?.replace("Bearer ", "");
            const { appointmentId, meetingMode } = req.body;
            const dto = SetMeetingModeDTO(token, appointmentId, meetingMode);
            const result = await AppointmentService.setMeetingMode(dto.token, dto.appointmentId, dto.meetingMode);
            res.status(200).json(result);
        } catch (err) {
            res.status(400).json(ErrorResDTO(err.message));
        }
    },

    setStatus: async (req, res) => {
        try {
            const token = req.header("Authorization")?.replace("Bearer ", "");
            const { appointmentId, status } = req.body;
            const dto = SetStatusDTO(token, appointmentId, status);
            const result = await AppointmentService.setStatus(dto.token, dto.appointmentId, dto.status);
            res.status(200).json(result);
        } catch (err) {
            res.status(400).json(ErrorResDTO(err.message));
        }
    },

    addRemarks: async (req, res) => {
        try {
            const token = req.header("Authorization")?.replace("Bearer ", "");
            const { appointmentId, remarks } = req.body;
            const dto = AddRemarksDTO(token, appointmentId, remarks);
            const result = await AppointmentService.addRemarks(dto.token, dto.appointmentId, dto.remarks);
            res.status(200).json(result);
        } catch (err) {
            res.status(400).json(ErrorResDTO(err.message));
        }
    },

    setAttendance: async (req, res) => {
        try {
            const token = req.header("Authorization")?.replace("Bearer ", "");
            const { appointmentId, attendance } = req.body;
            const dto = SetAttendanceDTO(token, appointmentId, attendance);
            const result = await AppointmentService.setAttendance(dto.token, dto.appointmentId, dto.attendance);
            res.status(200).json(result);
        } catch (err) {
            res.status(400).json(ErrorResDTO(err.message));
        }
    }
};

module.exports = AppointmentController;
