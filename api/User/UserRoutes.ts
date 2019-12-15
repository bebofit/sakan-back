import { Router } from 'express';
import errorHandler from 'express-async-handler';
import userController from './UserController';
import isAuthenticated from "../../middleware/isAuthenticated";

const router = Router();

// router.use([isAuthenticated]);
router.post('/signup', errorHandler(userController.signup));
// router.post('/login', errorHandler(userController.login));

export default router;
