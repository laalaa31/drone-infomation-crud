//router index
import { Router } from 'express';
import DroneRouter from "./DroneRouter";


const router = Router();
router.use('/drone', DroneRouter);


export default router;