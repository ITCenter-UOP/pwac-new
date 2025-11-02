const {
    ErrorResDTO
} = require('../dtos/nonauth.dto');
const NonAuthService = require('../services/nonauth.service');

const NonAuthController = {
    getallnews: async (req, res) => {
        try {
            const result = await NonAuthService.GetAllNews()
            res.status(200).json(result)
        }
        catch (err) {
            return res.status(400).json(ErrorResDTO(err.message));
        }
    },

    getonenews: async (req, res) => {
        try {
            const title = req.params.title
            const result = await NonAuthService.GetOneNews(title)
            res.status(200).json(result)
        }
        catch (err) {
            return res.status(400).json(ErrorResDTO(err.message));
        }
    }
};

module.exports = NonAuthController;