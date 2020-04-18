const express = require('express');
const app = express();
const port = 3000;
app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', function(req, res) {
    res.render('index', {
        name: "Truong Tuan"
    })
})

app.get('/users', function(req, res) {
    res.render('users/index', {
        users: [
            { id: 1, name: 'Lu Bo'},
            { id: 2, name: 'Quan Vu'}
        ]
    })
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))