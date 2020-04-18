const express = require('express');
const app = express();
const port = 3000;
app.set('views', './views');
app.set('view engine', 'pug');

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

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))