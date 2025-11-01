const mongoose = require('mongoose');

const PersonalInforSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    address: {
        type: String,
    },
    expertise: {
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