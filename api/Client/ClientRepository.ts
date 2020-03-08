import { Model } from "mongoose";
import { MainRepository } from "../../database/MainRepo";
import { Client, IClient } from "../../database/models";

class ClientRepository extends MainRepository<IClient> {
  constructor(protected model: Model<IClient>) {
    super(model);
  }

  addToFavorites(userId: any, propertyId: string): Promise<boolean> {
    return super.flexibleUpdateOne(
      { _id: userId },
      {
        $addToSet: { favProps: propertyId }
      }
    );
  }
}

export default new ClientRepository(Client);
