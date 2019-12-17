import { Response } from 'express';
import * as httpStatus from 'http-status';
import { IRequest } from '../../Interfaces';
import userService from './UserService';
import ConflictException from '../../exception/ConflictException';
import Codes from '../Constants/Codes';
import Messages from '../Constants/Messages';
import validation from '../Utils/Validation';
import * as clientsValidations from '../Client/ClientValidations';
import * as investorsValidations from '../Investor/InvestorValidations';
import * as userValidations from './UserValidations';
import Http from '../Utils/Http';

class UserController {
    constructor() { }

    async signup(request: IRequest, response: Response): Promise<any> {
        let user;
        try {
            //validating json object
            let body = validation.validateBody(request.body, clientsValidations.CREATE);
            body = validation.validateBody(request.body, investorsValidations.CREATE);
            body = validation.validateBody(request.body, userValidations.CREATE);
            //creating the new user
            user = await userService.createUser(body);
        } catch (error) {
            if (Number(error.code) === Number(Codes.Error.Database.uniqueViolation)) {
                if (!error.keyPattern.email) {
                    throw new ConflictException(Messages.user.error.phoneUnique);
                }
                throw new ConflictException(Messages.user.error.emailUnique);
            }
            throw error;
        }
        //sending response
        return Http.sendResponse(response, httpStatus.CREATED, user, "User Created Successfully");
    }

    async verifyEmail(request: IRequest, response: Response): Promise<any> {
        //validating token
        validation.validateBody(request.body, userValidations.TOKEN);
        await userService.verifyEmail(request.body.token);
        //sending response
        return Http.sendResponse(response, httpStatus.OK, null, 'Account Verified');
    }

    async login(request: IRequest, response: Response): Promise<any> {
        //validate email and password
        validation.validateBody(request.body, userValidations.LOGIN);
        let token = await userService.login(request.body.email.toLowerCase(), request.body.password);
        //sending response
        return Http.sendResponse(response, httpStatus.OK, { token: token }, "Login Successful");
    }

    async forgetPassword(request: IRequest, response: Response): Promise<any> {
        //validate email
        validation.validateBody(request.body, userValidations.EMAIL);
        //get user
        let user = await userService.getUser(request.body);
        //creating and sending a reset password token to the user
        await userService.sendResetPasswordToken(user);
        //sending response
        return Http.sendResponse(response, httpStatus.OK, null, Messages.user.general.checkEmail);
    }

    async resetPassword(request: IRequest, response: Response): Promise<any> {
        //validate token and password
        validation.validateBody(request.body, userValidations.RESETPW);
        //get the stored reset password token along with the whole user object
        let user = await userService.getUser({ resetPasswordToken: request.body.token });
        await userService.resetPassword(user, request.body.token, request.body.password);
        //sending response
        return Http.sendResponse(response, httpStatus.OK, null, 'Password Changed Successfully');
    }

}

export default new UserController();
