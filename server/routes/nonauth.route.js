const express = require('express');
const NonAuthController = require('../controllers/nonauth.controller');

const router = express.Router();

router.get('/get-all-news', NonAuthController.getallnews)

router.get('/get-one-news/:title', NonAuthController.getonenews)


module.exports = router;