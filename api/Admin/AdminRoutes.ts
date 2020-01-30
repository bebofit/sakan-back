import { Router } from 'express';
import errorHandler from 'express-async-handler';
import { isAuth, IsAdmin } from '../../middleware';
import AdminController from './AdminController';

const router = Router();

router.post('/login', errorHandler(AdminController.login));

export default router;