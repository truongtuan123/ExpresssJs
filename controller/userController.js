var db = require('../db');
var shortid = require('shortid');

module.exports.index = function (req, res) {
    res.render('users/index', {
        users: db.get('users').value()
    })
};

module.exports.search = function (req, res) {
    var q = req.query.q.toLowerCase();
    var users = db.get('users').value();
    var result = users.filter(function (user) {
        return user.name.toLowerCase().indexOf(q) !== -1;
    })
    res.render('users/index', {
        query: q,
        users: result
    })
};

module.exports.create = function (req, res) {
    res.render('users/create');
};

module.exports.postCreate = function (req, res) {
    var errors = [];
    if(!req.body.name) {
        errors.push("Name is required");
    }
    if(!req.body.phone) {
        errors.push("Phone is required");
    }
    if(errors.length){
        res.render("users/create", {
            errors : errors,
            value: req.body
        })
        return;
    }
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect('/users');
};

module.exports.get = function(req, res){
    var id = req.params.id;
    var result = db.get('users').find({id: id}).value();
    res.render('users/view', {
        user: result
    })
};