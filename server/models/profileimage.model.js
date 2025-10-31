const mongoose = require('mongoose');

const ProfileImageSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    profileimg: {
        type: String,
        required: true
    }
}, { timestamps: true });

const ProfileImage = mongoose.model('ProfileImage', ProfileImageSchema);

module.exports = ProfileImage;