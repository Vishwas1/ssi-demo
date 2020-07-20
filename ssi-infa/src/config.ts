import env from 'dotenv'
import sqlite from 'sqlite3';
import path from 'path';
const log = require('simple-node-logger');


env.config();

// LOGGING
const logger = log.createSimpleLogger({
    logFilePath: process.env.LOG_FILEPATH || 'ssi-infra.log',
    timestampFormat: process.env.LOG_TIMESTAMP_FORMAT || 'YYYY-MM-DD HH:mm:ss.SSS'
})
logger.setLevel(process.env.LOG_LEVEL || 'info')

const port = process.env.PORT || 5000


// DATABASE
// Ref: https://www.sqlitetutorial.net/sqlite-nodejs/
const db_file_path = process.env.DATABASE_FILEPATH || 'ssi.db'; 
const db_path = path.resolve(__dirname, db_file_path)
const db =  new sqlite.Database(db_path, (err) => {
    if(err){
        logger.error(`SQLite db error:  ${err.message}`)
    }else{
        logger.info(`Connected to ssi-infa database. DB path = ${db_path}`)
    }
});

export  {
    port,
    logger,
    db
}