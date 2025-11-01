const mongoose = require('mongoose');

const PersonalInforSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    position: {
        type: String,
    },
    address: {
        type: String,
    },
    contact: [{
        type: String
    }],
    desc: {
        type: String,
    }
}, { timestamps: true });

const PersonalInfor = mongoose.model('PersonalInfor', PersonalInforSchema);

module.exports = PersonalInfor;