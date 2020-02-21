import { Model } from "mongoose";
import { MainRepository } from "../../database/MainRepo";
import { User, IUser } from "../../database/models";
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
}

export default new UserRepository(User);
