const AdminService = require("../services/admin.service")
const {
    GetOneUserDTO,
    UpdateUserRoleDTO,
    ErrorResDTO
} = require('../dtos/admin.dto')

const AdminController = {
    getallusers: async (req, res) => {
        try {
            const result = await AdminService.getallUsers()
            res.status(200).json(result)
        }
        catch (err) {
            return res.status(400).json(ErrorResDTO(err.message));
        }
    },

    getoneuser: async (req, res) => {
        try {
            const userID = req.params.id

            const useronegetdto = GetOneUserDTO(userID)

            const result = await AdminService.getoneuser(
                useronegetdto.userID
            )
            res.status(200).json(result)
        }
        catch (err) {
            return res.status(400).json(ErrorResDTO(err.message));
        }
    },

    updateuserRole: async (req, res) => {
        try {
            const token = req.header("Authorization")?.replace("Bearer ", "");
            if (!token) {
                return res.status(401).json({ message: "Access denied. No token provided." });
            }

            const {
                role
            } = req.body

            const userid = req.params.id

            const updateroledto = UpdateUserRoleDTO(
                token,
                userid,
                role
            )

            const result = await AdminService.UpdateUserRole(
                updateroledto.token,
                updateroledto.userid,
                updateroledto.roleid,
                req
            )

            res.status(200).json(result)           

        }
        catch (err) {
            return res.status(400).json(ErrorResDTO(err.message));
        }
    }
};

module.exports = AdminController;