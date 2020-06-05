import { Response } from "express";
import { NOT_FOUND, OK } from "http-status";
// import { emailsService } from '../../common/services';
import { IRequest } from "../../Interfaces";
import Validation from "../Utils/Validation";
import * as chatsService from "./service";
import { extractPaginationOptions } from "../Utils/pagination";

async function getChats(req: IRequest, res: Response): Promise<any> {
  const paginationOptions = extractPaginationOptions(req.query);
  const userId = req.user.id;
  const data = await chatsService.getChats(userId, paginationOptions);
  res.status(OK).json({
    data
  });
}

async function getChatById(req: IRequest, res: Response): Promise<any> {
  const chatId = req.params.chatId;
  const userId = req.user.id;
  Validation.validateDBId(chatId);
  const chat = await chatsService.getChatById(chatId, userId);
  if (!chat) {
    throw { statusCode: NOT_FOUND };
  }
  const isUpdated = await chatsService.readMessages(chatId, userId);
  if (!isUpdated) {
    throw { statusCode: NOT_FOUND };
  }
  res.status(OK).json({
    data: chat
  });
}

export { getChats, getChatById };
