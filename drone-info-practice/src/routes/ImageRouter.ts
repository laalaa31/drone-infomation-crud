import { Router } from 'express';
import { ImageController } from '../controllers';
import upload from '../middlewares/multer';

const router: Router = Router();

//UPLOAD IMAGE
router.post('/', upload.single('image'), ImageController.uploadImage);

export default router;
