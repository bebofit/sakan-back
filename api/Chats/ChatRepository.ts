import { Model } from "mongoose";
import { MainRepository } from "../../database/MainRepo";
import { Chat, IChat, IMessage } from "../../database/models";
import { QueryParams } from "../../Interfaces";

class MessageRepository extends MainRepository<IChat> {
  constructor(protected model: Model<IChat>) {
    super(model);
  }
  createOrUpdateChat(body: any) {
    return this.model.findOneAndUpdate(
      {
        $or: [
          { userOne: body.sender, userTwo: body.receiver },
          { userOne: body.receiver, userTwo: body.sender }
        ]
      },
      {
        userOne: body.sender,
        userTwo: body.receiver,
        $push: {
          messages: {
            sender: body.sender,
            receiver: body.receiver,
            content: body.content
          }
        }
      },
      { upsert: true }
    );
  }

  getRoomMessages(
    userId: string,
    otherUserId: string,
    options?: QueryParams
  ): Promise<IMessage[]> {
    return super
      .findOne(
        {
          $or: [
            { userOne: userId, userTwo: otherUserId },
            { userOne: otherUserId, userTwo: userId }
          ]
        },
        options
      )
      .then(chat => chat.messages);
  }
}

export default new MessageRepository(Chat);
