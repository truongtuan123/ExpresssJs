var express = require('express');
var router = express.Router();

var authController = require('../controller/authController');



router.get('/login', authController.login);

router.post('/login', authController.loginPost);

module.exports = router;