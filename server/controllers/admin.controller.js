const AdminService = require("../services/admin.service")
const {
    GetOneUserDTO,
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
        try{
            const userID = req.params.id

            const useronegetdto = GetOneUserDTO(userID)

            const result = await AdminService.getoneuser(
                useronegetdto.userID
            )
            res.status(200).json(result)
        }
        catch(err){
            return res.status(400).json(ErrorResDTO(err.message));
        }
    }
};

module.exports = AdminController;