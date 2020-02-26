import faker from "faker";
import { Types } from "mongoose";

faker.seed(329483721831823210932483284344);

interface Faker extends Faker.FakerStatic {
  objectId: () => Types.ObjectId;
}

const customFaker = faker as Faker;

customFaker.objectId = () => Types.ObjectId();

export default customFaker;
