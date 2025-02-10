import mongoose, { Mongoose } from "mongoose";

const MONGO_URI = process.env.MONGODB_URI as string;

if (!MONGO_URI) {
  throw new Error("MONGODB_URI is not defined");
}

interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const dbConnect = async (): Promise<Mongoose> => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGO_URI, {
        dbName: "auth_app",
      })
      .then((result) => {
        console.log("connected to MongoDb");
        return result;
      })
      .catch((error) => {
        console.log("Error connecting to mongoDb");
        throw error;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

export default dbConnect;
