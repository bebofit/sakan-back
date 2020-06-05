import { IChat, IUser } from "../../database/models";
import repository from "./repository";
import { IDBQueryOptions, IDBQuery } from "../../Interfaces";

const getChats = (user: string, options?: IDBQueryOptions): Promise<any> =>
  repository.getChats(user, options);

const getChatById = (
  id: string,
  user: string,
  options?: IDBQueryOptions
): Promise<any> => repository.getChatById(id, user, options);

const readMessages = (
  id: string,
  user: string,
  options?: IDBQueryOptions
): Promise<any> => repository.readMessages(id, user, options);

const createChat = (body: any, options?: IDBQueryOptions): Promise<any> =>
  repository.createChat(body, options);

const updateChat = (
  id: string,
  body: any,
  options?: IDBQueryOptions
): Promise<IChat> => repository.findByIdAndUpdate(id, body, options);

const softDeleteChat = (
  id: string,
  options?: IDBQueryOptions
): Promise<boolean> => repository.deleteById(id, options);

const updateUserOne = (
  user: IUser,
  options?: IDBQueryOptions
): Promise<boolean> => repository.updateUserOne(user, options);

const updateUserTwo = (
  user: IUser,
  options?: IDBQueryOptions
): Promise<boolean> => repository.updateUserTwo(user, options);

export {
  getChatById,
  readMessages,
  getChats,
  createChat,
  updateChat,
  softDeleteChat,
  updateUserOne,
  updateUserTwo
};
