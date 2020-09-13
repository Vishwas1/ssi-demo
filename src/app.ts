import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { port, logger } from './config';
import authRoutes from './routes/auth';
import blogRoutes from './routes/blog';
import appRoutes from './routes/app';
import didRoutes from './routes/did';
import infoRoutes from './routes/info';
import schemaRoutes from './routes/schema';

export default function app() {
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
}