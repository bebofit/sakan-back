
import repo from './AdminRepository';
import bcrypt from 'bcrypt';
import NotFoundException from '../../exception/NotFoundException';
import UnauthorizedException from '../../exception/UnauthorizedException';
import Messages = require('../Constants/Messages');
import jwt from 'jsonwebtoken';
import { promises as fs } from 'fs';
import path from 'path';
import rentBuyRequestService from './../Request/RentBuyRequest/RentBuyRequestService';
import { IRentBuyRequest, IContract, IProperty } from '../../database/models';
import InvalidInputException from '../../exception/InvalidInputException';
import contractService from './../Contract/ContractService';
import PropertyService from '../Property/PropertyService';

class AdminService {
    constructor() { }

    async login(email: string, password: string): Promise<any> {
        let user = await this.getAdmin({ email: email });
        if (!user) {
            throw new NotFoundException(Messages.user.error.incorrectEmail);
        }
        if (!await bcrypt.compare(password, user.password)) {
            throw new UnauthorizedException(Messages.user.error.incorrectPassword);
        }
        //Generate JWT Token
        let privateKey = await fs.readFile(path.join(__dirname, '../../keys/jwtRS256.key'));
        return await { token: jwt.sign(JSON.parse(JSON.stringify(user)), privateKey, { algorithm: 'RS256' }), userType: user.userType };
    }

    async getAdmin(query: object): Promise<any> {
        let admin = await repo.findOne(query);
        return admin;
    }

    async respondToRentRequest(rentReqId: string, status: string): Promise<any> {
        if (status === 'accepted') {
            let rentReq: IRentBuyRequest = await rentBuyRequestService.findOne(rentReqId);
            // Rejecting the rest of the rent requests on this property
            await rentBuyRequestService.updateMany({
                reqType: 'rent',
                propertyId: rentReq.propertyId,
                status: 'pending approval',
            } as IRentBuyRequest, {
                status: 'rejected'
            });
            //getting required property
            let property: IProperty = await PropertyService.getProperty(rentReq.propertyId);
            //creating a new contract
            let now = new Date();
            const contract: IContract = await contractService.createContract({
                contractType: 'rent',
                status: 'active',
                propertyId: rentReq.propertyId,
                ownerId: rentReq.ownerId,
                clientId: rentReq.clientId,
                invoice: [{
                    invoiceNumber: 1,
                    dueDate: now.setMonth(now.getDay() + 3),
                    isPaid:false,
                    value: property.rentValue,
                    penaltyValue: 0
                }]
            } as IContract);
            // updating property current current contract
            await PropertyService.updateProperty(property._id, {
                currentContract : contract._id 
            } as IProperty);
        }
        await rentBuyRequestService.updateRequest(rentReqId, { status: status } as IRentBuyRequest);
    }
}

export default new AdminService();