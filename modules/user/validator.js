const Joi = require('joi');

const constants = require('../constants/constants');
const commonServices = require('../commonServices/service');
const responses = require('../responses/responses');

const apiReferenceModule = 'user';


const login = (req, res, next) => {
    const schema = Joi.object().keys({
        username: Joi.string().required(),
        password: Joi.string().required(),
        type: Joi.string().valid('user','admin').required()
    });
    if (commonServices.validateFields(req.body, res, schema)) {
        req.body.apiReference = {
            module: apiReferenceModule,
            api: "login"
        };
        next();
    } else {
        responses.parameterMissingResponse(res);
    }
};


const listProducts = (req, res, next) => {
    const schema = Joi.object().keys({
        access_token: Joi.string().required(),
        limit: Joi.number().required().min(1).max(20),
        offset: Joi.number().required().min(0)
    });
    if (commonServices.validateFields(req.body, res, schema)) {
        req.query.apiReference = {
            module: apiReferenceModule,
            api: "listProducts"
        };
        next();
    } else {
        responses.parameterMissingResponse(res);
    }
};

const addProductToCart = (req, res, next) => {
    const schema = Joi.object().keys({
        access_token: Joi.string().required(),
        product_id: Joi.number().required(),
        quantity: Joi.number().required(),
        type: Joi.string().valid('user').required()
    });
    if (commonServices.validateFields(req.body, res, schema)) {
        req.query.apiReference = {
            module: apiReferenceModule,
            api: "addProductToCart"
        };
        next();
    } else {
        responses.parameterMissingResponse(res);
    }
};

const getCart = (req, res, next) => {
    const schema = Joi.object().keys({
        access_token: Joi.string().required(),
        type: Joi.string().valid('user').required()
    });
    if (commonServices.validateFields(req.body, res, schema)) {
        req.query.apiReference = {
            module: apiReferenceModule,
            api: "getCart"
        };
        next();
    } else {
        responses.parameterMissingResponse(res);
    }
};


module.exports.login = login;
module.exports.listProducts = listProducts;
module.exports.addProductToCart = addProductToCart;
module.exports.getCart = getCart;