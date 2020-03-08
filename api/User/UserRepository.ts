import { Model } from "mongoose";
import { MainRepository } from "../../database/MainRepo";
import { User, IUser, IChat } from "../../database/models";
import { QueryParams } from "../../Interfaces";

class UserRepository extends MainRepository<IUser> {
  constructor(protected model: Model<IUser>) {
    super(model);
  }

  reserveProperty(userId: string, propertyId: string): Promise<boolean> {
    return super.setUpdateOne(
      { _id: userId },
      {
        $pull: { favProps: propertyId },
        reservedProperty: propertyId
      }
    );
  }

  getChatList(userId: string, options?: QueryParams): Promise<IChat[]> {
    return this.model
      .findOne({ _id: userId }, options)
      .populate("chatList", "firstName lastName profilePic")
      .then(u => u.chatList);
  }

  updateChatList(userId: string, otherUserId: string): Promise<boolean> {
    return super.setUpdateById(userId, {
      $addToSet: { chatList: otherUserId }
    });
  }
}

export default new UserRepository(User);
