import { Model } from "mongoose";
import { MainRepository } from "../../database/MainRepo";
import { User, IUser } from "../../database/models";
import { QueryParams } from "../../Interfaces";

class UserRepository extends MainRepository<IUser> {
  constructor(protected model: Model<IUser>) {
    super(model);
  }


  updateChatList(userId: string, otherUserId: string): Promise<boolean> {
    return super.setUpdateById(userId, {
      $addToSet: { chatList: otherUserId }
    });
  }
}

export default new UserRepository(User);
