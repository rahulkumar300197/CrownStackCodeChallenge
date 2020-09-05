const express = require('express');
const router = express.Router();

const validator = require('./validator');
const routeHandler = require('./routeHandler');



router.post('/login', validator.login, routeHandler.login);
router.post('/listProducts', validator.listProducts, routeHandler.listProducts);
router.post('/addProductToCart', validator.addProductToCart, routeHandler.addProductToCart);
router.post('/getCart', validator.getCart, routeHandler.getCart);

module.exports = router;