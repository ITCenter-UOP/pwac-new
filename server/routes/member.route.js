const express = require('express');
const MemberController = require('../controllers/member.controller');
const auth = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');


const router = express.Router();

router.post('/update-password-from-dashboard', auth, MemberController.updatePasswordViaDash)

router.post('/update-profile-image', auth, upload.single('profileImage'), MemberController.updateProfileImage)

router.get('/get-myprofileimage', auth, MemberController.getmyprofileimge)

router.post('/update-personal-infor', auth, MemberController.updatePersonalInfor)

module.exports = router;