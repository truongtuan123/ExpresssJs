var db = require('../db');
var shortid = require('shortid');

module.exports.index = function (req, res) {
    var page = parseInt(req.query.page) || 1;
    var perPage = 8;
    var start = (page - 1) * perPage;
    var end = page * perPage;
    if (start > db.get('products').value().length) {
        page = 1;
        start = (page - 1) * perPage;
        end = page * perPage;
    }
    res.render('product/index', {
        products: db.get('products').value().slice(start, end),
        currentPage: page,
        pages: [page, page + 1, page + 2]
    })
};