import { Router } from 'express';
import userRoutes from './User';
import clientRoutes from './Client';
import investorRoutes from './Investor';
import propertyRoutes from './Property';
import invoiceRoutes from './Invoice';
import contractRoutes from './Contract';

const router = Router();

router.use('/user', userRoutes);
router.use('/client', clientRoutes);
router.use('/investor', investorRoutes);
router.use('/property', propertyRoutes);
router.use('/invoice', invoiceRoutes);
router.use('/contract', contractRoutes)

export default router;
