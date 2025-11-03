const express = require('express');
const auth = require('../middlewares/authMiddleware');
const checkPermission = require('../middlewares/checkPermission');
const ResourceController = require('../controllers/resource.controller');

const router = express.Router();

router.post('/create-resource', auth, checkPermission(['resource:create']), ResourceController.createResource)

router.get('/all-resource', ResourceController.getallresource)

router.get('/get-one-resource', ResourceController.getoneresource)

router.delete('/delete-resource/:id', auth, checkPermission(['resource:delete']), ResourceController.deleteResource)

module.exports = router;