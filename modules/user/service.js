const jwt = require('jsonwebtoken');

const mysqlLib = require('../database/mysqlLib');
const logging = require('../logging/loggingService');
const constants = require('../constants/constants');


const listProducts = (apiReference, payload) => {
        return new Promise(async (resolve, reject) => {
            try {
                let sql = "SELECT * FROM `tb_products` LIMIT ? OFFSET ?";
                let values = [Number(payload.limit), Number(payload.offset)];
                let data = await mysqlLib.mysqlQueryPromise(apiReference, "getProjects", sql, values);
                resolve(data);
            } catch (error) {
                logging.log(apiReference, {ERROR: error, DATA: {}});
                reject({
                    "message": constants.responseMessages.ERROR_IN_EXECUTION,
                    "status": constants.responseFlags.ERROR_IN_EXECUTION,
                    "data": {}
                });
            }
        });
    }
;

const getUser = (apiReference, payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            let sql = "SELECT `user`.*  FROM `tb_users` `user` WHERE `user`.`user_name` = ? LIMIT 1";
            let values = [payload.username];
            let data = await mysqlLib.mysqlQueryPromise(apiReference, "getUser", sql, values);
            if (!(data && data.length)) {
                throw {
                    "message": constants.responseMessages.USER_NOT_FOUND,
                    "status": constants.responseFlags.SHOW_ERROR_MESSAGE,
                    "data": {}
                };
            } else {
                resolve(data[0]);
            }
        } catch (error) {
            logging.log(apiReference, {ERROR: error, DATA: {}});
            reject({
                "message": constants.responseMessages.ERROR_IN_EXECUTION,
                "status": constants.responseFlags.ERROR_IN_EXECUTION,
                "data": {}
            });
        }
    });
};

const getAdmin = (apiReference, payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            let sql = "SELECT `admin`.*  FROM `tb_admin` `admin` WHERE `admin`.`user_name` = ? LIMIT 1";
            let values = [payload.username];
            let data = await mysqlLib.mysqlQueryPromise(apiReference, "getAdmin", sql, values);
            if (!(data && data.length)) {
                throw {
                    "message": constants.responseMessages.USER_NOT_FOUND,
                    "status": constants.responseFlags.SHOW_ERROR_MESSAGE,
                    "data": {}
                };
            } else {
                resolve(data[0]);
            }
        } catch (error) {
            logging.log(apiReference, {ERROR: error, DATA: {}});
            reject({
                "message": constants.responseMessages.ERROR_IN_EXECUTION,
                "status": constants.responseFlags.ERROR_IN_EXECUTION,
                "data": {}
            });
        }
    });
};

const addProductToCart = (apiReference, payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            let sql = "INSERT INTO `tb_cart` (`user_id`, `product_id`, `quantity`) VALUES (?, ?, ?)";
            let values = [payload.uaer_id, payload.product_id, payload.quantity];
            await mysqlLib.mysqlQueryPromise(apiReference, "addProductToCart", sql, values);
            resolve();
        } catch (error) {
            logging.log(apiReference, {ERROR: error, DATA: {}});
            reject({
                "message": constants.responseMessages.ERROR_IN_EXECUTION,
                "status": constants.responseFlags.ERROR_IN_EXECUTION,
                "data": {}
            });
        }
    });
};

const getCart = (apiReference, payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            let sql = "SELECT `cart`.`product_id`, `product`.`name`, `product`.`description`, `product`.`price`, " +
                "`product`.`make`, `cart`.`quantity` FROM `tb_cart` `cart` " +
                "LEFT JOIN `tb_products` `product` ON `cart`.`product_id` = `product`.`id` " +
                "WHERE `cart`.`user_id` = ?";
            let values = [payload.uaer_id];
            let data  = await mysqlLib.mysqlQueryPromise(apiReference, "addProductToCart", sql, values);
            resolve(data);
        } catch (error) {
            logging.log(apiReference, {ERROR: error, DATA: {}});
            reject({
                "message": constants.responseMessages.ERROR_IN_EXECUTION,
                "status": constants.responseFlags.ERROR_IN_EXECUTION,
                "data": {}
            });
        }
    });
};

const signToken = (apiReference, payload) => {
    return jwt.sign({
        "id": payload.id,
    }, config.get('authSettings.authKey'), {expiresIn: 60 * 60})
};

const verifyToken = (apiReference, token) => {
    try {
        return jwt.verify(token, config.get('authSettings.authKey'));
    } catch (err) {
        console.log("err", err)
        throw {
            "message": constants.responseMessages.ERROR_IN_EXECUTION,
            "status": constants.responseFlags.ERROR_IN_EXECUTION,
            "data": {}
        };
    }
};


module.exports.listProducts = listProducts;
module.exports.getUser = getUser;
module.exports.getAdmin = getAdmin;
module.exports.addProductToCart = addProductToCart;
module.exports.getCart = getCart;
module.exports.verifyToken = verifyToken;
module.exports.signToken = signToken;