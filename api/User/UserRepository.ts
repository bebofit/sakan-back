import { Model } from "mongoose";
import { MainRepository } from "../../database/MainRepo";
import { User, IUser } from "../../database/models";

class UserRepository extends MainRepository<IUser> {
  constructor(protected model: Model<IUser>) {
    super(model);
  }
}

export default new UserRepository(User);
