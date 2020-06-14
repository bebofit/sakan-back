import mongoose from "mongoose";
import config, { isProduction, isTesting, isDevelopment } from "../config";

const {
  DB_HOST,
  DB_HOST_LOCAL,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_PORT
} = config;

async function startDB(): Promise<void> {
  // console.log(config);
  console.log(DB_HOST, DB_HOST_LOCAL);
  const mongoUrl = isDevelopment
    ? `mongodb://${DB_HOST_LOCAL}:${DB_PORT}`
    : `mongodb+srv://${DB_HOST}`;
  await mongoose.connect(mongoUrl, {
    dbName: isTesting ? "sakanTestDB" : DB_NAME,
    user: isDevelopment ? "" : DB_USER,
    pass: isDevelopment ? "" : DB_PASSWORD,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    autoIndex: !isProduction
  });
  console.log("Connected to MongoDB");
}

const stopDB = (): Promise<void> => mongoose.disconnect();

export { startDB, stopDB };
