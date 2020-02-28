import { Model } from "mongoose";
import { MainRepository } from "../../database/MainRepo";
import { Message, IMessage } from "../../database/models";
import { QueryParams } from "../../Interfaces";

class MessageRepository extends MainRepository<IMessage> {
  constructor(protected model: Model<IMessage>) {
    super(model);
  }

  getAllMessagesBySender(
    userId: string,
    otherUserId: string,
    options?: QueryParams
  ): Promise<IMessage[]> {
    return super.find({ sender: userId, receiver: otherUserId }, options);
  }

  getAllMessagesByReceiver(
    userId: string,
    otherUserId: string,
    options?: QueryParams
  ): Promise<IMessage[]> {
    return super.find({ receiver: userId, sender: otherUserId }, options);
  }
}

export default new MessageRepository(Message);
