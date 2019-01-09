const _  = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Product}  = require('./models/product');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

/*
    Creates a new product and adds it to the database
    
    Required Data Params:
    @product: Product
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
    Returns all the products in the store
    
    Optional Data Params: 
    @availableOnly: boolean
    
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
    Returns a single product in the store depending on the title of the product
    need to pass title as an argument

    Required URL Params:
    @title: String
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

/*
    Purchases the selected item (by title) if available inventory and if 
    enough money
    
    Required Data Params:
    @title: String
    @money: Number
*/
app.patch('/products', (req, res) => {
    var title = req.body.title;
    var money = req.body.money;

    if (!title || !money) res.status(400).send();

    Product.findOneAndUpdate({
        title: title,
        inventory_count: {$gt: 0},
        price: {$lte: money}
    }, {
        $inc: {inventory_count: -1}
    }).then((product) => {
        if (!product)
            return res.status(404).send();

        res.send({product})
    }).catch((e) => {
        res.status(404).send();
    });
});


app.listen(port, () => {
    console.log('started up at port ${port}');
});