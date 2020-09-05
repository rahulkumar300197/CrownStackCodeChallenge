const path = require('path');


const commonServices = require('../commonServices/service');
const responses = require('../responses/responses');
const user = require('./controller');


const login = async (req, res) => {
    try {
        let data = await user.login(req.body);
        responses.actionCompleteResponse(res, data);
    } catch (error) {
        responses.sendCustomResponse(res, error);
    }
}

const listProducts = async (req, res) => {
    try {
        let data = await user.listProducts(req.body);
        responses.actionCompleteResponse(res, data);
    } catch (error) {
        responses.sendCustomResponse(res, error);
    }
}

const addProductToCart = async (req, res) => {
    try {
        await user.addProductToCart(req.body);
        responses.actionCompleteResponse(res, {});
    } catch (error) {
        responses.sendCustomResponse(res, error);
    }
}

const getCart = async (req, res) => {
    try {
        let data = await user.getCart(req.body);
        responses.actionCompleteResponse(res, data);
    } catch (error) {
        responses.sendCustomResponse(res, error);
    }
}


module.exports.login = login;
module.exports.listProducts = listProducts;
module.exports.addProductToCart = addProductToCart;
module.exports.getCart = getCart;