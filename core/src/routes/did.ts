import { Router, Request, Response } from 'express';
import didController from '../controllers/did'


const router = Router();
router.get('/', didController.start)
export default router;