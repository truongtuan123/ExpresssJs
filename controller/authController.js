var db = require('../db');

module.exports.login = function (req, res) {
    res.render('auth/login');
};

module.exports.loginPost = function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var user = db.get('users').find({ email: email }).value();
    if(!user) {
        res.render('auth/login', {
            errors: [
                "User doesn't exist"
            ],
            values: req.body
        })
        return;
    }
    if(user.password !== password) {
        res.render('auth/login', {
            errors: [
                "Wrong password"
            ]
        })
        return;
    }
    res.redirect('/users');
}