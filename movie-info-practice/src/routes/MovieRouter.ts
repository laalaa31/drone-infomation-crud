import { Router } from "express";
import { body } from "express-validator/check";
import MovieController from "../controllers/MovieController";
import auth from "../middlewares/auth";
import Movie from "../models/Movie";


const router: Router = Router();

router.post('/', [
    body("title").notEmpty(),
    body("director").notEmpty()
], MovieController.createMovie);
router.put('/:movieId', MovieController.updateMovie);
router.get('/:movieId', MovieController.findMovieById);
router.delete('/:movieId', MovieController.deleteMovie);
router.get('/', MovieController.getMoviesBySearch);


router.post('/:movieId/comment', [
    body('writer').notEmpty(),
    body('comment').notEmpty()
], MovieController.createMovieComment);
router.put('/:movieId/comments/:commentId', [
    body('comment').notEmpty()
], auth, MovieController.updateMovieComment);

export default router;