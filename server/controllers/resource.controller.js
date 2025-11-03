const {
    CreateResourceDTO,
    ErrorResDTO
} = require("../dtos/resources.dto");
const ResourceService = require("../services/resource.service");

const ResourceController = {
    createResource: async (req, res) => {
        try {
            const token = req.header("Authorization")?.replace("Bearer ", "");
            if (!token) {
                return res.status(401).json(ErrorResDTO("Access denied. No token provided."));
            }

            const {
                title,
                content,
                link
            } = req.body

            const dto = CreateResourceDTO(token, title, content, link)

            const result = await ResourceService.CreateResource(
                dto.token,
                dto.title,
                dto.content,
                dto.link,
                req
            )

            res.status(200).json(result)

        }
        catch (err) {
            return res.status(400).json(ErrorResDTO(err.message));
        }
    },

    getallresource: async (req, res) => {
        try {
            const result = await ResourceService.GetAllResource()
            res.status(200).json(result)
        }
        catch (err) {
            return res.status(400).json(ErrorResDTO(err.message));
        }
    },

    getoneresource: async (req, res) => {
        try {
            const resourceid = req.params.id

            const result = await ResourceService.GetOneResource(resourceid)
            res.status(200).json(result)
        }
        catch (err) {
            return res.status(400).json(ErrorResDTO(err.message));
        }
    },

    deleteResource: async (req, res) => {
        try {
            const token = req.header("Authorization")?.replace("Bearer ", "");
            if (!token) {
                return res.status(401).json(ErrorResDTO("Access denied. No token provided."));
            }

            const resourceID = req.params.id

            const result = await ResourceService.DeleteResource(token, resourceID, req)

            res.status(200).json(result)
        }
        catch (err) {
            return res.status(400).json(ErrorResDTO(err.message));
        }
    }
};

module.exports = ResourceController;