import { Router } from 'express';
import clientRoutes from './Client';

const router = Router();

router.use('/clients', clientRoutes);

export default router;
