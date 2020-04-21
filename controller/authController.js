var md5 = require('md5');
var shortid = require('shortid');

var db = require('../db');

module.exports.signup = function (req, res) {
    res.render('auth/signup');
}

module.exports.signupPost = function (req, res) {
    var newUser = req.body;
    if(!newUser.email) {
        res.render('auth/signup', {
            errors: [
                "Email is required"
            ],
            values: newUser 
        })
        return;
    }

    if(!newUser.phone) {
        res.render('auth/signup', {
            errors: [
                "Phone is required"
            ],
            values: newUser 
        })
        return;
    }

    if(!newUser.password) {
        res.render('auth/signup', {
            errors: [
                "Password is required"
            ],
            values: newUser 
        })
        return;
    }

    if(newUser.password !== newUser.confirmPassword) {
        res.render('auth/signup', {
            errors: [
                "Confirm Password doesn't match with Password"
            ],
            values: newUser 
        })
        return;
    }

    req.body.password = md5(req.body.password);
    req.body.id = shortid.generate();
    delete req.body.confirmPassword;
    db.get('users').push(req.body).write();
    res.redirect('login');
}

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
    if(user.password !== md5(password)) {
        res.render('auth/login', {
            errors: [
                "Wrong password"
            ]
        })
        return;
    }

    res.cookie('userId', user.id, {
        signed: true
    });
    res.redirect('/users');
}
