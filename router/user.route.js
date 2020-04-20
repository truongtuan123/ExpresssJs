var express = require('express');
var shortid = require('shortid');
var router = express.Router();

var db = require('../db');


router.get('/', function(req, res) {
    res.render('users/index', {
        users: db.get('users').value()
    })
});

// Search APi
router.get('/search', function(req, res){
    var q = req.query.q.toLowerCase();
    var users = db.get('users').value();
    var result = users.filter(function(user){
        return user.name.toLowerCase().indexOf(q) !== -1;
    })
    res.render('users/index', {
        query: q,
        users: result
    })
})

// Trang create
router.get('/create', function(req, res) {
    res.render('users/create');
})

// Api create User
router.post('/create', function(req, res){
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect('/users');
})


// Get User
router.get('/:id', function(req, res){
    var id = req.params.id;
    var result = db.get('users').find({id: id}).value();
    res.render('users/view', {
        user: result
    })
})

module.exports = router;