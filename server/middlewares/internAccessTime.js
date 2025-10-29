// middlewares/internAccessTime.js
const internAccessTime = (req, res, next) => {
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, 1 = Monday ... 6 = Saturday
    const hours = now.getHours();
    const minutes = now.getMinutes();

    // Monday = 1, Friday = 5
    const isWeekday = day >= 1 && day <= 5;

    // 7:30 AM = 7*60 + 30 = 450 minutes
    // 5:00 PM = 17*60 = 1020 minutes
    const totalMinutes = hours * 60 + minutes;
    const isWithinTime = totalMinutes >= 450 && totalMinutes <= 1020;

    if (isWeekday && isWithinTime) {
        return next();
    } else {
        return res.status(403).json({ message: "Intern routes accessible only Monday-Friday, 7:30 AM - 5:00 PM." });
    }
};

module.exports = internAccessTime;
