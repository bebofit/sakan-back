import { Router } from 'express';
import errorHandler from 'express-async-handler';
import * as controller from './controller';

const router = Router();

router.get('/', errorHandler(controller.getChats));
router.get('/:chatId', errorHandler(controller.getChatById));

export default router;
