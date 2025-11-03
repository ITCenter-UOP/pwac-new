const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const logUserAction = require('../utils/others/logUserAction');
const sendEmail = require("../utils/email/emailTransporter");

const User = require("../models/user.model");
const Resource = require("../models/resources.model")

const {
    CreateResourceResDTO,
    GetAllResourcesResDTO,
    GetOneResourceResDTO,
    DeleteResourceResDTO
} = require("../dtos/resources.dto");


class ResourceService {
    static async CreateResource(token, title, content, link, req) {
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

        const checkResource = await Resource.findOne({ title: title })
        if (checkResource) throw new Error("Resource Already Exist on Given Title");

        const newResource = new Resource({
            title: title,
            content: content,
            link: link
        })

        const resultCreateResource = await newResource.save()

        if (resultCreateResource) {
            if (req) {
                const metadata = {
                    ipAddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
                    userAgent: req.headers['user-agent'],
                    timestamp: new Date(),
                };
                await logUserAction(req, "resource_created", `${decoded.email} created Resource`, metadata, user._id);
            }

            return CreateResourceResDTO()
        }
    }

    static async GetAllResource() {
        const getallresources = await Resource.find()
        return GetAllResourcesResDTO(getallresources)
    }

    static async GetOneResource(resourceID) {
        const getoneresource = await Resource.findById(resourceID)
        return GetOneResourceResDTO(getoneresource)
    }

    static async DeleteResource(token, resourceID, req) {
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

        const deleteresource = await Resource.findByIdAndDelete(resourceID)

        if (deleteresource) {
            if (req) {
                const metadata = {
                    ipAddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
                    userAgent: req.headers['user-agent'],
                    timestamp: new Date(),
                };
                await logUserAction(req, "resource_deleted", `${decoded.email} Deleted Resource ${resourceID}`, metadata, user._id);
            }

            return DeleteResourceResDTO()
        }
    }
}

module.exports = ResourceService