import { Router } from 'express';
import errorHandler from 'express-async-handler';
import clientController from './ClientController';

const router = Router();

router.post('/', errorHandler(clientController.createClient));
router.get('/', errorHandler(clientController.getAllClients));
router.get('/:id', errorHandler(clientController.getClient));
router.patch('/:id', errorHandler(clientController.updateClient));
router.delete('/:id', errorHandler(clientController.deleteClient));
router.get('/get/favorites', errorHandler(clientController.getFavoriteProperties));
router.post('/add/favorite', errorHandler(clientController.addToFavorites));
router.post('/remove/favorite', errorHandler(clientController.removeFromFavorites));


export default router;
