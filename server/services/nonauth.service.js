const NEWS = require('../models/news.model')

const {
    GetAllNewsResDTO,
    GetOneNewsResDTO
} = require('../dtos/nonauth.dto')

class NonAuthService {
    static async GetAllNews() {
        const news = await NEWS.find()

        return GetAllNewsResDTO(news)
    }

    static async GetOneNews(title){
        const onenews = await NEWS.findOne({ title: title })

        return GetOneNewsResDTO(onenews)
    }
}

module.exports = NonAuthService