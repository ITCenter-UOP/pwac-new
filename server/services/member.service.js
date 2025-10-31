const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const User = require("../models/user.model")
const ProfileImage = require("../models/profileimage.model")

const logUserAction = require('../utils/others/logUserAction')

const tokenCreator = require("../utils/tokens/generateToken")
const sendEmail = require("../utils/email/emailTransporter")

const {
    updatePassviaDashResDTO
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
}

module.exports = MemberService