var db = require('../db');

module.exports.addToCart = function (req, res, next) {
    var productId = req.params.productId;
    var sessionId = req.signedCookies.sessionId;

    if (!sessionId) {
        res.redirect('/products');
        return;
    }

    var count = db
        .get('sessions')
        .find({ id: sessionId })
        .get('cart.' + productId, 0)
        .value();

    db.get('sessions')
        .find({ id: sessionId })
        .set('cart.' + productId, count + 1)
        .write();

    res.redirect('/products');
};

module.exports.get = function(req, res) {
    var productsInCart = db.get('sessions').value();
    var products = [];
    var productsId = Object.keys(productsInCart[0].cart)
    for(var i = 0 ; i < productsId.length; i++){
        products.push(db.get('products').find({id: productsId[i]}).value());
    }
    for(var i = 0 ;i < products.length; i++){
        products[i].amount = productsInCart[0].cart[products[i].id]
    }
    res.render('cart', {
       products: products
    })
}