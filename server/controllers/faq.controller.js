const {
    CreateFAQDTO,
    UpdateFaqDTO,
    ErrorResDTO
} = require('../dtos/faq.dto');
const FAQService = require('../services/faq.service');

const FAQController = {
    createFAQ: async (req, res) => {
        try {
            const token = req.header("Authorization")?.replace("Bearer ", "");
            if (!token) {
                return res.status(401).json(ErrorResDTO("Access denied. No token provided."));
            }

            const {
                question,
                answer
            } = req.body

            const dto = CreateFAQDTO(token, question, answer)

            const result = await FAQService.CreateFAQ(
                dto.token,
                dto.qeustion,
                dto.answer,
                req
            )

            res.status(200).json(result)
        }
        catch (err) {
            return res.status(400).json(ErrorResDTO(err.message));
        }
    },

    getallfaqs: async (req, res) => {
        try {
            const result = await FAQService.GetAllFaqs()
            res.status(200).json(result)
        }
        catch (err) {
            return res.status(400).json(ErrorResDTO(err.message));
        }
    },

    getonefaq: async (req, res) => {
        try {
            const quesitonid = req.params.id

            const result = await FAQService.GetoneFAQ(quesitonid)
            res.status(200).json(result)
        }
        catch (err) {
            return res.status(400).json(ErrorResDTO(err.message));
        }
    },

    updateFAQ: async (req, res) => {
        try {
            const token = req.header("Authorization")?.replace("Bearer ", "");
            if (!token) {
                return res.status(401).json(ErrorResDTO("Access denied. No token provided."));
            }

            const questionID = req.params.id

            const {
                answer
            } = req.body

            const dto = UpdateFaqDTO(token, questionID, answer)

            const result = await FAQService.UpdateFAQ(
                dto.token,
                dto.quesitonid,
                dto.answer,
                req
            )

            res.status(200).json(result)
        }
        catch (err) {
            return res.status(400).json(ErrorResDTO(err.message));
        }
    }
};

module.exports = FAQController;