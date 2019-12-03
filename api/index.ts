import { Router } from 'express';
import userRoutes from './User';
import clientRoutes from './Client';
import investorRoutes from './Investor';

const router = Router();

router.use('/user', userRoutes);
router.use('/client', clientRoutes);
router.use('/investor', investorRoutes);

export default router;
