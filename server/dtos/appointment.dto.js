exports.CreateAppointmentDTO = (token, phone, affiliation, appointmentTypes, preferredDate, preferredTime, visitReason, accessibility, meetingMode) => ({
    token,
    phone,
    affiliation,
    appointmentTypes,
    preferredDate,
    preferredTime,
    visitReason,
    accessibility,
    meetingMode
});
exports.CreateAppointmentResDTO = (message = "Appointment Created Successfully") => ({ success: true, message });

exports.UpdateAppointmentDTO = (token, appointmentId, phone, affiliation, appointmentTypes, preferredDate, preferredTime, visitReason, accessibility, meetingMode) => ({
    token,
    appointmentId,
    phone,
    affiliation,
    appointmentTypes,
    preferredDate,
    preferredTime,
    visitReason,
    accessibility,
    meetingMode
});
exports.UpdateAppointmentResDTO = (message = "Appointment Updated Successfully") => ({ success: true, message });

exports.GetAllAppointmentsResDTO = (result, message = "All Appointments Fetched Successfully") => ({ success: true, result, message });
exports.GetOneAppointmentDTO = (appointmentId) => ({ appointmentId });
exports.GetOneAppointmentResDTO = (result, message = "Appointment Fetched Successfully") => ({ success: true, result, message });

exports.SetMeetingModeDTO = (token, appointmentId, meetingMode) => ({ token, appointmentId, meetingMode });
exports.SetMeetingModeResDTO = (message = "Meeting Mode Updated Successfully") => ({ success: true, message });

exports.SetStatusDTO = (token, appointmentId, status) => ({ token, appointmentId, status });
exports.SetStatusResDTO = (message = "Status Updated Successfully") => ({ success: true, message });

exports.AddRemarksDTO = (token, appointmentId, remarks) => ({ token, appointmentId, remarks });
exports.AddRemarksResDTO = (message = "Remarks Added Successfully") => ({ success: true, message });

exports.SetAttendanceDTO = (token, appointmentId, attendance) => ({ token, appointmentId, attendance });
exports.SetAttendanceResDTO = (message = "Attendance Updated Successfully") => ({ success: true, message });

exports.ErrorResDTO = (message = "Something went wrong") => ({ success: false, message });
