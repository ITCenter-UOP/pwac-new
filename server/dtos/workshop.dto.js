exports.CreateWorkshopDTO = (token, title, subtitle, date, time, image, description, registrationLink) => ({ token, title, subtitle, date, time, image, description, registrationLink })
exports.CreateWorkshopResDTO = (message = "Workshop Created Successfully") => ({ success: true, message })


exports.ErrorResDTO = (message = "Something went wrong") => ({ success: false, message })