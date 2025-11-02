const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const fs = require("fs");
const path = require("path")

const User = require("../models/user.model")
const Role = require("../models/role.model")
const NEWS = require("../models/news.model")

const logUserAction = require('../utils/others/logUserAction')

const sendEmail = require("../utils/email/emailTransporter")

const {
    CreateNewsResDTO,
    DeleteImagesResDTO,
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

    static async deleteImagefromNews(token, newsID, image, req) {
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            if (err.name === "TokenExpiredError") {
                throw new Error("Token expired. Please request a new one.");
            }
            throw new Error("Invalid token.");
        }

        const user = await User.findOne({ email: decoded.email }).populate("role");
        if (!user) throw new Error("User not found");

        const news = await NEWS.findById(newsID);
        if (!news) throw new Error("News not found");

        const isOwner = news.user.toString() === user._id.toString();
        const isAdmin = user.role && user.role.name && user.role.name.toLowerCase() === "admin";

        if (!isOwner && !isAdmin) {
            throw new Error("You are not authorized to modify this news.");
        }

        if (!news.imageUrl.includes(image)) {
            throw new Error("Image not found in this news item.");
        }

        news.imageUrl = news.imageUrl.filter(img => img !== image);
        await news.save();

        const imagePath = path.join(__dirname, "../uploads", image);
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }

        if (req) {
            const metadata = {
                ipAddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
                userAgent: req.headers['user-agent'],
                timestamp: new Date(),
            };

            await logUserAction(
                req,
                "news_image_deleted",
                `${decoded.email} deleted image ${image} from news ${newsID}`,
                metadata,
                user._id
            );
        }

        return DeleteImagesResDTO();
    }

}

module.exports = NewsService