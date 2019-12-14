import { Router } from 'express';
import userRoutes from './User';
import clientRoutes from './Client';
import investorRoutes from './Investor';
import propertyRoutes from './Property';
import contractRoutes from './Contract';

const router = Router();

router.use('/user', userRoutes);
router.use('/client', clientRoutes);
router.use('/investor', investorRoutes);
router.use('/property', propertyRoutes);
router.use('/contract', contractRoutes)

export default router;
