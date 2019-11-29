import { Router } from 'express';
import errorHandler from 'express-async-handler';
import * as controller from './InvestorController';

const router = Router();

router.post('/', errorHandler(controller.createInvestor));

export default router;
