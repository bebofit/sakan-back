import { Model } from 'mongoose';
import { MainRepository } from '../../database/MainRepo';
import { Invoice, IInvoice } from '../../database/models';
import { QueryParams } from '../../Interfaces';

class InvoiceRepository extends MainRepository<IInvoice> {
  constructor(protected model: Model<IInvoice>) {
    super(model);
  }

  create(body: any): Promise<IInvoice> {
    return super.create(body);
  }

  findAll(options?: QueryParams): Promise<IInvoice[]> {
    return super.find({}, options);
  }

  findById(id: string): Promise<IInvoice> {
    return super.findById(id);
  }

  findByIdAndUpdate(id: string, body: IInvoice): Promise<IInvoice> {
    return super.findByIdAndUpdate(id, body);
  }

  softDeleteById(id: string): Promise<boolean> {
    return super.softDeleteById(id);
  }

}

export default new InvoiceRepository(Invoice);
