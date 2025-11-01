exports.GetAllUsersResDTO = (result, message="All user Fetched Successfully") => ({ success: true, result, message })

exports.GetOneUserDTO = (userID) => ({ userID })
exports.GetOneUserResDTO = (result, message="All user Fetched Successfully") => ({ success: true, result, message })

exports.UpdateUserRoleDTO = (token, userid, roleid) => ({ token, userid, roleid })
exports.UpdateUserRoleResDTO = (message="User Role Updated Successfully") => ({ success: true, message })

exports.ErrorResDTO = (message = "Something went wrong") => ({ success: false, message })
