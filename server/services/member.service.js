const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")

const User = require("../models/user.model")
const ProfileImage = require("../models/profileimage.model")
const Role = require("../models/role.model")
const PersonalInfor = require("../models/personalinfor.model")

const logUserAction = require('../utils/others/logUserAction')

const tokenCreator = require("../utils/tokens/generateToken")
const sendEmail = require("../utils/email/emailTransporter")

const {
    updatePassviaDashResDTO,
    updateProfileimageResDTO,
    getProfileImageResDTO,
    UpdatePersonalInforResDTO
} = require("../dtos/member.dto")


class MemberService {
    static async updatePasswordViaDash(token, currentpass, newpass, req) {
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

        const checkpass = await bcrypt.compare(currentpass, user.password)

        if (!checkpass) {
            throw new Error("Current Password not Match,...")
        }

        const hashnewpass = await bcrypt.hash(newpass, 10)

        const updatepassword = await User.findByIdAndUpdate(
            user._id,
            { $set: { password: hashnewpass } },
            { new: true }
        );

        if (updatepassword) {
            if (req) {
                const metadata = {
                    ipAddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
                    userAgent: req.headers['user-agent'],
                    timestamp: new Date(),
                };
                await logUserAction(req, "password_updated_via_dashboard", `${decoded.email} Password Updated Success via Dashboard`, metadata, user._id);
            }

            return updatePassviaDashResDTO()
        }
    }

    static async UpdateProfileImage(token, profileimg, req) {
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

        const profileImageUpdate = await ProfileImage.findOneAndUpdate(
            { user: user._id },
            {
                $set: { profileimg: profileimg },
                $setOnInsert: { user: user._id }
            },
            { new: true, upsert: true }
        );

        if (profileImageUpdate) {
            if (req) {
                const metadata = {
                    ipAddress: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
                    userAgent: req.headers["user-agent"],
                    timestamp: new Date(),
                };
                await logUserAction(
                    req,
                    "profile_image_updated",
                    `${decoded.email} successfully updated their Profile Image`,
                    metadata,
                    user._id
                );
            }

            return updateProfileimageResDTO()
        }
    }

    static async getmyprofileimg(token) {
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

        const profileimg = await ProfileImage.findOne({ user: user._id })

        return getProfileImageResDTO(profileimg)
    }

    static async UpdatePersonalInfor(token, address, contact, desc, req) {
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            if (err.name === "TokenExpiredError") {
                throw new Error("Token expired. Please request a new one.");
            }
            throw new Error("Invalid token.");
        }

        const user = await User.findOne({ email: decoded.email }).populate('role');
        if (!user) throw new Error("User not found");

        const updatedPersonalInfo = await PersonalInfor.findOneAndUpdate(
            { user: user._id },
            {
                $set: {
                    position: position,
                    address: address,
                    contact: contact,
                    desc: desc
                }
            },
            { new: true, upsert: true }
        );

        if(updatedPersonalInfo){
            if (req) {
                const metadata = {
                    ipAddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
                    userAgent: req.headers['user-agent'],
                    timestamp: new Date(),
                };
                await logUserAction(req, "update_personal_information", `${decoded.email} Updated Personal Information`, metadata, user._id);
            }
            
            return UpdatePersonalInforResDTO()

        }
    }
}

module.exports = MemberService