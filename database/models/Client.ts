import { Schema, Document } from "mongoose";
// @ts-ignore
import { User, IUser } from "./User";

interface IClient extends IUser {
  favProps?: string[];
  reservedProperty?: string[];
}

const clientSchema = new Schema({
  favProps: [
    {
      type: Schema.Types.ObjectId,
      ref: "Property"
    }
  ],
  reservedProperty: {
    type: Schema.Types.ObjectId,
    ref: "Property"
  }
});

// tslint:disable-next-line: variable-name
const Client = User.discriminator<IClient>("Client", clientSchema);

export { Client, IClient };
