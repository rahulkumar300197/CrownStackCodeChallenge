const _ = require('underscore');
const bcrypt = require('bcrypt');

const service = require('./service');
const constants = require('./../constants/constants');


const login = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData;

            if (payload.type === "user") {
                userData = await service.getUser(payload.apiReference, payload);
            } else {
                userData = await service.getAdmin(payload.apiReference, payload);
            }

            const match = await bcrypt.compare(payload.password, userData.password);

            if (match) {
                resolve({
                    "id": userData.id,
                    "user_name": userData.user_name,
                    "access_token": service.signToken(payload.apiReference, userData)
                });
            } else {
                throw {
                    "message": constants.responseMessages.INVALID_PASSWORD,
                    "status": constants.responseFlags.SHOW_ERROR_MESSAGE,
                    "data": {}
                };
            }
        } catch (error) {
            reject(error);
        }
    });
};

const listProducts = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            await service.verifyToken(payload.apiReference, payload.access_token);
            let data = await service.listProducts(payload.apiReference, payload);
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
};

const addProductToCart = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = service.verifyToken(payload.apiReference, payload.access_token);
            payload.uaer_id = userData.id;
            await service.addProductToCart(payload.apiReference, payload);
            resolve();
        } catch (error) {
            reject(error);
        }
    });
};

const getCart = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = service.verifyToken(payload.apiReference, payload.access_token);
            payload.uaer_id = userData.id;
            let data = await service.getCart(payload.apiReference, payload);
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
};


module.exports.login = login;
module.exports.listProducts = listProducts;
module.exports.addProductToCart = addProductToCart;
module.exports.getCart = getCart;
