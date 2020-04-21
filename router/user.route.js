var express = require('express');
var router = express.Router();

var userController = require('../controller/userController');
var validate = require('../validate/userValidation');



router.get('/', userController.index);

// Search APi
router.get('/search', userController.search);

// Trang create
router.get('/create', userController.create);

// Api create User
router.post('/create', validate.postCreate, userController.postCreate);

// Get User
router.get('/:id', userController.get);

module.exports = router;