exports.GetAllUsersResDTO = (result, message="All user Fetched Successfully") => ({ success: true, result, message })


exports.GetOneUserDTO = (userID) => ({ userID })
exports.GetOneUserResDTO = (result, message="All user Fetched Successfully") => ({ success: true, result, message })

exports.ErrorResDTO = (message = "Something went wrong") => ({ success: false, message })
