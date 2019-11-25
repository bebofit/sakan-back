import mongoose, { Mongoose } from 'mongoose';

const startDB = (): Promise<Mongoose> =>
  mongoose.connect(
    `mongodb+srv://nourhany:Nourhany@cluster0-ifrtn.mongodb.net/sakanDB?retryWrites=true`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    }
  );

const stopDB = (): Promise<void> => mongoose.disconnect();

export { startDB, stopDB };
