import { Router } from 'express';
import { ImageController } from '../controllers';
import upload from '../middlewares/multer';

const router: Router = Router();

//UPLOAD IMAGE
//router.post('/', upload.single('image'), ImageController.createImage);
//UPLOAD IMAGES
router.post('/', upload.array('image'), ImageController.createImages);

export default router;
