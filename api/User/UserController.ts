import { Response } from 'express';
import * as httpStatus from 'http-status';
import { IRequest } from '../../Interfaces';
import joi from '../../lib/joi';
import userService from './UserService';
import jwt from 'jsonwebtoken';
import { promises as fs } from 'fs';
import path from 'path';
import ConflictException from '../../exception/ConflictException';
import Codes from '../Constants/Codes';
import Messages from '../Constants/Messages';
import validation from '../Utils/Validation';
import * as clientsValidations from '../Client/ClientValidations';
import * as userValidations from './UserValidations';

class UserController {
    constructor() { }

    async signup(request: IRequest, response: Response): Promise<any> {
        //creating the new user
        let user;
        try {
            let body = validation.validateBody(request.body, clientsValidations.CREATE);
            body = validation.validateBody(request.body, userValidations.CREATE);
            user = await userService.createUser(body);
        } catch (error) {
            if (error.validationError) {
                response.status(httpStatus.UNPROCESSABLE_ENTITY).json({
                    data: null,
                    message: error.errors.details[0].message
                })
            }
            if (Number(error.code) === Number(Codes.Error.Database.uniqueViolation)) {
                if (!error.keyPattern.email) {
                    throw new ConflictException(Messages.user.error.phoneUnique);
                }
                throw new ConflictException(Messages.user.error.emailUnique);
            }
            throw error;
        }
        //creating a verification token and sending it to the user
        // await this.userService.sendAccountVerificationToken(user);
        //sending response
        response.status(httpStatus.CREATED).json({
            data: user,
            message: "User Created Successfully"
        });
    }

    async login(request: IRequest, response: Response): Promise<any> {
        let privateKey = await fs.readFile(path.join(__dirname, '../../keys/jwtRS256.key'));
        let token = await jwt.sign({ user: 'user1' }, privateKey, { algorithm: 'RS256' });
        console.log(token);
        let publicKey = await fs.readFile(path.join(__dirname, '../../keys/jwtRS256.key.pub'));
        let decoded = await jwt.verify(token, publicKey);
        return response.send(decoded);
    }
}

export default new UserController();
