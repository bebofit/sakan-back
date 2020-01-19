import { IProperty } from '../../database/models';
import repository from './PropertyRepository';

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

  async getByFilter(filterObject: any){
    let { street, city, ...filters } = filterObject;
    street? filters['address.street'] = street: null;
    city? filters['address.city'] = city: null;
    return await repository.find(filters);
  }
}

export default new PropertyService();
