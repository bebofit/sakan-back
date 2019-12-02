import { Router } from 'express';
import errorHandler from 'express-async-handler';
import * as userController from './UserController';

const router = Router();

// router.post('/', errorHandler(userController.createUser));

export default router;
