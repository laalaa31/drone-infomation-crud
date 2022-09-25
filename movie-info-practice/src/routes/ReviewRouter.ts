import { Router } from "express";
import { body } from "express-validator/check";
import ReviewController from "../controllers/ReviewController";
import auth from "../middlewares/auth";

const router: Router = Router();

router.post('/movies/:movieId', [
    body("title").notEmpty(),
    body("content").notEmpty(),
    body("writer").notEmpty()
], ReviewController.createReview);

router.get('/movies/:movieId', auth, ReviewController.getReviews);
export default router;