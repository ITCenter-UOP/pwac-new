const express = require('express');
const auth = require('../middlewares/authMiddleware');
const checkPermission = require('../middlewares/checkPermission');
const NEWSController = require('../controllers/news.controller');
const upload = require('../middlewares/uploadMiddleware');


const router = express.Router();

router.post('/create-news', auth, checkPermission(['news:create']), upload.array('imageUrl', 10), NEWSController.createNews)

router.delete('/delete-image-news/:id', auth, checkPermission(['news:delete-image']), NEWSController.deleteimagesFromNEWS)

router.post('/update-news-desc/:id', auth, checkPermission(['news:update-desc']), NEWSController.updateDescriptionFromNEWS)

router.delete('/delete-news-desc/:id', auth, checkPermission(['news:delete-desc']), NEWSController.deleteDescriptionFromNEWS)

router.post('/add-images-news/:id', auth, checkPermission(['news:add-images']), upload.array('imageUrl', 10), NEWSController.addImagesToNEWS)


module.exports = router;