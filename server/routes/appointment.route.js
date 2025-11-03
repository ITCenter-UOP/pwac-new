const express = require('express');
const auth = require('../middlewares/authMiddleware');
const checkPermission = require('../middlewares/checkPermission');
const AppointmentController = require('../controllers/appointment.controller');

const router = express.Router();

router.post("/create-appointment", auth, checkPermission(['appointment:create']), AppointmentController.createAppointment);

router.put("/update-appointment", auth, checkPermission(['update-be-owner']), AppointmentController.updateAppointment);

router.get("/get-all-appointments", auth, checkPermission(['appointment:view']), AppointmentController.getAllAppointments);

router.get("/get-one-appointment/:id", auth, checkPermission(['appointment:view-one']), AppointmentController.getOneAppointment);

router.put("/set-meeting-mode", auth, checkPermission(['appointment:update']), AppointmentController.setMeetingMode);

router.put("/set-status", auth, checkPermission(['appointment:update-status']), AppointmentController.setStatus);

router.put("/add-remarks", auth, checkPermission(['appointment:update']), AppointmentController.addRemarks);

router.put("/set-attendance", auth, checkPermission(['appointment:update']), AppointmentController.setAttendance);

module.exports = router;
