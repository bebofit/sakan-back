import { Router } from 'express';
import errorHandler from 'express-async-handler';
import propertyController from './AddPropertyRequestController';

const router = Router();

router.post('/', errorHandler(propertyController.createAddPropertyRequest));
router.get('/', errorHandler(propertyController.getAllAddPropertyRequests));
router.get('/:id', errorHandler(propertyController.getAddPropertyRequest));
router.patch('/:id', errorHandler(propertyController.updateAddPropertyRequest));
router.delete('/:id', errorHandler(propertyController.deleteAddPropertyRequest));

export default router;
