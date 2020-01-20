import { Router } from 'express';
import errorHandler from 'express-async-handler';
import propertyController from './PropertyController';
import isAuthenticated from '../../middleware/isAuthenticated';
import isClient from '../../middleware/isClient';

const router = Router();

router.post('/', errorHandler(propertyController.createProperty));
router.get('/', errorHandler(propertyController.getAllProperties));
router.get('/:id', errorHandler(propertyController.getProperty));
router.patch('/:id', errorHandler(propertyController.updateProperty));
router.delete('/:id', errorHandler(propertyController.deleteProperty));
router.post('/get/filter', errorHandler(propertyController.getByFilter));
router.post('/reserve',isAuthenticated, isClient, errorHandler(propertyController.reserve));


export default router;
