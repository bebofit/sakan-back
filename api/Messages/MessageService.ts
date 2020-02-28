import repository from "./MessageRepository";
import NotFoundException from "../../exception/NotFoundException";
import { IMessage } from "../../database/models";

class AdminService {
  constructor() {}

  async create(body: IMessage): Promise<IMessage> {
    return await repository.create(body);
  }

  async getAllMessagesBySender(
    userId: string,
    otherUserId: string
  ): Promise<IMessage[]> {
    let Messages = await repository.getAllMessagesBySender(userId, otherUserId);
    if (Messages.length === 0) {
      throw new NotFoundException("No Messages Found");
    }
    return Messages;
  }

  async getAllMessagesByReceiver(
    userId: string,
    otherUserId: string
  ): Promise<IMessage[]> {
    let Messages = await repository.getAllMessagesByReceiver(
      userId,
      otherUserId
    );
    if (Messages.length === 0) {
      throw new NotFoundException("No Messages Found");
    }
    return Messages;
  }

  async getMessage(id: string): Promise<IMessage> {
    let Message = await repository.findById(id);
    if (!Message) {
      throw new NotFoundException("Message not found");
    }
    return Message;
  }

  async updateMessage(id: string, body: IMessage): Promise<IMessage> {
    let Message = await repository.findByIdAndUpdate(id, body);
    if (!Message) {
      throw new NotFoundException("Message not found");
    }
    return Message;
  }

  async deleteMessage(id: string): Promise<boolean> {
    let isDeleted = await repository.softDeleteById(id);
    if (!isDeleted) {
      throw new NotFoundException("Message not found");
    }
    // await repository.findByIdAndUpdate(id, { isDeleted: true });
    return isDeleted;
  }
}

export default new AdminService();
