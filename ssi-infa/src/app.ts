import express, { Application, Request, Response } from 'express';
import { port, logger } from './config';
import didRoutes from './routes/did'

const app: Application = express()
app.use(express.json())
app.use('/api/ssi', didRoutes)
app.get('/', (req, res) => {
    res.send('App is running!')
})

app.listen(port, () => logger.info(`The server is running on port ${port}`));


