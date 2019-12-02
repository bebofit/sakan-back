import { Router } from 'express';
import errorHandler from 'express-async-handler';
import clientController from './ClientController';

const router = Router();

router.post('/', errorHandler(clientController.createClient));
router.get('/', errorHandler(clientController.getAllClients));
router.get('/:id', errorHandler(clientController.getClient));
router.patch('/:id', errorHandler(clientController.updateClient));
router.delete('/:id', errorHandler(clientController.deleteClient));

export default router;
