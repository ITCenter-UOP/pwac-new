exports.createNewsDTO = (token, title, description, imageUrl) => ({
    token,
    title,
    description: Array.isArray(description) ? description : [description],
    imageUrl: Array.isArray(imageUrl) ? imageUrl : [imageUrl],
});

exports.CreateNewsResDTO = (message = "NEWS Created Successfully") => ({ success: true, message })

exports.ErrorResDTO = (message = "Something went wrong") => ({ success: false, message })