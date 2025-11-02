const NEWS = require('../models/news.model')

const {
    GetAllNewsResDTO
} = require('../dtos/nonauth.dto')

class NonAuthService {
    static async GetAllNews() {
        const news = await NEWS.find()

        return GetAllNewsResDTO(news)
    }
}

module.exports = NonAuthService