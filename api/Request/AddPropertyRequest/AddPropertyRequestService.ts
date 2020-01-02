import { IAddPropertyRequest } from '../../../database/models';
import repository from './AddPropertyRequestRepository';
import NotFoundException from '../../../exception/NotFoundException';

class AddPropertyRequestService {

  constructor(){}

  async createRequest(body: IAddPropertyRequest): Promise<IAddPropertyRequest> {
    return await repository.create(body);
  }

  async getAllRequests(): Promise<IAddPropertyRequest[]> {
    let addPropReqs = await repository.findAll();
    if(addPropReqs.length === 0){
      throw new NotFoundException("No Requests Found");
    }
    return addPropReqs;
  }

  async getRequest(id: string): Promise<IAddPropertyRequest> {
    let addPropReq = await repository.findById(id);
    if(!addPropReq){
      throw new NotFoundException("Request not found");
    }
    return addPropReq;
  }

  async updateRequest(id: string, body: IAddPropertyRequest): Promise<IAddPropertyRequest> {
    let addPropReq = await repository.findByIdAndUpdate(id, body);
    if(!addPropReq){
      throw new NotFoundException("Request not found");
    }
    return addPropReq;
  }

  async deleteRequest(id: string): Promise<boolean> {
    let isDeleted = await repository.softDeleteById(id);
    if(!isDeleted){
      throw new NotFoundException("Request not found");
    }
    await repository.findByIdAndUpdate(id, { isDeleted: true });
    return isDeleted;
  }
}

export default new AddPropertyRequestService();
