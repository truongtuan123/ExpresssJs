const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

const port = 3000;
app.set('views', './views');
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

db.defaults({ users: {} })
  .write();

//Trang Home
app.get('/', function(req, res) {
    res.render('index', {
        name: "Truong Tuan"
    })
})

//Get trang List Users
app.get('/users', function(req, res) {
    res.render('users/index', {
        users: db.get('users').value()
    })
});

// Search APi
app.get('/users/search', function(req, res){
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
app.get('/users/create', function(req, res) {
    res.render('users/create');
})

// Api create User
app.post('/users/create', function(req, res){
    db.get('users').push(req.body).write();
    res.redirect('/users');
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))