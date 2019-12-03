import mongoose, { Mongoose } from 'mongoose';

const startDB = (): Promise<Mongoose> =>
  mongoose.connect(
    process.env.DB_CONNECTION_STRING,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    }
  );

const stopDB = (): Promise<void> => mongoose.disconnect();

export { startDB, stopDB };
