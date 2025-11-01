exports.GetAllUsersResDTO = (result, message="All user Fetched Successfully") => ({ success: true, result, message })

exports.ErrorResDTO = (message = "Something went wrong") => ({ success: false, message })
