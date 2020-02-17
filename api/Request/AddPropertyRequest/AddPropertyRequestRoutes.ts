import { Router } from 'express';
import errorHandler from 'express-async-handler';
import addPropertyRequestController from './AddPropertyRequestController';
import { IsAuth, IsInvestor } from '../../../middleware';

const router = Router();

router.post('/', IsAuth, IsInvestor, errorHandler(addPropertyRequestController.createAddPropertyRequest));
router.get('/', errorHandler(addPropertyRequestController.getAllAddPropertyRequests));
router.get('/:id', errorHandler(addPropertyRequestController.getAddPropertyRequest));
router.patch('/:id', errorHandler(addPropertyRequestController.updateAddPropertyRequest));
router.delete('/:id', errorHandler(addPropertyRequestController.deleteAddPropertyRequest));

export default router;
