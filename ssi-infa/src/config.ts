import env from 'dotenv'
const log = require('simple-node-logger');


env.config();

const logger = log.createSimpleLogger({
    logFilePath: process.env.LOG_FILEPATH || 'ssi-infra.log',
    timestampFormat: process.env.LOG_TIMESTAMP_FORMAT || 'YYYY-MM-DD HH:mm:ss.SSS'
})
logger.setLevel(process.env.LOG_LEVEL || 'info')

const port = process.env.PORT || 5000

export  {
    port,
    logger
}