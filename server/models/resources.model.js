const mongoose = require('mongoose');

const ResourcesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const Resources = mongoose.model('Resources', ResourcesSchema);

module.exports = Resources;