import { Router } from 'express';
import clientRoutes from './client';

const router = Router();

router.use('/clients', clientRoutes);

export default router;
