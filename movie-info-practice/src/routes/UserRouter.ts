import { Router } from "express";
import { body } from "express-validator/check";
import { UserController } from "../controllers";

const router: Router = Router();

//route => use(/user) => post(/)
router.post('/', [
    body('name').notEmpty(),
    body('phone').notEmpty(),
    body('email').notEmpty(),
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    body('password').notEmpty()
], UserController.createUser);
router.post('/signin', [
    body('email').notEmpty(),
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    body('password').notEmpty()
], UserController.signinUser);
router.put('/:userId', UserController.updateUser);
router.get('/:userId', UserController.findUserById);
router.delete('/:userId', UserController.deleteUser);

export default router;

