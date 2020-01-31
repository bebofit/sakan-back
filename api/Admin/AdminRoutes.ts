import { Router } from 'express';
import errorHandler from 'express-async-handler';
import { isAuth, IsAdmin } from '../../middleware';
import AdminController from './AdminController';
import isAdmin from '../../middleware/isAdmin';

const router = Router();

router.post('/login', errorHandler(AdminController.login));
router.post('property/rent/req',isAuth, isAdmin, errorHandler(AdminController.respondToRentRequest));
router.post('property/add/req',isAuth, isAdmin, errorHandler(AdminController.respondToAddRequest));

export default router;