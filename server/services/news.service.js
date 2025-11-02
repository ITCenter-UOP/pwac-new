const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")

const User = require("../models/user.model")
const Role = require("../models/role.model")
const NEWS = require("../models/news.model")

const logUserAction = require('../utils/others/logUserAction')

const sendEmail = require("../utils/email/emailTransporter")

const {
    CreateNewsResDTO,
} = require("../dtos/news.dto")


class NewsService {
    static async CreateNews(token, title, description, imageUrl, req) {
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

        const checknews = await NEWS.findOne({ title: title })

        if (checknews) {
            throw new Error("The News Already Exist By this Title")
        }

        const createNews = new NEWS({
            user: user._id,
            title: title,
            description: description,
            imageUrl: imageUrl
        })

        const resultnews = await createNews.save()

        if (resultnews) {
            if (req) {
                const metadata = {
                    ipAddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
                    userAgent: req.headers['user-agent'],
                    timestamp: new Date(),
                };
                await logUserAction(req, "news_created_success", `${decoded.email} Created News Success`, metadata, user._id);
            }
            return CreateNewsResDTO()
        }
    }
}

module.exports = NewsService