import { Router } from 'express';
import errorHandler from 'express-async-handler';
import rentBuyRequestController from './RentBuyRequestController';
import { IsAuth } from '../../../middleware';

const router = Router();

router.post('/', IsAuth, errorHandler(rentBuyRequestController.createRentBuyRequest));
router.get('/', errorHandler(rentBuyRequestController.getAllRentBuyRequests));
router.get('/:id', errorHandler(rentBuyRequestController.getRentBuyRequest));
router.patch('/:id', errorHandler(rentBuyRequestController.updateRentBuyRequest));
router.delete('/:id', errorHandler(rentBuyRequestController.deleteRentBuyRequest));

export default router;
