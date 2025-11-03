exports.CreateFAQDTO = (token, qeustion, answer) => ({ token, qeustion, answer })
exports.CreateFAQResDTO = (message = "FAQ Created Successfully") => ({ success: true, message })

exports.GetAllFaqResDTO = (result, message = " All Faq Fetched Successfully") => ({ success: true, result, message })

exports.GetOneFaqResDTO = (result, message = "One Faq Fetched Successfully") => ({ success: true, result, message })

exports.UpdateFaqDTO = (token, quesitonid, answer) => ({ token, quesitonid, answer })
exports.UpdateFaqResDTP = (message = "FAQ Updeted Successfully") => ({ success: true, message })

exports.ErrorResDTO = (message = "Something went wrong") => ({ success: false, message })
