require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')

var userRouter = require('./router/user.route');
var authRouter = require('./router/auth.route');
var productRouter = require('./router/product.route');

var authMiddleware = require('./middlewares/authentication');

const port = 3000;
app.set('views', './views');
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser(process.env.SESSION_SECRET));

app.use(express.static('public'));

//Trang Home
app.get('/', function(req, res) {
    res.render('index', {
        name: "Truong Tuan"
    })
})

// Page User
app.use('/users', authMiddleware.authentication, userRouter);

//Page login
app.use('/auth', authRouter);

//Page product
app.use('/products', authMiddleware.authentication, productRouter);



app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))