var express = require('express');
var router = express.Router();

var cartController = require('../controller/cartController');

router.get('/add/:productId', cartController.addToCart);

router.get('/', cartController.get);

module.exports = router;