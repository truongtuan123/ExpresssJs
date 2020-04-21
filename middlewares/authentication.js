var db = require('../db');

module.exports.authentication = function (req, res, next) {
    if(!req.signedCookies.userId){
        res.redirect('/auth/login');
        return;
    }

    var user = db.get('users').find({ id: req.signedCookies.userId }).value();
    if(!user) {
        res.redirect('/auth/login');
        return;
    }

    res.locals.user = user;
    // Qua route tiếp theo
    next();
}