import { Router } from 'express';
import errorHandler from 'express-async-handler';
import * as controller from './controller';

const router = Router();

router.post('/', errorHandler(controller.createClient));

export default router;
