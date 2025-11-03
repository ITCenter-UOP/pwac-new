const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const logUserAction = require('../utils/others/logUserAction');
const sendEmail = require("../utils/email/emailTransporter");

const User = require("../models/user.model");
const FAQ = require("../models/faq.model")

const {
    CreateFAQResDTO,
    GetAllFaqResDTO,
    GetOneFaqResDTO,
    UpdateFaqResDTP
} = require("../dtos/faq.dto");

class FAQService {
    static async CreateFAQ(token, question, answer, req) {
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

        const checkfaq = await FAQ.findOne({ question: question })
        if (checkfaq) throw new Error("FAQ Already Exist on Given Question");

        const newFAQ = new FAQ({
            question: question,
            answer: answer
        })

        const resultcreatefaq = await newFAQ.save()

        if (resultcreatefaq) {
            if (req) {
                const metadata = {
                    ipAddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
                    userAgent: req.headers['user-agent'],
                    timestamp: new Date(),
                };
                await logUserAction(req, "resource_created", `${decoded.email} created Resource`, metadata, user._id);
            }

            return CreateFAQResDTO()
        }
    }

    static async GetAllFaqs() {
        const getallFAQ = await FAQ.find()
        return GetAllFaqResDTO(getallFAQ)
    }

    static async GetoneFAQ(quesitonid) {
        const getoneFAQ = await FAQ.findById(quesitonid)
        return GetOneFaqResDTO(getoneFAQ)
    }

    static async UpdateFAQ(token, quesitonid, answer, req) {
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

        const checkfaq = await FAQ.findOne({ question: question })
        if (!checkfaq) throw new Error("FAQ Cannot find by Given Qustiong");

        const updateFAQ = await FAQ.findByIdAndUpdate(
            quesitonid,
            {
                $set: {
                    answer: answer
                }
            },
            { new: true }
        )

        if (updateFAQ) {
            if (req) {
                const metadata = {
                    ipAddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
                    userAgent: req.headers['user-agent'],
                    timestamp: new Date(),
                };
                await logUserAction(req, "resource_created", `${decoded.email} created Resource`, metadata, user._id);
            }

            return UpdateFaqResDTP()
        }
    }
}

module.exports = FAQService;