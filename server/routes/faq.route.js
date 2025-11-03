const express = require('express');
const auth = require('../middlewares/authMiddleware');
const checkPermission = require('../middlewares/checkPermission');
const FAQController = require('../controllers/faq.controller');

const router = express.Router();

router.post('/create-faq', auth, checkPermission(['faq:create']), FAQController.createFAQ)

router.get('/all-faq', FAQController.getallfaqs)

router.get('/one-faq/:id', FAQController.getonefaq)

router.post('/update-faq/:id', auth, checkPermission(['faq:update']), FAQController.updateFAQ)

module.exports = router;