const express = require('express');
const app = express();
const bodyParser = require('body-parser');

var userRouter = require('./router/user.route');

const port = 3000;
app.set('views', './views');
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

//Trang Home
app.get('/', function(req, res) {
    res.render('index', {
        name: "Truong Tuan"
    })
})

// Page User
app.use('/users', userRouter);



app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))