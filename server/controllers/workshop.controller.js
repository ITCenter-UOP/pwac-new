const {
    CreateWorkshopDTO,
    UpdateWorkshopDTO,
    ErrorResDTO
} = require("../dtos/workshop.dto");

const WorkshopService = require("../services/workshop.service");

const WorkshopController = {
    createWorkshop: async (req, res) => {
        try {
            const token = req.header("Authorization")?.replace("Bearer ", "");
            if (!token) {
                return res.status(401).json(ErrorResDTO("Access denied. No token provided."));
            }

            const { title, subtitle, date, time, description, registrationLink } = req.body;

            let imageUrl = null;
            if (req.file) {
                imageUrl = `${req.file.filename}`;
            } else if (req.body.image) {
                imageUrl = req.body.image;
            }

            const dto = CreateWorkshopDTO(
                token,
                title,
                subtitle,
                date,
                time,
                imageUrl,
                description,
                registrationLink
            );

            const result = await WorkshopService.createWorkshop(
                dto.token,
                dto.title,
                dto.subtitle,
                dto.date,
                dto.time,
                dto.image,
                dto.description,
                dto.registrationLink,
                req
            );

            return res.status(200).json(result);
        } catch (err) {
            return res.status(400).json(ErrorResDTO(err.message));
        }
    },

    updateWorkshop: async (req, res) => {
        try {
            const token = req.header("Authorization")?.replace("Bearer ", "");
            if (!token) {
                return res.status(401).json(ErrorResDTO("Access denied. No token provided."));
            }

            const { workshopId, subtitle, date, time, description, registrationLink } = req.body;

            let imageUrl = null;
            if (req.file) {
                imageUrl = `${req.file.filename}`;
            } else if (req.body.image) {
                imageUrl = req.body.image;
            }

            const dto = UpdateWorkshopDTO(
                token,
                workshopId,
                subtitle,
                date,
                time,
                imageUrl,
                description,
                registrationLink
            );

            const result = await WorkshopService.updateWorkshop(
                dto.token,
                dto.workshopId,
                dto.subtitle,
                dto.date,
                dto.time,
                dto.image,
                dto.description,
                dto.registrationLink,
                req
            );

            return res.status(200).json(result);
        } catch (err) {
            return res.status(400).json(ErrorResDTO(err.message));
        }
    },

    getallWorkshops: async (req, res) => {
        try {
            const result = await WorkshopService.GetAllWorkshop()
            res.status(200).json(result)
        }
        catch (err) {
            return res.status(400).json(ErrorResDTO(err.message));
        }
    },

    getoneworkshop: async(req, res) => {
        try{
            const workshopid = req.params.id

            const result = await WorkshopService.GetOneWorkshop(workshopid)
            res.status(200).json(result)
        }
        catch(err){
            return res.status(400).json(ErrorResDTO(err.message));
        }
    }
};

module.exports = WorkshopController;
