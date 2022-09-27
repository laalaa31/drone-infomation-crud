//router index
import { Router } from 'express';
import DroneRouter from './DroneRouter';
import ImageRouter from './ImageRouter';

const router = Router();
router.use('/drone', DroneRouter);
router.use('/image', ImageRouter);

export default router;
