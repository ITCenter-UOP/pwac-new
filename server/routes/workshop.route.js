const express = require('express');
const auth = require('../middlewares/authMiddleware');
const checkPermission = require('../middlewares/checkPermission');
const upload = require('../middlewares/uploadMiddleware');
const WorkshopController = require('../controllers/workshop.controller');

const router = express.Router();

router.post("/create-workshop", auth, checkPermission(['workshop:create']), upload.single('image'), WorkshopController.createWorkshop)

router.put("/update-workshop", auth, checkPermission(['workshop:update']), upload.single("image"), WorkshopController.updateWorkshop);

router.get('/get-all-workshops', WorkshopController.getallWorkshops)

router.get('/get-one-workshop/:id', WorkshopController.getoneworkshop)

module.exports = router;