import { Router } from 'express';
import errorHandler from 'express-async-handler';
import invoiceController from './InvoiceController';

const router = Router();

router.post('/', errorHandler(invoiceController.createInvoice));
router.get('/', errorHandler(invoiceController.getAllInvoices));
router.get('/:id', errorHandler(invoiceController.getInvoice));
router.patch('/:id', errorHandler(invoiceController.updateInvoice));
router.delete('/:id', errorHandler(invoiceController.deleteInvoice));

export default router;
