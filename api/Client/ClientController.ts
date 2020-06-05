import { Response } from "express";
import * as httpStatus from "http-status";
import { IRequest } from "../../Interfaces";
import * as clientsValidations from "./ClientValidations";
import * as userValidations from "../User/UserValidations";
import propertiesService from "../Property/PropertyService";
import clientService from "./ClientService";
import validation from "../Utils/Validation";
import Codes = require("../Constants/Codes");
import Messages = require("../Constants/Messages");
import ConflictException from "../../exception/ConflictException";
import Http from "../Utils/Http";
import UserService from "../User/UserService";

class ClientController {
  constructor() {}

  async createClient(request: IRequest, response: Response): Promise<any> {
    let client;
    try {
      //validating json object
      let body = validation.validateBody(
        request.body,
        clientsValidations.CREATE
      );
      body = validation.validateBody(request.body, userValidations.CREATE);
      //creating the new client
      //N.B: password not hashed, no verification token (for admin actions)
      client = await clientService.create(body);
    } catch (error) {
      if (Number(error.code) === Number(Codes.Error.Database.uniqueViolation)) {
        if (!error.keyPattern.email) {
          console.log("merw");

          throw new ConflictException(
            Messages.user.error.phoneUnique,
            response
          );
        }
        throw new ConflictException(Messages.user.error.emailUnique, response);
      }
      throw error;
    }
    //sending response
    return Http.sendResponse(
      response,
      httpStatus.CREATED,
      client,
      "Client Created Successfully"
    );
  }

  async getAllClients(request: IRequest, response: Response): Promise<any> {
    let clients = await clientService.getAllClients();
    //sending response
    return Http.sendResponse(response, httpStatus.OK, clients, "Clients Found");
  }

  async getClient(request: IRequest, response: Response): Promise<any> {
    let client = await clientService.getClient(request.params.id);
    //sending response
    return Http.sendResponse(response, httpStatus.OK, client, "Client Found");
  }

  async updateClient(request: IRequest, response: Response): Promise<any> {
    let client;
    //validating json object
    let body = validation.validateBody(request.body, clientsValidations.UPDATE);
    body = validation.validateBody(request.body, userValidations.UPDATE);
    //update client
    client = await clientService.updateClient(request.params.id, body);
    //sending response
    return Http.sendResponse(
      response,
      httpStatus.OK,
      client,
      "Client Data Updated Successfully"
    );
  }

  async deleteClient(request: IRequest, response: Response): Promise<any> {
    let client = await clientService.deleteClient(request.params.id);
    //sending response
    return Http.sendResponse(
      response,
      httpStatus.OK,
      client,
      "Client Deleted Successfully"
    );
  }

  async getFavoriteProperties(
    request: IRequest,
    response: Response
  ): Promise<any> {
    let favoriteProps = await clientService.getFavoriteProperties(
      request.user.id
    );
    return Http.sendResponse(
      response,
      httpStatus.OK,
      favoriteProps,
      "Property added successfully"
    );
  }

  async addToFavorites(request: IRequest, response: Response): Promise<any> {
    //validating property id
    validation.validateBody(request.body, clientsValidations.PROPID);
    const isUpdated = await clientService.addToFavorites(
      request.user.id,
      request.body.propertyId
    );
    if (!isUpdated) {
      return Http.sendResponse(
        response,
        httpStatus.NOT_FOUND,
        null,
        "Property was not added"
      );
    }
    return Http.sendResponse(
      response,
      httpStatus.OK,
      null,
      "Property added successfully"
    );
  }

  async removeFromFavorites(
    request: IRequest,
    response: Response
  ): Promise<any> {
    validation.validateBody(request.body, clientsValidations.PROPID);
    await clientService.removeFromFavorites(
      request.user.id,
      request.body.propertyId
    );
    return Http.sendResponse(
      response,
      httpStatus.OK,
      null,
      "Property removed successfully"
    );
  }

  async reserveProperty(request: IRequest, response: Response): Promise<any> {
    validation.validateBody(request.body, clientsValidations.PROPID);
    try {
      const isReserved = await propertiesService.reserveProperty(
        request.body.propId,
        request.user._id
      );
      if (!isReserved) {
        return Http.sendResponse(
          response,
          httpStatus.BAD_REQUEST,
          null,
          "Property already reserved"
        );
      }
    } catch (error) {
      return Http.sendResponse(
        response,
        httpStatus.CONFLICT,
        null,
        "Cannot reserve another property"
      );
    }
    const isClientUpdated = await clientService.reserveProperty(
      request.user._id,
      request.body.propId
    );
    if (!isClientUpdated) {
      return Http.sendResponse(
        response,
        httpStatus.OK,
        null,
        "User cannot reserve Property"
      );
    }
    return Http.sendResponse(
      response,
      httpStatus.OK,
      null,
      "Property reserved"
    );
  }

  async rentRequest(request: IRequest, response: Response): Promise<any> {
    validation.validateBody(request.body, clientsValidations.PROPID);
    let rentRequest = await clientService.newRentRequest(
      request.body.propId,
      request.user._id
    );
    return Http.sendResponse(
      response,
      httpStatus.OK,
      rentRequest,
      "Rent request is awaiting confirmation"
    );
  }
}

export default new ClientController();
