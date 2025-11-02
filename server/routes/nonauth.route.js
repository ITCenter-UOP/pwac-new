const express = require('express');
const NonAuthController = require('../controllers/nonauth.controller');

const router = express.Router();

router.get('/get-all-news', NonAuthController.getallnews)

module.exports = router;