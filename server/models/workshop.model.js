const mongoose = require('mongoose');

function getWorkshopDateTime(date, time) {
    const [hours, minutes] = time.split(':').map(Number);
    const dt = new Date(date);
    dt.setHours(hours, minutes, 0, 0);
    return dt;
}


const WorkshopSchema = new mongoose.Schema({
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true }, 
    image: { type: String, required: true },
    description: { type: String, required: true },
    registrationLink: { type: String, required: true },
    isActive: { type: Boolean, default: true }, 
}, { timestamps: true });

WorkshopSchema.pre('save', function (next) {
    const workshopDateTime = getWorkshopDateTime(this.date, this.time);
    this.isActive = workshopDateTime > new Date();
    next();
});

WorkshopSchema.pre('findOneAndUpdate', function (next) {
    const update = this.getUpdate();
    if (update.date && update.time) {
        const workshopDateTime = getWorkshopDateTime(new Date(update.date), update.time);
        update.isActive = workshopDateTime > new Date();
    }
    next();
});

module.exports = mongoose.model('Workshop', WorkshopSchema);
