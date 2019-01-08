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
app.post('/product', (req, res) => {
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
    returns all the products in the store
    
    @availableOnly: by default false
    if availableOnly is set to true then it will return all products
    in store which have available inventory
*/
app.post('/products', (req, res) => {
    let available = -1;
    
    if (req.body.availableOnly)
        available = 0;

    Product.find({
        inventory_count: {$gt: available}
    }).then((products) => {
        res.send({products})
    }, (e) => {
        res.status(400).send(e);
    });
});

/*
    returns a single product in the store depending on the title of the product
    need to pass title as an argument
*/
app.get('/products/:title', (req, res) => {
    var title = req.params.title;

    Product.findOne({title: title}).then((product) => {
        if (!product)
            return res.status(404).send();
        
            res.send({product});
    }).catch((e) => {
        res.status(400).send();
    });
});

app.listen(3000, () => {
    console.log('started on port 3000');
});