import { Router } from 'express';
import errorHandler from 'express-async-handler';
import clientController from './ClientController';
import isClient from '../../middleware/isClient';
import { isAuth } from '../../middleware';

const router = Router();

router.post('/', errorHandler(clientController.createClient));
router.get('/', errorHandler(clientController.getAllClients));
router.get('/:id', errorHandler(clientController.getClient));
router.patch('/:id', errorHandler(clientController.updateClient));
router.delete('/:id', errorHandler(clientController.deleteClient));
router.get('/fetch/favorites',isAuth, isClient, errorHandler(clientController.getFavoriteProperties));
router.post('/add/favorite',isAuth, isClient, errorHandler(clientController.addToFavorites));
router.delete('/remove/favorite',isAuth, isClient, errorHandler(clientController.removeFromFavorites));


export default router;
