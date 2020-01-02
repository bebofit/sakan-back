import { Router } from 'express';
import errorHandler from 'express-async-handler';
import propertyController from './PropertyController';

const router = Router();

router.post('/', errorHandler(propertyController.createProperty));
router.get('/', errorHandler(propertyController.getAllProperties));
router.get('/:id', errorHandler(propertyController.getProperty));
router.patch('/:id', errorHandler(propertyController.updateProperty));
router.delete('/:id', errorHandler(propertyController.deleteProperty));

export default router;
