exports.createNewsDTO = (token, title, description, imageUrl) => ({
    token,
    title,
    description: Array.isArray(description) ? description : [description],
    imageUrl: Array.isArray(imageUrl) ? imageUrl : [imageUrl],
});

exports.CreateNewsResDTO = (message = "NEWS Created Successfully") => ({ success: true, message })

exports.DeleteImagesDTO = (token, newsID, imageurl) => ({ token, newsID, imageurl })
exports.DeleteImagesResDTO = (message = "Image of NEWS Successfully Deleted") => ({ success: true, message })


exports.ErrorResDTO = (message = "Something went wrong") => ({ success: false, message })