import { Router } from 'express';
import errorHandler from 'express-async-handler';
import * as investorController from './InvestorController';

const router = Router();

router.post('/', errorHandler(investorController.createInvestor));

export default router;
