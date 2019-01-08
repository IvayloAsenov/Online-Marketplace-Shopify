var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Product}  = require('./models/product');

var app = express();
app.use(bodyParser.json());

/*
    Creates a new product and adds it to the database
    Takes a product object as argument
*/
app.post('/products', (req, res) => {
    var product = new Product({
        title: req.body.title,
        price: req.body.price,
        inventory_count: req.body.inventory_count
    });

    product.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

/*
    Returns all the products in the store
    
    @available_only: by default false
    if available_only is set to true then it will return all products
    in store which have available inventory
*/
app.get('/products', (req, res) => {
    Product.find().then((products) => {
        res.send({products})
    }, (e) => {
        res.status(400).send(e);
    });
});

app.listen(3000, () => {
    console.log('started on port 3000');
});