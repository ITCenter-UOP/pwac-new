const express = require('express');
const MemberController = require('../controllers/member.controller');
const auth = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/update-password-from-dashboard', auth, MemberController.updatePasswordViaDash)

module.exports = router;