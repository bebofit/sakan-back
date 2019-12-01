import { Router } from 'express';
import errorHandler from 'express-async-handler';
import * as clientController from './ClientController';

const router = Router();

router.post('/', errorHandler(clientController.createClient));

export default router;
