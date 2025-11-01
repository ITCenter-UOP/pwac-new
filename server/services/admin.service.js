const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")

const User = require("../models/user.model")

const {
    GetAllUsersResDTO
} = require("../dtos/admin.dto")


class AdminService {
    static async getallUsers(){
        const allusers = await User.find()

        return GetAllUsersResDTO(allusers)
    }
}