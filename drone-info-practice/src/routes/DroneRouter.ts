import { Router } from "express";
import { DroneController } from "../controllers";

const router: Router = Router();

//CREATE
router.post('/', DroneController.createDroneInfo);
//READ
router.get('/:id', DroneController.readDroneInfo);
//UPDATE
router.put('/:id', DroneController.updateDroneInfo);
//DELETE
router.delete('/:id', DroneController.deleteDroneInfo);

export default router;
