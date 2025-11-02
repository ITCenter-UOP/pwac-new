const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const logUserAction = require('../utils/others/logUserAction');
const sendEmail = require("../utils/email/emailTransporter");

const User = require("../models/user.model");
const Workshop = require("../models/workshop.model");

const {
    CreateWorkshopResDTO,
    UpdateWorkshopResDTO
} = require("../dtos/workshop.dto");

class WorkshopService {
    static async createWorkshop(token, title, subtitle, date, time, image, description, registrationLink, req) {
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            if (err.name === "TokenExpiredError") {
                throw new Error("Token expired. Please request a new one.");
            }
            throw new Error("Invalid token.");
        }

        const user = await User.findOne({ email: decoded.email });
        if (!user) throw new Error("User not found");

        const checkworkshop = await Workshop.findOne({ title });
        if (checkworkshop) throw new Error("Workshop Already Exist on Given Title");

        const newworkshop = new Workshop({
            title,
            subtitle,
            date,
            time,
            image,
            description,
            registrationLink
        });

        const resultwh = await newworkshop.save();

        if (resultwh) {
            if (req) {
                const metadata = {
                    ipAddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
                    userAgent: req.headers['user-agent'],
                    timestamp: new Date(),
                };
                await logUserAction(req, "workshop_created", `${decoded.email} created a workshop`, metadata, user._id);
            }
            return CreateWorkshopResDTO();
        }
    }

    static async updateWorkshop(token, workshopId, subtitle, date, time, image, description, registrationLink, req) {
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            if (err.name === "TokenExpiredError") {
                throw new Error("Token expired. Please request a new one.");
            }
            throw new Error("Invalid token.");
        }

        const user = await User.findOne({ email: decoded.email });
        if (!user) throw new Error("User not found");

        const workshop = await Workshop.findById(workshopId);
        if (!workshop) throw new Error("Workshop not found");

        // Update only provided fields
        workshop.subtitle = subtitle || workshop.subtitle;
        workshop.date = date || workshop.date;
        workshop.time = time || workshop.time;
        workshop.image = image || workshop.image;
        workshop.description = description || workshop.description;
        workshop.registrationLink = registrationLink || workshop.registrationLink;

        const updated = await workshop.save();

        if (updated) {
            if (req) {
                const metadata = {
                    ipAddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
                    userAgent: req.headers['user-agent'],
                    timestamp: new Date(),
                };
                await logUserAction(req, "workshop_updated", `${decoded.email} updated workshop ${workshopId}`, metadata, user._id);
            }
            return UpdateWorkshopResDTO();
        }
    }
}

module.exports = WorkshopService;
