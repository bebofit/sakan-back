import { IProperty } from "../../database/models";
import repository from "./PropertyRepository";
import NotFoundException from "../../exception/NotFoundException";
import { IPropertyFilter } from "../../Interfaces";

class PropertyService {
  constructor() {}

  async createProperty(body: IProperty): Promise<IProperty> {
    return repository.create(body);
  }

  async getAllProperties(): Promise<IProperty[]> {
    let properties = await repository.findAll();
    if (properties.length === 0) {
      throw new NotFoundException("No Properties Found");
    }
    return properties;
  }

  async getProperty(id: string): Promise<IProperty> {
    let property = await repository.findById(id);
    if (!property) {
      throw new NotFoundException("Property Not Found");
    }
    return property;
  }

  async updateProperty(id: string, body: IProperty): Promise<IProperty> {
    let property = await repository.findByIdAndUpdate(id, body);
    if (!property) {
      throw new NotFoundException("Property Not Found");
    }
    return property;
  }

  async deleteProperty(id: string): Promise<boolean> {
    let isDeleted = await repository.softDeleteById(id);
    if (!isDeleted) {
      throw new NotFoundException("Property not found");
    }
    await repository.findByIdAndUpdate(id, { isDeleted: true });
    return isDeleted;
  }

  async getByFilter(filterObject: IPropertyFilter) {
    return await repository.getByFilter(filterObject);
  }

  reserveProperty = (propId: any, userId: string): Promise<boolean> =>
    repository.reserveProperty(propId, userId);
}

export default new PropertyService();
