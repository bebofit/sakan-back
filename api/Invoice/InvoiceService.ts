import { IInvoice } from '../../database/models';
import repository from './InvoiceRepository';

class InvoiceService {

  constructor(){}

  async createInvoice(body: IInvoice): Promise<IInvoice> {
    return repository.create(body);
  }

  async getAllInvoices(): Promise<IInvoice[]> {
    return repository.findAll();
  }

  async getInvoice(id: string): Promise<IInvoice> {
    return repository.findById(id);
  }

  async updateInvoice(id: string, body: IInvoice): Promise<IInvoice> {
    return repository.findByIdAndUpdate(id, body);
  }

  async deleteInvoice(id: string): Promise<boolean> {
    return repository.softDeleteById(id);
  }
}

export default new InvoiceService();
