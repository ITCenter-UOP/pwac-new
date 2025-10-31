exports.updatePassviaDashDTO = (token, currentpass, newpass) => ({ token, currentpass, newpass })
exports.updatePassviaDashResDTO = (message = "Password Updated Successfully") => ({ success: true, message })

exports.updateProfileimageDTO = (token, profileimg) => ({ token, file: profileimg})
exports.updateProfileimageResDTO = (message = "Profile Image Updated Successfully") => ({ success: true, message})

exports.getProfileImageResDTO = (result, message="Profile Image Fetched Successfully") => ({ success: true, result, message})

// Error 
exports.ErrorResDTO = (message = "Something went wrong") => ({ success: false, message })