import { Router } from 'express';
import { ImageController } from '../controllers';
import upload from '../middlewares/multer';

const router: Router = Router();

//UPLOAD IMAGES
router.post('/:droneid', upload.array('image'), ImageController.createImages);
//DELETE IMAGE
router.delete('/:droneid', ImageController.deleteImage);

export default router;
