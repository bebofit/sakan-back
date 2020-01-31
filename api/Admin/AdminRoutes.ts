import { Router } from 'express';
import errorHandler from 'express-async-handler';
import { isAuth, IsAdmin } from '../../middleware';
import AdminController from './AdminController';

const router = Router();

router.post('/login', errorHandler(AdminController.login));
router.post('property/rent/req', errorHandler(AdminController.respondToRentRequest));

export default router;