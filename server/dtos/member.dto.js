exports.updatePassviaDashDTO = (token, currentpass, newpass) => ({ token, currentpass, newpass })
exports.updatePassviaDashResDTO = (message = "Password Updated Successfully") => ({ success: true, message })

// Error 
exports.ErrorResDTO = (message = "Something went wrong") => ({ success: false, message })