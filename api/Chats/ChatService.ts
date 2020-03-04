import repository from "./ChatRepository";
import NotFoundException from "../../exception/NotFoundException";
import { IChat, IMessage } from "../../database/models";

class ChatService {
  constructor() {}

  async createOrUpdateChat(body: any): Promise<IMessage> {
    return repository.createOrUpdateChat(body).then(res => res.messages.pop());
  }

  async getRoomMessages(
    userId: string,
    otherUserId: string
  ): Promise<IMessage[]> {
    const messages = await repository.getRoomMessages(userId, otherUserId);
    if (!messages.length) {
      throw new NotFoundException("No Messages Found");
    }
    return messages;
  }

  async updateChat(id: string, body: IChat): Promise<IChat> {
    const chat = await repository.findByIdAndUpdate(id, body);
    if (!chat) {
      throw new NotFoundException("Chat not found");
    }
    return chat;
  }

  async deleteChat(id: string): Promise<boolean> {
    let isDeleted = await repository.softDeleteById(id);
    if (!isDeleted) {
      throw new NotFoundException("Chat not found");
    }
    // await repository.findByIdAndUpdate(id, { isDeleted: true });
    return isDeleted;
  }
}

export default new ChatService();
