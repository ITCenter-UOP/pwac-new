const express = require('express');
const auth = require('../middlewares/authMiddleware');
const checkPermission = require('../middlewares/checkPermission');
const NEWSController = require('../controllers/news.controller');
const upload = require('../middlewares/uploadMiddleware');


const router = express.Router();

router.post('/create-news', auth, checkPermission(['news:create']), upload.array('imageUrl', 10), NEWSController.createNews)

module.exports = router;