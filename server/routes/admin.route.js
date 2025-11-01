const express = require('express');
const auth = require('../middlewares/authMiddleware');
const checkPermission = require('../middlewares/checkPermission');
const AdminController = require('../controllers/admin.controller');

const router = express.Router();

router.get('/get-all-users', auth, checkPermission(['user:get-all']), AdminController.getallusers)

router.get('/get-one-user/:id', auth, checkPermission(['user:get-one-user']), AdminController.getoneuser)

router.post('/update-role-user/:id', auth, checkPermission(['user:update-role']), AdminController.updateuserRole)

module.exports = router;