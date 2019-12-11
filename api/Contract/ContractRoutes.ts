import { Router } from 'express';
import errorHandler from 'express-async-handler';
import contractController from './ContractController';

const router = Router();

router.post('/', errorHandler(contractController.createContract));
router.get('/', errorHandler(contractController.getAllContracts));
router.get('/:id', errorHandler(contractController.getContract));
router.patch('/:id', errorHandler(contractController.updateContract));
router.delete('/:id', errorHandler(contractController.deleteContract));

export default router;
