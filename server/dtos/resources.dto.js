exports.CreateResourceDTO = (token, title, content, link) => ({ token, title, content, link })
exports.CreateResourceResDTO = (message = "Resource Created Successfully") => ({ success: true, message })

exports.GetAllResourcesResDTO = (result, message = "All Resources Fetched Successfully") => ({ success: true, result, message })

exports.GetOneResourceResDTO = (result, message = "One Resource Fetched Successfully") => ({ success: true, result, message })

exports.DeleteResourceResDTO = (message = "Resource Deleted Successfully") => ({ success: true, message })

exports.ErrorResDTO = (message = "Something went wrong") => ({ success: false, message })

