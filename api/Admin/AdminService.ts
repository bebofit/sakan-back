import repo from "./AdminRepository";
import Helpers from "../Utils/Helpers";
import NotFoundException from "../../exception/NotFoundException";
import UnauthorizedException from "../../exception/UnauthorizedException";
import Messages = require("../Constants/Messages");
import jwt from "jsonwebtoken";
import { promises as fs, stat } from "fs";
import path from "path";
import rentBuyRequestService from "./../Request/RentBuyRequest/RentBuyRequestService";
import addRequestService from "./../Request/AddPropertyRequest/AddPropertyRequestService";
import {
  IRentBuyRequest,
  IContract,
  IProperty,
  IAddPropertyRequest,
  AddPropertyRequest,
  Property
} from "../../database/models";
import contractService from "./../Contract/ContractService";
import PropertyService from "../Property/PropertyService";

class AdminService {
  constructor() {}

  async login(email: string, password: string): Promise<any> {
    let admin = await this.getAdmin({ email });
    if (!admin) {
      throw new NotFoundException(Messages.user.error.incorrectEmail);
    }
    if (!Helpers.comparePasswordToHash(password, admin.password)) {
      throw new UnauthorizedException(Messages.user.error.incorrectPassword);
    }
    //Generate JWT Token
    let privateKey = await fs.readFile(
      path.join(__dirname, "../../keys/jwtRS256.key")
    );
    return await {
      token: jwt.sign(JSON.parse(JSON.stringify(admin)), privateKey, {
        algorithm: "RS256"
      }),
      userType: admin.userType
    };
  }

  async getAdmin(query: object): Promise<any> {
    let admin = await repo.findOne(query);
    return admin;
  }

  async respondToRentRequest(rentReqId: string, status: string): Promise<any> {
    if (status === "rejected")
      return rentBuyRequestService.updateRequest(rentReqId, {
        status: status
      } as IRentBuyRequest);

    if (status === "accepted") {
      let rentReq: IRentBuyRequest = await rentBuyRequestService.getRequest(
        rentReqId
      );
      rentBuyRequestService.updateRequest(rentReqId, {
        status: status,
        isApproved: true
      } as IRentBuyRequest);
      // Rejecting the rest of the rent requests on this property
      await rentBuyRequestService.updateMany(
        {
          reqType: "rent",
          propertyId: rentReq.propertyId,
          status: "pending approval"
        } as IRentBuyRequest,
        {
          status: "rejected"
        }
      );
      //getting required property
      let property: IProperty = await PropertyService.getProperty(
        rentReq.propertyId
      );
      //creating a new contract
      let now = new Date();
      const contract: IContract = await contractService.createContract({
        contractType: "rent",
        status: "active",
        propertyId: rentReq.propertyId,
        ownerId: rentReq.ownerId,
        clientId: rentReq.clientId,
        invoice: [
          {
            invoiceNumber: 1,
            dueDate: now.setMonth(now.getMonth() + 1),
            isPaid: false,
            value: property.rentValue,
            penaltyValue: 0
          }
        ]
      } as IContract);
      // updating property current current contract
      await PropertyService.updateProperty(property._id, {
        currentContract: contract._id
      } as IProperty);
    }
  }

  async respondToAddRequest(addReqId: string, status: string): Promise<any> {
    let isApproved = false;
    if (status === "accepted") {
      let addReq: any = await addRequestService.getRequest(addReqId);
      isApproved = true;
      addReq.isApproved = true;
      let { _id, status, isDeleted, ...property } = addReq.toObject();
      await PropertyService.createProperty(property as IProperty);
    }
    return addRequestService.updateRequest(addReqId, {
      status: status,
      isApproved: isApproved
    } as IAddPropertyRequest);
  }

  getPropertyRequests(status: any): Promise<any> {
    status = status || "pending approval";
    return addRequestService.getPropertyRequests(status);
  }

  getRentBuyRequests(status: any, reqType: any): Promise<any> {
    status = status || "pending approval";
    reqType = reqType || "rent";
    return rentBuyRequestService.getRentBuyRequests(status, reqType);
  }
}

export default new AdminService();
