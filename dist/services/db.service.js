"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { keys } from 'ts-transformer-keys';
var config_1 = require("../config");
var FieldMap = Object.freeze({
    User: ["id", "fname", "lname", "phoneNumber", "username", "password", "email", "publicKey", "privateKey", "hash", "birthdate", "jobTitle"],
    Application: ["id", "appId", "appSecret", "isActive", "name", "userId"],
    Did: ["id", "name", "did", "didDoc"],
    Schema: ["id", "credentialName", "attributes", "version", "owner"]
});
var SchemaType;
(function (SchemaType) {
    SchemaType[SchemaType["User"] = 0] = "User";
    SchemaType[SchemaType["Application"] = 1] = "Application";
    SchemaType[SchemaType["Did"] = 2] = "Did";
    SchemaType[SchemaType["Schema"] = 3] = "Schema";
})(SchemaType = exports.SchemaType || (exports.SchemaType = {}));
var QueryType;
(function (QueryType) {
    QueryType[QueryType["DropTable"] = 0] = "DropTable";
    QueryType[QueryType["CreateTable"] = 1] = "CreateTable";
    QueryType[QueryType["InsertRow"] = 2] = "InsertRow";
    QueryType[QueryType["UpdateRows"] = 3] = "UpdateRows";
    QueryType[QueryType["GetRows"] = 4] = "GetRows";
})(QueryType || (QueryType = {}));
var DBService = /** @class */ (function () {
    function DBService() {
        config_1.logger.info('Method: constructor: DBService constructor');
        if (!config_1.db)
            throw new Error("Invalid database connection.");
    }
    DBService.prototype.dropTable = function (type) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var query = _this.getQuery(QueryType.DropTable, type);
            config_1.logger.debug("Method: dropTable: Before dropping " + SchemaType[type] + " table: query = " + query);
            config_1.db.run(query, function (err, res) {
                if (err) {
                    reject(err);
                }
                config_1.logger.debug("Method: dropTable: After dropping " + SchemaType[type] + " table res = " + res);
                return resolve("SUCCESS");
            });
        });
    };
    DBService.prototype.getModelFields = function (type) {
        var keysOfModel = [];
        // keysOfModel = keys<IApplication>(); //TODO
        switch (type) {
            case SchemaType.User:
                keysOfModel = FieldMap.User;
                break;
            case SchemaType.Application:
                keysOfModel = FieldMap.Application;
                break;
            case SchemaType.Did:
                keysOfModel = FieldMap.Did;
                break;
            case SchemaType.Schema:
                keysOfModel = FieldMap.Schema;
                break;
        }
        return keysOfModel;
    };
    DBService.prototype.getQuery = function (queryType, schemaType) {
        config_1.logger.debug("getQuery method:: " + schemaType);
        var tableName = SchemaType[schemaType];
        config_1.logger.debug("getQuery method:: " + tableName);
        var keysOfModel = this.getModelFields(schemaType);
        config_1.logger.debug("getQuery method:: " + keysOfModel);
        var query = "";
        switch (queryType) {
            case QueryType.CreateTable: {
                var restQuery_1 = "";
                keysOfModel.forEach(function (property) {
                    restQuery_1 = restQuery_1 + (property + " text, ");
                });
                restQuery_1 = restQuery_1.substring(0, restQuery_1.lastIndexOf(','));
                query = "CREATE TABLE " + tableName + " (" + restQuery_1 + ")";
                break;
            }
            case QueryType.DropTable: {
                query = "DROP TABLE " + tableName;
                break;
            }
            case QueryType.InsertRow: {
                var restQuery_2 = "", param_1 = "";
                keysOfModel.forEach(function (property) {
                    restQuery_2 = restQuery_2 + (property + ", ");
                    param_1 = param_1 + "?,";
                });
                restQuery_2 = restQuery_2.substring(0, restQuery_2.lastIndexOf(','));
                param_1 = param_1.substring(0, param_1.lastIndexOf(','));
                query = "INSERT INTO " + tableName + "  (" + restQuery_2 + ") VALUES (" + param_1 + ")";
                break;
            }
            case QueryType.UpdateRows: {
                break;
            }
            case QueryType.GetRows: {
                query = "SELECT * FROM " + tableName;
            }
        }
        return query;
    };
    DBService.prototype.createTable = function (type) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var query = _this.getQuery(QueryType.CreateTable, type);
            config_1.logger.debug("Method: createTable: Before creating  " + SchemaType[type] + " table: query = " + query);
            config_1.db.run(query, function (err, res) {
                if (err) {
                    reject(err);
                }
                config_1.logger.debug("Method: createTable: After creating  " + SchemaType[type] + " table res= " + res);
                resolve("SUCCESS");
            });
        });
    };
    DBService.prototype.add = function (type, fields) {
        var _this = this;
        console.log("Db serverice: Add method");
        return new Promise(function (resolve, reject) {
            var query = _this.getQuery(QueryType.InsertRow, type);
            config_1.logger.debug('Method: Add: schema type is USER, query =' + query);
            var values = FieldMap[SchemaType[type]].map(function (k) { return fields[k]; });
            config_1.logger.debug('Method: Add: Before inserting the data values =' + values);
            config_1.db.run(query, values, function (err, res) {
                if (err) {
                    config_1.logger.error(err);
                    reject(err);
                }
                _this.getOne(type, { id: fields["id"] }).then(function (res) {
                    config_1.logger.debug('Method: Add: After inserting the data, newRecordId = ', res.id);
                    resolve(res);
                });
            });
        });
    };
    DBService.prototype.getOne = function (type, params) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            config_1.logger.info('Method: Get: schema type is ' + SchemaType[type]);
            var cols = Object.keys(params);
            var query = _this.getQuery(QueryType.GetRows, type) + ' WHERE '; // gET * from User 
            cols.forEach(function (v, i) {
                query = query + ' ' + v + ' = ? AND';
            });
            query = query.substring(0, query.lastIndexOf('AND'));
            config_1.logger.debug('Before fetching the user query = ' + query);
            var values = Object.keys(params).map(function (k) { return params[k]; });
            config_1.logger.debug("Values = ", values);
            config_1.db.get(query, values, function (err, row) {
                if (err)
                    return reject(err);
                return resolve(row);
            });
        });
    };
    DBService.prototype.getAll = function (type, params) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            config_1.logger.info('Method: Get: schema type is ' + SchemaType[type]);
            var query = _this.getQuery(QueryType.GetRows, type);
            var values = [];
            var cols = Object.keys(params);
            config_1.logger.debug('.............................');
            config_1.logger.debug(cols);
            config_1.logger.debug(params);
            if (cols.length > 0) {
                query = query + ' WHERE '; // gET * from User 
                cols.forEach(function (v, i) {
                    query = query + ' ' + v + ' = ? AND';
                });
                query = query.substring(0, query.lastIndexOf('AND'));
                config_1.logger.debug('Before fetching the user query = ' + query);
                values = cols.map(function (k) { return params[k]; });
                config_1.logger.debug("Values = ", values);
                config_1.db.all(query, values, function (err, rows) {
                    if (err)
                        return reject(err);
                    return resolve(rows);
                });
            }
            else {
                config_1.logger.debug("getAll method:: " + query);
                config_1.db.all(query, function (err, rows) {
                    if (err)
                        return reject(err);
                    return resolve(rows);
                });
            }
        });
    };
    // createTable (type: SchemaType): Promise<string>{
    //     return new Promise((resolve, reject)=> {
    //         if(type === schemaType.USER){                
    //             logger.debug('Method: createTable: Before dropping User table: query = ', CREATE_USER_TABLE);
    //             db.run(CREATE_USER_TABLE, (err, res) => {
    //                 if(err) {
    //                     reject(err)
    //                 }
    //                 logger.debug('Method: createTable: After dropping User table res = ', res);
    //                 resolve("SUCCESS")
    //             })
    //         }
    //     })
    // }
    // add(type: schemaType, obj: any): Promise<any>{
    //     return new Promise((resolve, reject)=> {
    //         if(type === schemaType.USER){
    //             logger.debug('Method: Add: schema type is USER')
    //             const fields: IUser = <IUser> obj;
    //             logger.debug('Method: Add: Before inserting the data');
    //             db.run(ADD_USER, [fields.fname, fields.lname, fields.phoneNumber, fields.username, 
    //                 fields.password ,fields.email, fields.publicKey, 
    //                 fields.hash, fields.birthdate, fields.jobTitle], (err, res) => {
    //                 if(err) reject(err)
    //                 this.getOne(schemaType.USER, { publicKey: fields.publicKey }).then((res: IUser)=> {
    //                     logger.debug('Method: Add: After inserting the data, newRecordId = ', res.id);
    //                     resolve(res)
    //                 })
    //             })
    //         }
    //     })
    // }
    DBService.prototype.update = function () {
    };
    DBService.prototype.delete = function (type, params) {
        return new Promise(function (resolve, reject) {
            // if(type === schemaType.USER){
            //     logger.debug('Method: delete: schema type is USER')
            //     const cols = Object.keys(params);
            //     let query = `DELETE FROM User WHERE `;
            //     cols.forEach((v, i)=> {
            //         query = query + ' ' + v + ' = ? AND';
            //     })
            //     query = query.substring(0, query.lastIndexOf('AND'))
            //     logger.debug('Before delete the user query = ', query)
            //     const values = Object.keys(params).map(k => params[k])
            //     db.run(query, values, (err, row: IUser) => {
            //         if (err) return reject(err)
            //         return resolve(row);
            //     });
            // }
        });
    };
    return DBService;
}());
exports.DBService = DBService;
