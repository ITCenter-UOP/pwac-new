const {
    createNewsDTO,
    DeleteImagesDTO,
    UpdateNewsDescDTO,
    DeleteDescriptionDTO,
    AddImagesDTO,
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

            const result = await NewsService.deleteImagefromNews(
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
    },

    updateDescriptionFromNEWS: async (req, res) => {
        try {
            const token = req.header("Authorization")?.replace("Bearer ", "");
            if (!token) {
                return res.status(401).json({ message: "Access denied. No token provided." });
            }

            const { description } = req.body;
            const newsID = req.params.id;

            const dto = UpdateNewsDescDTO(
                token,
                newsID,
                description
            );

            const result = await NewsService.updateDescriptionFromNews(
                dto.token,
                dto.newsID,
                dto.description,
                req
            );

            res.status(200).json(result);
        } catch (err) {
            return res.status(400).json(ErrorResDTO(err.message));
        }
    },

    deleteDescriptionFromNEWS: async (req, res) => {
        try {
            const token = req.header("Authorization")?.replace("Bearer ", "");
            if (!token) {
                return res.status(401).json({ message: "Access denied. No token provided." });
            }

            const { description } = req.body;
            const newsID = req.params.id;

            const dto = DeleteDescriptionDTO(token, newsID, description);

            const result = await NewsService.deleteDescriptionFromNews(
                dto.token,
                dto.newsID,
                dto.description,
                req
            );

            res.status(200).json(result);
        } catch (err) {
            return res.status(400).json(ErrorResDTO(err.message));
        }
    },

    addImagesToNEWS: async (req, res) => {
        try {
            const token = req.header("Authorization")?.replace("Bearer ", "");
            if (!token) {
                return res.status(401).json({ message: "Access denied. No token provided." });
            }

            if (!req.files || req.files.length === 0) {
                return res.status(400).json({ success: false, message: "No files uploaded." });
            }

            const imageUrls = req.files.map(file => file.filename);
            const newsID = req.params.id;

            const dto = AddImagesDTO(token, newsID, imageUrls);

            const result = await NewsService.addImagesToNews(
                dto.token,
                dto.newsID,
                dto.imageUrls,
                req
            );

            res.status(200).json(result);
        } catch (err) {
            return res.status(400).json(ErrorResDTO(err.message));
        }
    },

    getallnews: async (req, res) => {
        try {
            const token = req.header("Authorization")?.replace("Bearer ", "");
            if (!token) {
                return res.status(401).json({ message: "Access denied. No token provided." });
            }

            const result = await NewsService.GetAllNews(token)

            res.status(200).json(result)

        }
        catch (err) {
            return res.status(400).json(ErrorResDTO(err.message));
        }
    }
};

module.exports = NEWSController;