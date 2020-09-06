import { CREATE_USER_TABLE, ADD_USER, GET_USER, DROP_USER_TABLE } from './db.query'
import IUser from '../models/IUser';
import IApplication from '../models/IApplication';
// import { keys } from 'ts-transformer-keys';
import { db, logger } from '../config'
import { chownSync } from 'fs';

const FieldMap = Object.freeze({
    User: ["id","fname","lname","phoneNumber","username","password","email","publicKey","privateKey","hash","birthdate","jobTitle"],
    Application: ["id","appId","appSecret","isActive", "name", "userId"],
    Did: ["id","name", "did", "didDoc"],
    Schema: ["id", "credentialName", "attributes", "version", "owner", "raw", "description"]
})

export enum SchemaType {
    User,
    Application,
    Did,
    Schema
}

enum QueryType{
    DropTable,
    CreateTable,
    InsertRow,
    UpdateRows,
    GetRows,
}

export class DBService{
    constructor(){
        logger.info('Method: constructor: DBService constructor');
        if(!db) throw new Error("Invalid database connection.")
    }

    dropTable (type: SchemaType): Promise<string>{
        return new Promise((resolve, reject)=>{
            const query = this.getQuery(QueryType.DropTable, type);
            logger.debug(`Method: dropTable: Before dropping ${SchemaType[type]} table: query = ${query}`);
            db.run(query,(err, res) =>{
                if(err) {
                    reject(err)
                }
                logger.debug(`Method: dropTable: After dropping ${SchemaType[type]} table res = ${res}`)
                return resolve("SUCCESS")
            })
        })
    }

    private getModelFields(type: SchemaType): Array<string>{
        let keysOfModel: Array<string> = [];
        // keysOfModel = keys<IApplication>(); //TODO
        switch(type){
            case SchemaType.User: keysOfModel = FieldMap.User; break;
            case SchemaType.Application: keysOfModel = FieldMap.Application; break;
            case SchemaType.Did: keysOfModel = FieldMap.Did; break;
            case SchemaType.Schema: keysOfModel = FieldMap.Schema; break;
        }
        return keysOfModel
    }

    private getQuery(queryType: QueryType, schemaType: SchemaType): string{
        logger.debug(`getQuery method:: ${schemaType}`)
        const tableName = SchemaType[schemaType];
        logger.debug(`getQuery method:: ${tableName}`)
        const keysOfModel = this.getModelFields(schemaType);
        logger.debug(`getQuery method:: ${keysOfModel}`)
        let query: string = ""
        switch(queryType){
            case QueryType.CreateTable: {
                let restQuery = "";
                keysOfModel.forEach(property => {
                    restQuery = restQuery + `${property} text, ` 
                });
                restQuery = restQuery.substring(0,restQuery.lastIndexOf(','))
                query = `CREATE TABLE ${tableName} (${restQuery})`;
                break;
            }
            case QueryType.DropTable: {
                query = `DROP TABLE ${tableName}`;
                break;
            }
            case QueryType.InsertRow: {
                let restQuery = "", param = "";
                keysOfModel.forEach(property => {
                    restQuery = restQuery + `${property}, `;
                    param = param + "?," 
                });
                restQuery = restQuery.substring(0,restQuery.lastIndexOf(','))
                param = param.substring(0,param.lastIndexOf(','))
                query = `INSERT INTO ${tableName}  (${restQuery}) VALUES (${param})`;
                break;
            }
            case QueryType.UpdateRows: {
                break
            }
            case QueryType.GetRows: {
                query = `SELECT * FROM ${tableName}`;
            }
        }
        return query;
    }
    
    createTable (type: SchemaType): Promise<string>{
        return new Promise((resolve, reject)=> {
            const query = this.getQuery(QueryType.CreateTable, type);
            logger.debug(`Method: createTable: Before creating  ${SchemaType[type]} table: query = ${query}`);
            db.run(query, (err, res) => {
                if(err) {
                    reject(err)
                }
                logger.debug(`Method: createTable: After creating  ${SchemaType[type]} table res= ${res}`);
                resolve("SUCCESS")
            })
        })
    }

    add<T>(type: SchemaType, fields: T): Promise<any>{
        console.log(`Db serverice: Add method`)
        return new Promise((resolve, reject)=> {
            const query = this.getQuery(QueryType.InsertRow, type);
            logger.debug('Method: Add: schema type is USER, query =' + query)
            let values = FieldMap[SchemaType[type]].map(k => fields[k]) as Array<string>;
            logger.debug('Method: Add: Before inserting the data values =' +  values);
            db.run(query, values, (err, res) => {
                if(err) {
                    logger.error(err)
                    reject(err)
                }
                this.getOne(type, { id: fields["id"] }).then((res)=> {
                    logger.debug('Method: Add: After inserting the data, newRecordId = ', res.id);
                    resolve(res)
                })
            })
        })
    }

    getOne(type: SchemaType, params):Promise<any>{
        return new Promise((resolve, reject) => {
            logger.info('Method: GetOne: schema type is ' + SchemaType[type])
            const cols = Object.keys(params)
            let query = this.getQuery(QueryType.GetRows, type) + ' WHERE '; // gET * from User 
            cols.forEach((v, i)=> {
                query = query + ' ' + v + ' = ? AND';
            })
            query = query.substring(0, query.lastIndexOf('AND'))
            logger.debug('Before fetching the user query = ' + query)
            const values = Object.keys(params).map(k => params[k])
            logger.debug(`Values = `, values)
            db.get(query, values, (err, row) => {
                if (err) return reject(err)
                return resolve(row);
            });    
        })
    }

    getAll(type: SchemaType, params: Object):Promise<Array<Object>>{
        return new Promise((resolve, reject) => {
            logger.info('Method: GetAll: schema type is ' + SchemaType[type])
            let query = this.getQuery(QueryType.GetRows, type)
            let values: Array<String> = [];
            let cols = Object.keys(params)
            logger.debug('.............................')
            logger.debug(cols)
            logger.debug(params)
            if(cols.length > 0){
                query  = query + ' WHERE '; // gET * from User 
                cols.forEach((v, i)=> {
                    query = query + ' ' + v + ' = ? AND';
                })
                query = query.substring(0, query.lastIndexOf('AND'))
                logger.debug('Before fetching the user query = ' + query)
                values = cols.map(k => params[k])
                logger.debug(`Values = `, values)
                db.all(query, values, (err, rows) => {
                    if (err) return reject(err)
                    return resolve(rows);
                });    
            }else{
                logger.debug(`getAll method:: ${query}`)
                db.all(query, (err, rows) => {
                    if (err) return reject(err)
                    return resolve(rows);
                });    
            }

            
        })
    }
    
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

    update(){

    }

    delete(type: SchemaType, params):Promise<any>{
        return new Promise((resolve, reject) => {
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
        })
    }

    // get(type: schemaType, clause: {}): Promise<Array<any>>{
    //     return new Promise((resolve, reject) => {
    //         if(type === schemaType.USER){
    //             logger.info('Method: Get: schema type is USER')
    //             logger.info('Method: Get: Before fetching rows');
    //             db.all(GET_USER, [], (err, rows: Array<IUser>) => {
    //                 if (err) {
    //                     return reject(err)
    //                 }
    //                 return resolve(rows);
    //             });
    //         }
    //     })
    // }

    // getOne(type: schemaType, params):Promise<any>{
    //     return new Promise((resolve, reject) => {
    //         if(type === schemaType.USER){
    //             logger.info('Method: Get: schema type is USER')
    //             const cols = Object.keys(params);
    //             let query = `${GET_USER} WHERE `;
    //             cols.forEach((v, i)=> {
    //                 query = query + ' ' + v + ' = ? AND';
    //             })
    //             query = query.substring(0, query.lastIndexOf('AND'))
    //             logger.info('Before fetching the user query = ', query)
    //             const values = Object.keys(params).map(k => params[k])
    //             db.get(query, values, (err, row: IUser) => {
    //                 if (err) return reject(err)
    //                 return resolve(row);
    //             });
    //         }
    //     })
    // }

}