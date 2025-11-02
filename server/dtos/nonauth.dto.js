exports.GetAllNewsResDTO = (result, message = "All News Fetched Successufully") => ({success: true, result, message})

exports.ErrorResDTO = (message = "Something went wrong") => ({ success: false, message })