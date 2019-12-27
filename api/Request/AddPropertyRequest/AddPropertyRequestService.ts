import { IProperty } from '../../database/models';
import repository from './AddPropertyRequestRepository';

class PropertyService {

  constructor(){}

  async createProperty(body: IProperty): Promise<IProperty> {
    return repository.create(body);
  }

  async getAllProperties(): Promise<IProperty[]> {
    return repository.findAll();
  }

  async getProperty(id: string): Promise<IProperty> {
    return repository.findById(id);
  }

  async updateProperty(id: string, body: IProperty): Promise<IProperty> {
    return repository.findByIdAndUpdate(id, body);
  }

  async deleteProperty(id: string): Promise<boolean> {
    return repository.softDeleteById(id);
  }
}

export default new PropertyService();
