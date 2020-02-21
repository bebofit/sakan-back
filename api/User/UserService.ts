import { IUser } from "../../database/models";
import userServiceFactory from "../Factories/UserServiceFactory";
import userRepo from "./UserRepository";
import Helpers from "../Utils/Helpers";
import bcrypt from "bcrypt";
import NotFoundException from "../../exception/NotFoundException";
import UnauthorizedException from "../../exception/UnauthorizedException";
import Messages = require("../Constants/Messages");
import jwt from "jsonwebtoken";
import { promises as fs } from "fs";
import path from "path";
import CustomException from "../../exception/CustomException";

class UserService {
  async createUser(body: IUser): Promise<IUser> {
    //check if user is client or investor
    let service = userServiceFactory.getInstance(body.userType);
    //lowercase email
    body.email = body.email.toLowerCase();
    //hash password
    let hash = await bcrypt.hash(body.password, 10);
    body.password = hash;
    //making a unique hash for email verification
    let verificationToken = await Helpers.generateToken();
    //saving the new token to the database
    body.verificationToken = verificationToken;
    //call user repo to create user
    let newUser = await service.create(body);
    //sending verification email
    //here
    return newUser;
  }

  async login(email: string, password: string): Promise<any> {
    let user = await this.getUser({ email: email });
    if (!user) {
      throw new NotFoundException(Messages.user.error.incorrectEmail);
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException(Messages.user.error.incorrectPassword);
    }
    //Generate JWT Token
    let privateKey = await fs.readFile(
      path.join(__dirname, "../../keys/jwtRS256.key")
    );
    return await {
      token: jwt.sign(JSON.parse(JSON.stringify(user)), privateKey, {
        algorithm: "RS256"
      }),
      userType: user.userType
    };
  }

  async getUser(query: object): Promise<any> {
    let user = await userRepo.findOne(query);
    if (!user) {
      throw new NotFoundException(Messages.user.error.userNotFound);
    }
    return user;
  }

  async verifyEmail(token: string) {
    //getting saved verification token
    let user = await this.getUser({ verificationToken: token });
    //checking if the 2 token matched
    if (!user) throw new CustomException("Invalid Token", 400);
    //updating the user to be verified and deleting verification token
    await userRepo.findByIdAndUpdate(user.id, {
      isVerified: true,
      verificationToken: null
    });
  }

  async sendResetPasswordToken(user: IUser) {
    //Generate token to reset password
    let token = await Helpers.generateToken();
    let reset = await userRepo.findByIdAndUpdate(user.id, {
      resetPasswordToken: token
    });
    if (!reset) {
      throw new NotFoundException(Messages.user.error.userNotFound);
    }
    //sending reset password token via email to the user
    //here
  }

  async resetPassword(user: IUser, token: string, password: string) {
    //check if the two tokens matches
    if (token !== user.resetPasswordToken) {
      throw new CustomException("Invalid Token", 400);
    }
    //updating new password and destroying the token
    let reset = await userRepo.findByIdAndUpdate(user.id, {
      password: await await bcrypt.hash(password, 10),
      resetPasswordToken: null
    });
    if (!reset) {
      throw new NotFoundException(Messages.user.error.userNotFound);
    }
  }

  async reserveProperty(userId: any, propertyId: string): Promise<boolean> {
    return userRepo.reserveProperty(userId, propertyId);
  }
}

export default new UserService();
