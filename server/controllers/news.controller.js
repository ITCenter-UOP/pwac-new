const {
    createNewsDTO,
    DeleteImagesDTO,
    ErrorResDTO
} = require("../dtos/news.dto");
const NewsService = require("../services/news.service");

const NEWSController = {
    createNews: async (req, res) => {
        try {
            const token = req.header("Authorization")?.replace("Bearer ", "");
            if (!token) {
                return res.status(401).json({ message: "Access denied. No token provided." });
            }

            if (!req.files || req.files.length === 0) {
                return res.status(400).json({ success: false, message: "No files uploaded." });
            }
            const imageurls = req.files.map(file => file.filename);

            const {
                title,
                desc,
            } = req.body

            const descriptions = Array.isArray(desc) ? desc : [desc];

            const dto = createNewsDTO(
                token,
                title,
                descriptions,
                imageurls
            )

            const result = await NewsService.CreateNews(
                dto.token,
                dto.title,
                dto.description,
                dto.imageUrl,
                req
            )

            res.status(200).json(result)

        }
        catch (err) {
            return res.status(400).json(ErrorResDTO(err.message));
        }
    },

    deleteimagesFromNEWS: async (req, res) => {
        try {
            const token = req.header("Authorization")?.replace("Bearer ", "");
            if (!token) {
                return res.status(401).json({ message: "Access denied. No token provided." });
            }

            const { image } = req.body;
            const newsID = req.params.id;

            const dto = DeleteImagesDTO(
                token,
                newsID,
                image
            )

            const result = NewsService.deleteImagefromNews(
                dto.token,
                dto.newsID,
                dto.imageurl,
                req
            )

            res.status(200).json(result)

        }
        catch (err) {
            return res.status(400).json(ErrorResDTO(err.message));
        }
    }
};

module.exports = NEWSController;