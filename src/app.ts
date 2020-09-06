import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { port, logger } from './config';
import authRoutes from './routes/auth';
import blogRoutes from './routes/blog';
import appRoutes  from './routes/app';
import didRoutes from './routes/did';
import infoRoutes from './routes/info';
import schemaRoutes from './routes/schema';
import path from 'path'
import setupDb from './setup/db.setup';
const setupArgList = [{
    name: 'newdb',
    desc: 'It will delete the database (if exists) and recreate.'
},
{
    name: 'log',
    desc: 'Will just print hello!'
}]

function setArgument(){
    switch(process.argv[2]){
        case 'newdb': {
            const obj = setupArgList.find(x => x.name == 'newdb')
            if(obj){
                logger.info(`WARNING!!!!!!!`)
                logger.info(`-> ${obj.name} : ${obj.desc} I hope you know what you doing.`)
                setupDb()
                return
            }else{
                logger.error('No such argument exist. check list of argument by --help')
            }
        }
        case '--help': {
            logger.info(`Argument list====================`)
            setupArgList.forEach(e => {
                logger.info(`-> ${e.name} : ${e.desc}`)
            });
            logger.info(`================================`)
            return
        }
        case undefined:{
            logger.info("No argument passed. Proceeding with default params")
            break;
        }
    }   
}

setArgument();

const app: Application = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', infoRoutes)
app.use('/api/app', appRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/blog', blogRoutes)
app.use('/api/did', didRoutes)
app.use('/api/schema', schemaRoutes)
app.use('/network/info', infoRoutes)

app.listen(port, () => logger.info(`The server is running on port ${port}`));


