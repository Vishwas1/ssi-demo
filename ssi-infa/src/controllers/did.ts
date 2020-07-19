import { Request, Response } from 'express';
import { logger } from '../config'


const start = (req: Request, res: Response) => {
    logger.info('SSI start method called')
    res.send('Hello from ssi!')
}


export default {
    start

}