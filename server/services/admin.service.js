const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const mongoose = require("mongoose");

const User = require("../models/user.model");
const profileImage = require("../models/profileimage.model");
const {
    GetAllUsersResDTO,
    GetOneUserResDTO
} = require("../dtos/admin.dto");

class AdminService {
    static async getallUsers() {
        try {
            const usersWithProfile = await User.aggregate([
                {
                    $lookup: {
                        from: "profileimages",
                        localField: "_id",
                        foreignField: "user",
                        as: "profileImage"
                    }
                },
                {
                    $lookup: {
                        from: "roles",
                        localField: "role",
                        foreignField: "_id",
                        as: "role"
                    }
                },
                {
                    $unwind: {
                        path: "$profileImage",
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $unwind: {
                        path: "$role",
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $project: {
                        password: 0,
                        "profileImage.__v": 0,
                        "role.__v": 0
                    }
                }
            ]);

            return GetAllUsersResDTO(usersWithProfile);

        } catch (err) {
            console.error("Error fetching users with profile images:", err);
            throw new Error("Failed to fetch all users");
        }
    }

    static async getoneuser(userID) {
        try {
            if (!userID) throw new Error("User ID is required");
            if (!mongoose.isValidObjectId(userID)) throw new Error("Invalid User ID");

            const objectId = new mongoose.Types.ObjectId(userID);

            const userWithProfile = await User.aggregate([
                { $match: { _id: objectId } },
                {
                    $lookup: {
                        from: "profileimages",
                        localField: "_id",
                        foreignField: "user",
                        as: "profileImage"
                    }
                },
                {
                    $lookup: {
                        from: "roles",
                        localField: "role",
                        foreignField: "_id",
                        as: "role"
                    }
                },
                {
                    $unwind: {
                        path: "$profileImage",
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $unwind: {
                        path: "$role",
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $project: {
                        password: 0,
                        "profileImage.__v": 0,
                        "role.__v": 0
                    }
                }
            ]);

            if (!userWithProfile || userWithProfile.length === 0) {
                throw new Error("User not found");
            }

            return GetOneUserResDTO(userWithProfile[0]);
        } catch (err) {
            console.error("Error fetching user with profile image:", err);
            throw new Error("Failed to fetch user");
        }
    }
}

module.exports = AdminService;
