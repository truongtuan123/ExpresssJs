var express = require('express');
var router = express.Router();

var productController = require('../controller/productController');

router.get('/', productController.index);

module.exports = router;