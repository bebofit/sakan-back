import { Response } from 'express';
import * as httpStatus from 'http-status';
import { IRequest } from '../../Interfaces';
import joi from '../../lib/joi';
import * as invoiceValidations from './InvoiceValidations';
import * as userValidations from '../User/UserValidations';
import invoiceService from './InvoiceService';
import validation from '../Utils/Validation';

class InvoiceContoller {

  constructor() {
  }

  async createInvoice(req: IRequest, res: Response): Promise<any> {
    console.log('Creating Invoice...');
    let body = validation.validateBody(req.body, invoiceValidations.CREATE);
    body = validation.validateBody(req.body, userValidations.CREATE);
    const invoice = await invoiceService.createInvoice(body);
    res.status(httpStatus.CREATED).json({
      data: invoice,
      message: "Invoice Created Successfully"
    });
  }

  async getAllInvoices(req: IRequest, res: Response): Promise<any> {
    let invoices = await invoiceService.getAllInvoices();
    res.status(httpStatus.OK).json({
      data: invoices,
      message: "Invoices Found"
    });
  }

  async getInvoice(req: IRequest, res: Response): Promise<any> {
    let invoice = await invoiceService.getInvoice(req.params.id);
    res.status(httpStatus.OK).json({
      data: invoice,
      message: "Invoice Found"
    });
  }

  async updateInvoice(req: IRequest, res: Response): Promise<any> {
    let body = validation.validateBody(req.body, invoiceValidations.CREATE);
    body = validation.validateBody(req.body, userValidations.CREATE);
    let invoice = await invoiceService.updateInvoice(req.params.id, body);
    res.status(httpStatus.OK).json({
      data: invoice,
      message: "Invoice Data Updated Successfully"
    });
  }

  async deleteInvoice(req: IRequest, res: Response): Promise<any> {
    let invoice = await invoiceService.deleteInvoice(req.params.id);
    res.status(httpStatus.OK).json({
      data: invoice,
      message: "Invoice Deleted Successfully"
    });
  }
}

export default new InvoiceContoller();