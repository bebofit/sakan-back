import { IRentBuyRequest } from '../../../database/models';
import repository from './RentBuyRequestRepository';
import NotFoundException from '../../../exception/NotFoundException';

class RentBuyRequestService {
  constructor() {}

  async getAllRequests(conditions: any = {}): Promise<IRentBuyRequest[]> {
    return await repository.find(conditions);
  }

  async createRequest(body: IRentBuyRequest): Promise<IRentBuyRequest> {
    return await repository.create(body);
  }

  async getRentBuyRequests(
    status: any,
    reqType: any
  ): Promise<IRentBuyRequest[]> {
    let rentBuyReqs = await repository.find({
      status: status,
      reqType: reqType
    });
    if (rentBuyReqs.length === 0) {
      throw new NotFoundException('No Requests Found');
    }
    return rentBuyReqs;
  }

  async getRequest(id: string): Promise<IRentBuyRequest> {
    let rentBuyReq = await repository.findById(id);
    if (!rentBuyReq) {
      throw new NotFoundException('Request not found');
    }
    return rentBuyReq;
  }

  async updateRequest(
    id: string,
    body: IRentBuyRequest
  ): Promise<IRentBuyRequest> {
    let rentBuyReq = await repository.findByIdAndUpdate(id, body);
    if (!rentBuyReq) {
      throw new NotFoundException('Request not found');
    }
    return rentBuyReq;
  }

  async deleteRequest(id: string): Promise<boolean> {
    let isDeleted = await repository.softDeleteById(id);
    if (!isDeleted) {
      throw new NotFoundException('Request not found');
    }
    await repository.findByIdAndUpdate(id, { isDeleted: true });
    return isDeleted;
  }

  async updateMany(conditions: any, updates: any): Promise<boolean> {
    return await repository.flexibleUpdateMany(conditions, updates);
  }

  async findOne(id: string): Promise<IRentBuyRequest> {
    return repository.findOne(id);
  }
}

export default new RentBuyRequestService();
