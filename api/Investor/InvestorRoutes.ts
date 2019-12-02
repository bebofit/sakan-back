import { Router } from 'express';
import errorHandler from 'express-async-handler';
import investorController from './InvestorController';

const router = Router();

router.post('/', errorHandler(investorController.createInvestor));
router.get('/', errorHandler(investorController.getAllInvestors));
router.get('/:id', errorHandler(investorController.getInvestor));
router.patch('/:id', errorHandler(investorController.updateInvestor));
router.delete('/:id', errorHandler(investorController.deleteInvestor));

export default router;
