const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")

const User = require("../models/user.model")
const profileImage = require("../models/profileimage.model")
const {
    GetAllUsersResDTO
} = require("../dtos/admin.dto")


class AdminService {
    static async getallUsers(){
        const allusers = await profileImage.find().populate('user', '-password');

        return GetAllUsersResDTO(allusers)
    }
}

module.exports = AdminService