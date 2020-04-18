const express = require('express');
const app = express();

const bodyParser = require('body-parser');


const port = 3000;
app.set('views', './views');
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var users = [
    { id: 1, name: 'Lu Bo'},
    { id: 2, name: 'Quan Vu'}
]

app.get('/', function(req, res) {
    res.render('index', {
        name: "Truong Tuan"
    })
})

app.get('/users', function(req, res) {
    res.render('users/index', {
        users: users
    })
});

app.get('/users/search', function(req, res){
    var q = req.query.q.toLowerCase();
    var result = users.filter(function(user){
        return user.name.toLowerCase().indexOf(q) !== -1;
    })
    res.render('users/index', {
        query: q,
        users: result
    })
})

app.get('/users/create', function(req, res) {
    res.render('users/create');
})

app.post('/users/create', function(req, res){
    users.push(req.body);
    res.redirect('/users');
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))