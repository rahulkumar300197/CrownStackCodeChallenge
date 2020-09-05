const apiReferenceModule = "startup";

const logging = require('./../logging/loggingService');
const mysqlLib = require('./../database/mysqlLib');
const httpLib = require('./../httpService/httpService');

const initializeServer = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let apiReference = {
                module: apiReferenceModule,
                api: "initializeServer"
            };
            connection = await mysqlLib.initializeConnectionPool();
            let server = await httpLib.startHttpServer();
        } catch (error) {
            logging.log(apiReference, {ERROR: error, DATA: {}});
            reject(error);
        }
    });
}


exports.initializeServer = initializeServer;