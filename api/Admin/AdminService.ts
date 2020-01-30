
import Helpers from '../Utils/Helpers';
import repo from './AdminRepository';
import bcrypt from 'bcrypt';
import NotFoundException from '../../exception/NotFoundException';
import UnauthorizedException from '../../exception/UnauthorizedException';
import Messages = require('../Constants/Messages');
import jwt from 'jsonwebtoken';
import { promises as fs } from 'fs';
import path from 'path';

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
}

export default new AdminService();