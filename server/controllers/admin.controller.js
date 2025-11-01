const AdminService = require("../services/admin.service")
const {
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
    }
};

module.exports = AdminController;