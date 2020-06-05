import { format } from "date-fns";
import { Model, Types } from "mongoose";
import { Chat, IChat, IUser } from "../../database/models";
import { MainRepository } from "../../database/MainRepo";
import { IDBQueryOptions } from "../../Interfaces";

const ObjectId = Types.ObjectId;

class ChatRepository extends MainRepository<IChat> {
  constructor(protected model: Model<IChat>) {
    super(model);
  }

  async getChats(user: string, options?: IDBQueryOptions): Promise<any> {
    const convertedUserId = new ObjectId(user);
    // const convertedUserId = new ObjectId('5e86a4ac1dafa00fa6f1ebbb');
    return this.model
      .aggregate([
        {
          $match: {
            $or: [
              { "userOne.id": convertedUserId },
              { "userTwo.id": convertedUserId }
            ]
          }
        },
        {
          $project: {
            user: {
              $cond: {
                if: { $ne: [convertedUserId, "$userOne.id"] },
                then: "$userOne",
                else: "$userTwo"
              }
            },
            lastMessage: { $arrayElemAt: ["$messages", -1] },
            id: "$_id",
            _id: 0,
            messages: 1
          }
        },
        { $unwind: "$messages" },
        {
          $project: {
            user: 1,
            lastMessage: 1,
            id: 1,
            unread: {
              $cond: {
                if: {
                  $and: [
                    { $eq: [convertedUserId, "$messages.to"] },
                    { $eq: ["$messages.read", false] }
                  ]
                },
                then: 1,
                else: 0
              }
            }
          }
        },
        {
          $group: {
            _id: "$user",
            user: { $first: "$user" },
            unreadMessages: { $sum: "$unread" },
            lastMessage: { $first: "$lastMessage" },
            id: { $first: "$id" }
          }
        },
        {
          $project: {
            _id: 0,
            id: 1,
            unreadMessages: 1,
            user: 1,
            lastMessage: 1
          }
        },
        {
          $sort: { "lastMessage.createdAt": -1 }
        }
      ])
      .exec();
  }

  async getChatById(
    id: string,
    receiver: string,
    options?: IDBQueryOptions
  ): Promise<any> {
    return this.model
      .findOne(
        {
          _id: id
        },
        null,
        options
      )
      .then((chat: IChat) => ({
        user: chat.userOne.id === receiver ? chat.userOne : chat.userTwo,
        id: chat.id,
        messages: chat.messages,
        isPrivate: chat.isPrivate
      }));
  }

  async createChat(body: any, options?: IDBQueryOptions): Promise<any> {
    return this.model
      .findOneAndUpdate(
        {
          $or: [
            { "userOne.id": body.sender.id, "userTwo.id": body.receiver.id },
            { "userTwo.id": body.sender.id, "userOne.id": body.receiver.id }
          ]
        },
        {
          userOne: {
            id: body.sender.id,
            name: `${body.sender.firstName} ${body.sender.lastName}`,
            photoUrl: body.sender.photo.url
          },
          userTwo: {
            id: body.receiver.id,
            name: `${body.receiver.firstName} ${body.receiver.lastName}`,
            photoUrl: body.receiver.photo.url
          },
          $push: {
            messages: {
              to: body.receiver.id,
              content: body.content,
              createdAt: format(new Date(), "dd MMM yyyy, HH:mm")
            }
          }
        },
        {
          ...options,
          upsert: true,
          new: true
        }
      )
      .then(chat => ({
        id: chat.id,
        lastMessage: chat.messages.pop(),
        user: chat.userOne.id === body.receiver.id ? chat.userOne : chat.userTwo
      }));
  }

  async readMessages(
    id: string,
    user: string,
    options?: IDBQueryOptions
  ): Promise<any> {
    return this.model.updateOne(
      { _id: id },
      { $set: { "messages.$[elem].read": true } },
      { ...options, arrayFilters: [{ "elem.to": user }] }
    );
  }

  updateUserOne(user: IUser, options?: IDBQueryOptions): Promise<boolean> {
    return super.setUpdateMany(
      { "userOne.id": user.id },
      {
        userOne: {
          id: user.id,
          name: `${user.firstName} ${user.lastName}`,
          photoUrl: user.photo.url
        }
      },
      options
    );
  }

  updateUserTwo(user: IUser, options?: IDBQueryOptions): Promise<boolean> {
    return super.setUpdateMany(
      { "userTwo.id": user.id },
      {
        userTwo: {
          id: user.id,
          name: `${user.firstName} ${user.lastName}`,
          photoUrl: user.photo.url
        }
      },
      options
    );
  }
}

export default new ChatRepository(Chat);
