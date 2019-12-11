import {Response} from 'express';
import * as httpStatus from 'http-status';
import { IRequest } from '../../Interfaces';
import joi from '../../lib/joi';
import * as userService from './UserService';
import jwt from 'jsonwebtoken';
import { promises as fs } from 'fs';
import path from 'path';


class UserController {
    constructor() {
    }

    async login(request: IRequest, response: Response): Promise<any>{
        let privateKey = await fs.readFile(path.join(__dirname, '../../keys/jwtRS256.key'));
        let token = await jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256'});
        let publicKey = await fs.readFile(path.join(__dirname, '../../keys/jwtRS256.key.pub'));
        let decoded = await jwt.verify(token, publicKey);
        return response.send(decoded);
    }
}

export default new UserController();
