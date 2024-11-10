// import mongoose from "mongoose";

// let isConnected = false; // Track the connection

// export async function connectToDatabase() {
//   if (isConnected) {
//     console.log("MongoDB is already connected");
//     return;
//   }

//   try {
//     await mongoose.connect(process.env.MONGODB_URI, {});
//     isConnected = true;
//     console.log("Connected to MongoDB");
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//   }
// }

import mongoose from "mongoose";

// Use global to persist the connection status
const globalWithMongoose = global as typeof global & {
  mongoose: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };
};

if (!globalWithMongoose.mongoose) {
  globalWithMongoose.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (globalWithMongoose.mongoose.conn) {
    // If already connected, use the existing connection
    return globalWithMongoose.mongoose.conn;
  }

  if (!globalWithMongoose.mongoose.promise) {
    // Only create a new connection promise once
    globalWithMongoose.mongoose.promise = mongoose.connect(process.env.MONGODB_URI as string, {}).then((mongoose) => {
      console.log("Connected to MongoDB");
      return mongoose;
    });
  }

  // Await the connection promise and cache it
  globalWithMongoose.mongoose.conn = await globalWithMongoose.mongoose.promise;
  return globalWithMongoose.mongoose.conn;
}
