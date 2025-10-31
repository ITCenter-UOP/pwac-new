const {
    updatePassviaDashDTO,
    updateProfileimageDTO,
    ErrorResDTO
} = require("../dtos/member.dto");
const MemberService = require("../services/member.service");

const MemberController = {
    updatePasswordViaDash: async (req, res) => {
        try {
            const token = req.header("Authorization")?.replace("Bearer ", "");
            if (!token) {
                return res.status(401).json({ message: "Access denied. No token provided." });
            }

            const {
                currentpass,
                newpass
            } = req.body

            const updatepassdashdto = updatePassviaDashDTO(token, currentpass, newpass)

            const result = await MemberService.updatePasswordViaDash(
                updatepassdashdto.token,
                updatepassdashdto.currentpass,
                updatepassdashdto.newpass,
                req
            )

            res.status(200).json(result)
        }
        catch (err) {
            return res.status(400).json(ErrorResDTO(err.message));
        }
    },

    updateProfileImage: async (req, res) => {
        try {
            const token = req.header("Authorization")?.replace("Bearer ", "");
            if (!token) {
                return res.status(401).json({ message: "Access denied. No token provided." });
            }

            if (!req.file) {
                return res.status(400).json({ success: false, message: "No file uploaded." });
            }
            const profileImage = req.file.filename

            const updateprofileimgdto = updateProfileimageDTO(token, profileImage)

            const result = await MemberService.UpdateProfileImage(
                updateprofileimgdto.token,
                updateprofileimgdto.file,
                req
            )

            res.status(200).json(result)
        }
        catch (err) {
            return res.status(400).json(ErrorResDTO(err.message));
        }
    },

    getmyprofileimge: async (req, res) => {
        try {
            const token = req.header("Authorization")?.replace("Bearer ", "");

            if (!token) {
                return res.status(401).json({ message: "Access denied. No token provided." });
            }

            const result = await MemberService.getmyprofileimg(token)
            res.status(200).json(result)
        }
        catch (err) {
            res.json({ success: false, error: err.message });
        }
    }


};

module.exports = MemberController;